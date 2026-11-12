---
title: Arkime on UDR7 - Maximizing Network Visibility
layout: wiki
permalink: "/udr7"
copyLink: True
---


<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Elevating Network Visibility on the UDR7

I recently upgraded to the [**Ubiquiti Dream Router (UDR7)**](https://store.ui.com/us/en/products/udr7), and while it's powerful, I wanted to be able to use Arkime. Since the UDR7 allows SSH access but lacks the **storage or memory** for a full Arkime installation, this guide shows you how to use the [**TZSP protocol**](https://en.wikipedia.org/wiki/TZSP) to **forward UDR7 traffic** to a separate machine running Arkime containers. This gives you deep, searchable network visibility without straining your router.

*Note: The UDR7 appears to truncate traffic on monitored interfaces, meaning we likely won't need complex Arkime Rules for general capture.*

---

# Step 1: Set Up the Arkime Backend (Docker)

We will deploy Arkime and Elasticsearch using Docker Compose on the monitoring machine. This setup uses three services: **Elasticsearch** (our "database"), the **Viewer** (the web UI on port 8005), and the **Capture** container (configured to listen for TZSP packets).

First, set up the required local directories that will be mounted into the Arkime containers:
```bash
# /arkime will hold the raw pcap and extra configuration files
# /esdata will hold the Elasticsearch data
mkdir -p /arkime/etc /arkime/pcap /arkime/maxmind /esdata
chown nobody /arkime/pcap /arkime/etc
```

Now place your `GeoIP.conf` file from MaxMind in the same directory as your `docker-compose.yml` file.
If you don't have MaxMind, this [**FAQ entry**](https://arkime.com/faq#maxmind) has instructions.
In this example we use the GeoLite2 City DB, which provides more detailed location information.

Here is the `docker-compose.yml` file I used, this example requires **Arkime 6.7.0 or later**:

```yaml
services:
  elasticsearch:
    container_name: elasticsearch
    image: elasticsearch:8.19.25
    network_mode: "host"
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms8g -Xmx8g" # Set JVM heap size to 8GB
      - xpack.security.enabled=false
      - xpack.security.enrollment.enabled=false
      - xpack.security.transport.ssl.enabled=false
      - xpack.security.http.ssl.enabled=false
      - network.host=127.0.0.1
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - /esdata:/usr/share/elasticsearch/data
    restart: unless-stopped

  # Creates the Arkime indices on a fresh database, and upgrades them after an
  # Arkime update. Runs on every "docker compose up" and then exits; --ifneeded
  # makes it a no-op once the database is already current.
  db-init:
    container_name: db-init
    image: ghcr.io/arkime/arkime/arkime:v6-ja4-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh db.pl --wait-for-db http://localhost:9200 --db "http://localhost:9200 initorupgradenoprompt --ifneeded --ilm" -- http://localhost:9200 ilm 26h 90d
    user: root
    depends_on:
      - elasticsearch
    restart: "no"

  capture:
    container_name: capture
    image: ghcr.io/arkime/arkime/arkime:v6-ja4-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --wait-for-db http://localhost:9200 --update-geo
    user: root
    depends_on:
      db-init:
        condition: service_completed_successfully
    environment:
      - ARKIME__interface=ignore
      - ARKIME__pcapReadMethod=tzsp
      - ARKIME__dropUser=nobody
      - ARKIME__elasticsearch=http://localhost:9200

      - ARKIME__plugins=ja4plus.amd64.so
      - ARKIME__geoLite2Country=/var/lib/GeoIP/GeoLite2-City.mmdb
      - ARKIME__rirFile=/opt/arkime/etc/ipv4-address-space.csv
      - ARKIME__ouiFile=/opt/arkime/etc/oui.txt
      - ARKIME__saveUnknownPackets=all;corrupt
      - ARKIME__disableParsers=
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
      - /arkime/maxmind:/var/lib/GeoIP
      - ./GeoIP.conf:/etc/GeoIP.conf
    restart: unless-stopped

  viewer:
    container_name: viewer
    image: ghcr.io/arkime/arkime/arkime:v6-ja4-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh viewer --wait-for-db http://localhost:9200 --add-admin
    user: root
    depends_on:
      db-init:
        condition: service_completed_successfully
    environment:
      - ARKIME__viewPort=8005
      - ARKIME__cronQueries=auto
      - ARKIME__dropUser=nobody
      - ARKIME__elasticsearch=http://localhost:9200

      - ARKIME__plugins=ja4plus.amd64.so

      # Uncomment this group to allow uploading pcap through the viewer UI
      #- ARKIME__uploadCommand=/opt/arkime/bin/capture --copy -n {NODE} -r {TMPFILE} {TAGS}
      #- ARKIME__geoLite2Country=/var/lib/GeoIP/GeoLite2-City.mmdb
      #- ARKIME__rirFile=/opt/arkime/etc/ipv4-address-space.csv
      #- ARKIME__ouiFile=/opt/arkime/etc/oui.txt
      #- ARKIME__saveUnknownPackets=all;corrupt
      #- ARKIME__disableParsers=
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
      # Uncomment these two as well
      #- /arkime/maxmind:/var/lib/GeoIP
      #- ./GeoIP.conf:/etc/GeoIP.conf
    restart: unless-stopped
```

*Note: The viewer doesn't do any GeoIP, OUI, or RIR lookups of its own &mdash; that all happens in capture. Those settings and the MaxMind volume are only needed alongside [**uploadCommand**](/settings#uploadCommand), which runs `capture` inside the viewer container to process pcap uploaded through the UI, and that capture has to enrich sessions the same way the sensor does. Uncomment the whole group together, or leave it commented out if you don't want pcap uploads.*

### Initial Startup Sequence

1.  **Start everything:**
    ```bash
    docker compose up -d
    ```
    Compose pulls the images, starts Elasticsearch, waits for it to go healthy, then initializes or upgrades the Arkime database before capture and the viewer start.

2.  **Visit the Arkime Web Interface:** Browse to `http://<arkime_host>:8005`. The `--add-admin` flag creates an **admin/admin** user if one doesn't exist, so log in with those credentials and **change the password immediately** under **Settings -> Password**.

    To add more users later, use the UI **OR** to manually add:
    ```bash
    docker compose exec viewer /opt/arkime/bin/arkime_add_user.sh <user> "<Full Name>" <password> --admin
    ```

3.  **Future Updating:** Because the [`v6-ja4-latest` tag](/docker#choosing-the-right-arkime-image-tag) rolls forward with each release, updating is the same two commands every time &mdash; the database upgrade happens on its own:
    ```bash
    docker compose pull
    docker compose up -d
    ```

---

# Step 2: Configure the UDR7 Traffic Forwarder

We'll use the `tzsp_forwarder` utility on the UDR7, compile it, and set it up as a persistent systemd service.

### A. Install Prerequisites and Compile

Enable SSH access on the UDR7 by logging into the UDR7 web interface, navigating to the "Control Plane", "Console" tab, and then enabling "SSH".

SSH into the UDR7 using your terminal:
```bash
ssh root@192.168.1.1

# Update package lists and install necessary tools
apt update
apt install -y gcc libpcap-dev

# Download the source code
wget https://raw.githubusercontent.com/arkime/arkime/refs/heads/main/contrib/tzsp_forwarder.c

# Compile the binary
gcc tzsp_forwarder.c -o tzsp_forwarder -lpcap
```

### B. Test the Forwarder

Run the forwarder manually to test connectivity. **Replace `<arkime_host>`** with the machine running the Arkime Docker containers.

```bash
# Test forwarding traffic from the br0 interface
./tzsp_forwarder br0 <arkime_host>
```
Verify in the Arkime web interface that traffic is now appearing. If it works, stop this test run (Ctrl+C).

### C. Create a Persistent Systemd Service

To ensure the forwarder runs on every reboot, create a systemd service file.

Create the file `/etc/systemd/system/tzsp-forwarder.service`, **replace `<arkime_host>`** with the machine running the Arkime Docker containers:

```ini
[Unit]
Description=TZSP Packet Forwarder to Arkime
After=network.target
[Service]
Type=simple
# IMPORTANT: Replace <arkime_host> and optionally add a BPF filter
ExecStart=/root/tzsp_forwarder br0 <arkime_host> [<bpf_filter>]
Restart=always
RestartSec=1
[Install]
WantedBy=multi-user.target
```

The `<bpf_filter>` is optional and can be used to limit the traffic being forwarded.
By default, the bpf_filter is set to **not** include the tzsp packets themselves.
In my case since I use plex heavily, I also filter out plex traffic: `not port 32400 and not port 37008`.

### D. Enable and Start the Service

```bash
# Reload systemd to recognize the new service file
systemctl daemon-reload
# Enable the service to start on boot
systemctl enable tzsp-forwarder
# Start the service now
systemctl start tzsp-forwarder
```

# Step 3: Profit!!!
You should now have a reliable, persistent forwarding mechanism sending your UDR7 traffic to your Arkime analysis server!

---

# Step 4: Caddy Bonus

If you want to expose your Arkime to the internet over HTTPS, we suggest proxying with [Caddy](https://caddyserver.com/). Caddy will automatically provision and renew TLS certificates via Let's Encrypt.

### A. Create the Caddy directories

These will be bind-mounted into the Caddy container.

```bash
mkdir -p /caddy/conf /caddy/site /caddy/data /caddy/config
```

### B. Create `/caddy/conf/Caddyfile`

Replace `FQDN` with the public hostname pointing at this server. Optionally uncomment the `email` line and set `EMAIL_ADDRESS` to receive Let's Encrypt expiration notices.

```
{
        cert_issuer acme
       #  email EMAIL_ADDRESS
}

https://FQDN {
        handle_path /arkime/* {
                reverse_proxy 127.0.0.1:8005
        }
}
```

### C. Tell the viewer it lives under `/arkime/`

The `handle_path /arkime/*` above strips the prefix before proxying, so the viewer has to be told to generate its links and cookies under that same prefix.
Add [**webBasePath**](/settings#webBasePath) to the viewer's environment in your `docker-compose.yml`:

```yaml
      - ARKIME__webBasePath=/arkime/
```

Set it to the same path as the Caddy `handle_path`, and **keep the leading and trailing slashes**.

*Note: Once this is set, the viewer is only reachable at `http://<arkime_host>:8005/arkime/` and `https://FQDN/arkime/` &mdash; plain `http://<arkime_host>:8005` will return a **Bad Request**. If you aren't proxying, don't set `webBasePath` at all.*

### D. Add the Caddy service to your `docker-compose.yml`

```yaml
  caddy:
    container_name: caddy
    image: caddy:latest
    restart: unless-stopped
    network_mode: "host"
    volumes:
      - /caddy/conf:/etc/caddy
      - /caddy/site:/srv
      - /caddy/data:/data
      - /caddy/config:/config
```

Then `docker compose up -d caddy viewer` and browse to `https://FQDN/arkime/`.

### E. Forward ports on the UDR7

For Caddy to receive traffic from the internet, the UDR7 needs to forward inbound `443` (and/or `8443`) to the machine running Caddy.

In the UniFi Network UI:

1. Go to **Settings → Security → Port Forwarding**.
2. Create a new rule:
   * **Name:** `arkime-https`
   * **From:** Any (or restrict to specific source IPs/regions)
   * **Port:** `443` (and/or `8443`)
   * **Forward IP:** the LAN IP of the Arkime/Caddy host
   * **Forward Port:** `443` (and/or `8443`)
   * **Protocol:** TCP
3. Save and apply.

Make sure your DNS `FQDN` record points at the UDR7's public WAN IP so Let's Encrypt can validate the certificate.
</div>

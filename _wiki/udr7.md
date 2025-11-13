---
title: Arkime on UDR7 - Maximizing Network Visibility
layout: wiki
permalink: "/udr7"
copyLink: True
---


<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Elevating Network Visibility on the UDR7

I recently upgraded to the [**Ubiquiti Dream Router (UDR7)**](https://store.ui.com/us/en/products/udr7), and while it's powerful, I wanted to be able to use Arkime. Since the UDR7 allows SSH access but lacks the **storage or memory** for a full Arkime installation, this guide shows you how to use the **TSZP protocol** to **forward UDR7 traffic** to a separate machine running Arkime containers. This gives you deep, searchable network visibility without straining your router.

*Note: The UDR7 appears to truncate traffic on monitored interfaces, meaning we likely won't need complex Arkime Rules for general capture.*

---

# Step 1: Set Up the Arkime Backend (Docker)

We will deploy Arkime and Elasticsearch using Docker Compose on the monitoring machine. This setup uses three services: **Elasticsearch** (our "database"), the **Viewer** (the web UI on port 8005), and the **Capture** container (configured to listen for TZSP packets).

First, set up the required local directories that will be mounted into the Arkime containers:
```bash
# /arkime will hold the raw pcap and extra configuration files, it should be it's own partition
# /esdata will hold the Elasticsearch data
mkdir /arkime/etc /arkime/pcap /esdata
chown nobody /arkime/pcap /arkime/etc
```

Now place your `GeoIP.conf` file from maxmind in the same directory as your `docker-compose.yml` file.

Here is the `docker-compose.yml` file I used, this example is using the **unreleased Arkime v6** (help us test!):
```yaml
services:
  elasticsearch:
    container_name: elasticsearch
    image: elasticsearch:8.19.6
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

  capture:
    container_name: capture
    image: ghcr.io/arkime/arkime/arkime:snapshot-v6-amd64-ja4-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --update-geo --init http://localhost:9200 --add-admin -- -o disablePython=true
    environment:
      - ARKIME__interface=ignore
      - ARKIME__pcapReadMethod=tzsp
      - ARKIME__dropUser=nobody

      - ARKIME__plugins=ja4plus.amd64.so
      - ARKIME__dnsOutputAnswers=true
      - ARKIME__geoLite2Country=/var/lib/GeoIP/GeoLite2-City.mmdb
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
      - ./GeoIP.conf:/etc/GeoIP.conf
    restart: unless-stopped

  viewer:
    container_name: viewer
    image: ghcr.io/arkime/arkime/arkime:snapshot-v6-amd64-ja4-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh viewer --update-geo
    environment:
      - ARKIME__viewPort=8005
      - ARKIME__cronQueries=auto
      - ARKIME__dropUser=nobody
      - ARKIME__uploadCommand=/opt/arkime/bin/capture --copy -n {NODE} -r {TMPFILE} {TAGS}

      - ARKIME__plugins=ja4plus.amd64.so
      - ARKIME__dnsOutputAnswers=true
      - ARKIME__geoLite2Country=/var/lib/GeoIP/GeoLite2-City.mmdb
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
      - ./GeoIP.conf:/etc/GeoIP.conf
    restart: unless-stopped
```

### Initial Startup Sequence

Start the services in this specific order to ensure the backend is ready before the Arkime containers try to connect.

1.  **Pull Images and Start Elasticsearch:**
    ```bash
    docker compose pull
    docker compose up -d elasticsearch
    # Verify ES is healthy before proceeding
    curl http://localhost:9200
    ```
2.  **Start Capture and Viewer:** The Capture container will initialize the Arkime configuration files based on the environment variables set above.
    ```bash
    docker compose up -d capture
    docker compose up -d viewer
    ```

3. **Visit the Arkime Web Interface:** Access the Arkime viewer by navigating to `http://<arkime_host>:8005` in your browser. Log in with the default **admin/admin** credentials and **change the password immediately** by navigating to the **Settings -> Password**.

4. **Future Updating:** By using a snapshot tag you can update the Arkime containers in the future by simply running:
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

Create the file `/etc/systemd/system/tzsp-forwarder.service`, **replace `<arkime_host>`** with the machine running the Arkime Docker containers.:

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
</div>

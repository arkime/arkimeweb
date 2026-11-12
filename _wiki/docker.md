---
title: Docker
layout: wiki
permalink: "/docker"
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Docker
{: .section-header.mt-1 }

Arkime publishes **one** official image, and it contains **every** Arkime application: capture, viewer, Cont3xt, WISE, Parliament, esProxy and the `db.pl`/`ch.pl` database tools.
The command you give the container decides which one runs, so a full Arkime deployment is that same image started a few times with different commands.

Included in the image is a `docker.sh` helper that handles the awkward parts of running Arkime in a container &mdash; waiting for the database to come up, initializing or upgrading the schema, creating a first admin user, refreshing the GeoIP files, and giving capture time to flush its pcap on shutdown.
You can ignore it and run the tools directly if you'd rather.

Pull it and check it works:

```bash
docker run --rm ghcr.io/arkime/arkime/arkime:v6-latest /opt/arkime/bin/capture --version
```

In a hurry? Skip to the [Capture and Viewer](#capture-and-viewer) compose example, it is a complete working setup you can copy.

The images live in the [Github Arkime Container Registry](https://github.com/arkime/arkime/pkgs/container/arkime%2Farkime), and are published for Arkime 5.5.0 and later.

## Choosing the Right Arkime Image Tag
{: .subsection }

We offer several tags to help you choose the right Arkime image for your needs.
All of our releases are multi-architecture, so you can use the same tag on both amd64 and arm64 systems.
We recommend using the v6-latest tag, or v6.9.0 (or later) if you pin a version, for the most stable and secure experience.

**Security:** Arkime **6.9.0** fixed a number of HIGH severity vulnerabilities across capture, viewer, esProxy, Cont3xt and WISE, including several ways a capture node could read or change data it shouldn't through esProxy.
**Any image older than 6.9.0, including every 5.x image, has known HIGH severity vulnerabilities &mdash; upgrade.**
See the [CHANGELOG](https://github.com/arkime/arkime/blob/main/CHANGELOG) for the full list.

### Stable Releases:

* v6-latest: This tag points to the most recent stable release within the 6.x series. Use this if you want to stay on a specific major version. (recommended)
* v6-ja4-latest: Same as v6-latest but with the [ja4 plugin](https://arkime.com/ja4) included.
* latest: This tag points to the most recent stable release, whatever the major version. Because it rolls across major versions it can upgrade you to a new major release unexpectedly. (not recommended)
* ja4-latest: Same as latest but with the [ja4 plugin](https://arkime.com/ja4) included. (not recommended)
* vM.M.B: This tag points to a specific release version (e.g., v6.9.2). Use this if you need a particular version for compatibility or other reasons.
* vM.M.B-ja4: Same as vM.M.B but with the [ja4 plugin](https://arkime.com/ja4) included.

### Development Snapshots:

Snapshots are rebuilt from the branch tip, they are how you try unreleased features and they have had far less testing than a release. Don't use them in production.

* snapshot-v6-latest: The latest development snapshot for the next 6.x release.
* snapshot-v6-ja4-latest: Same as snapshot-v6-latest but with the [ja4 plugin](https://arkime.com/ja4) included.
* snapshot-v7-latest: The latest development snapshot of [Arkime 7](/release-v7).
* snapshot-v7-ja4-latest: Same as snapshot-v7-latest but with the [ja4 plugin](https://arkime.com/ja4) included.

### Trying Arkime 7

[Arkime 7](/release-v7) is still a release candidate, so there is no `v7-latest` tag yet.
Use `snapshot-v7-latest` (or `snapshot-v7-ja4-latest`) to try it, and read the [breaking changes](/release-v7#breaking) first &mdash; a v7 viewer or capture will upgrade the database schema and you can't go back to v6 afterwards.
Test it against a copy of your data, not your production cluster.

*Note: v5 images (`v5-latest`, `v5-ja4-latest`) are still published so existing installs can still pull, but 5.x is no longer maintained, has the HIGH severity vulnerabilities fixed in 6.9.0, and should not be used for new deployments.*

## What's Inside the Image
{: .subsection }

The image is Debian based and installs the normal Arkime Debian package, so everything lives under `/opt/arkime` exactly like a package install:

* `/opt/arkime/bin` - `capture`, `docker.sh`, `arkime_add_user.sh`, `arkime_update_geo.sh`
* `/opt/arkime/db` - `db.pl` and, in Arkime 7, `ch.pl`
* `/opt/arkime/viewer`, `/opt/arkime/cont3xt`, `/opt/arkime/wiseService`, `/opt/arkime/parliament` - the node applications
* `/opt/arkime/etc` - **empty on purpose.** This is the directory you mount your own config into. The files the package normally ships here are in `/opt/arkime/samples` instead, so you can copy one out as a starting point:
  `docker run --rm ghcr.io/arkime/arkime/arkime:v6-latest cat /opt/arkime/samples/config.ini.sample > config.ini`
* `/opt/arkime/share` - **Arkime 7 only.** The files Arkime ships and replaces on upgrade (default rules, Featherprint rules, system dashboards) moved here, so mounting over `/opt/arkime/etc` no longer hides them.

The image is built on Debian 13 slim and also installs `curl`, `procps`, `iproute2` and `geoipupdate` (used by `--update-geo`).
The Arkime 7 images additionally install Debian's `tshark` for the new Shark session detail tab &mdash; note that Debian 13 ships tshark 4.4, and the Shark tab needs **4.6.4 or later**, so to use it today you need to mount a newer tshark into the container and point [tsharkPath](/settings#tsharkPath) at it.

The container's default command is `/bin/bash`, so a container with no command just drops you at a shell &mdash; handy for poking around:

```bash
docker run --rm -it ghcr.io/arkime/arkime/arkime:v6-latest
```

## Configuring Arkime Containers
{: .subsection }

You can configure Arkime containers using three primary methods:

1. Environment Variables:
* Set environment variables to configure the container. (`ARKIME__<config>=<value>` for the default section or `ARKIME_<section>__<config>=<value>`)
* These variables take precedence over configuration file settings.
2. Configuration File:
* Create a local configuration file.
* Mount this file into the container to override default settings.
* Some complex config file sections may require this method.
3. Command-Line Options:
* Use the `-o` command-line option to specify additional configuration options. (`-o <section>.<config>=<value>`)
* This method provides flexibility for one-time or specific configuration changes, but is not recommended for regular use.

For comprehensive configuration, consider combining these methods:
* Use a configuration file for general settings.
* Use environment variables for specific overrides.

### Characters that aren't legal in environment variable names

Environment variables can't contain `-`, `:`, `.` or `/`, which some section names and settings need.
Spell them out in upper case and Arkime converts them back:

| In the config file | In the environment variable |
|---|---|
| `-` | `DASH` |
| `:` | `COLON` |
| `.` | `DOT` |
| `/` | `SLASH` |
{: .table .table-bordered .table-striped }

So this config file:

```
[remote-clusters]
arkime2=url:http://arkime2:8005;name:Arkime 2

[featherprint-subnet]
192.168.0.0/16=alertAll
```

becomes:

```yaml
    environment:
      - ARKIME_remoteDASHclusters__arkime2=url:http://arkime2:8005;name:Arkime 2
      - ARKIME_featherprintDASHsubnet__192DOT168DOT0DOT0SLASH16=alertAll
```

Note that the **value** needs no escaping, only the section and setting names.
(`[featherprint-subnet]` is an Arkime 7 section, it is only used here to show a setting name with dots and a slash in it.)

## docker.sh Options
{: .subsection }

`docker.sh` takes a command, then its own options, then `--` followed by arguments passed straight through to the command.

```
/opt/arkime/bin/docker.sh <command> [docker.sh options] -- [command arguments]
```

The image you are running always knows best, so to see exactly what your version supports:

```bash
docker run --rm ghcr.io/arkime/arkime/arkime:v6-latest /opt/arkime/bin/docker.sh help
```

Commands: `capture`, `capture-viewer`, `viewer`, `cont3xt`, `wise`, `parliament`, `esproxy`, `db.pl`, and in Arkime 7 `ch.pl`.

Useful options:

| Option | What it does |
|---|---|
| `--wait-for-db <url>` | Block startup until OpenSearch/Elasticsearch answers. Always use this on anything that talks to the database, see the restart note below. |
| `--wait-for-ch <url>` | Arkime 7 only. Block startup until ClickHouse answers. |
| `--db '<args>'` | Run `db.pl <args>` before the command starts. Can be given multiple times and they run in order. |
| `--ch '<args>'` | Arkime 7 only. Run `ch.pl <args>` before the command starts, after any `--db`. Can be given multiple times. |
| `--add-admin` | Create an `admin`/`admin` user if no admin exists. **Change the password immediately.** Without this a brand new install has no users and you can't log in. |
| `--update-geo` | Run `arkime_update_geo.sh` on start, which downloads the RIR and OUI files into `/opt/arkime/etc` and runs `geoipupdate` if `/etc/GeoIP.conf` is mounted. |
| `--insecure` | Skip TLS certificate verification for database and ClickHouse connections. Only for self-signed certs on a trusted network. |
| `--basedir <dir>` | Use a different base directory, default `/opt/arkime`. |
| `--forever` | Restart the tool in a loop if it exits instead of letting the container exit. Usually you want Docker's own `restart:` policy instead. |
| `--` | Everything after this goes to the command, for example `-- --node sensor1 --host sensor1.example.com`. |
{: .table .table-bordered .table-striped }

The old `--init`, `--upgrade`, `--ilm` and `--ism` options still work but are deprecated, use `--db` instead.

*Note: when the command itself is `db.pl` or `ch.pl` you still have to give it something to do after the `--`. Both exit non-zero when called with no arguments, which matters if another service is waiting on `service_completed_successfully`.*

### Keeping the database schema in sync

The database command you want is `initorupgradenoprompt --ifneeded`:

* on a brand new cluster it initializes the Arkime indices
* on an existing cluster it upgrades them only if the schema version changed
* if everything is already current it does nothing

That makes it safe to run on every start, so you never have to remember a manual `db.pl init`.

```
--db "http://localhost:9200 initorupgradenoprompt --ifneeded"
```

*Note: `initorupgrade` requires **Arkime 6.7.0 or later**. On older versions run `db.pl init` by hand once, then use `--db "<url> upgradenoprompt --ifneeded"`.*

## Setting up an Arkime environment
{: .subsection }

1. **Install OpenSearch or Elasticsearch** - containerized or standalone, either is fine. Arkime 7 can also use [ClickHouse or Postgres](/release-v7#databases) for some of its data.
2. **Set up directories** - you need a directory for pcap and we recommend one for config and the extra GeoIP/RIR/OUI files.
* The examples use `/arkime/pcap` mounted at `/opt/arkime/raw` and `/arkime/etc` mounted at `/opt/arkime/etc`.
* They must be writable by the user capture drops to (`dropUser`, `nobody` in the examples).
* We don't recommend `/home` based directories since you may run into permission issues.
3. **Create a configuration file (optional)** - the defaults plus a few environment variables are usually enough to get started. If you want one, put it at `/opt/arkime/etc/config.ini` in the mounted etc directory. See [Arkime Settings](/settings) and the sample below.
4. **Start your containers** - `docker compose up -d`. The `db-init` service in the examples below initializes or upgrades the database before capture and the viewer start, so there is no separate one-time init step.

If you'd rather initialize by hand, run it once against a fresh cluster:

```bash
docker run --rm --network=host ghcr.io/arkime/arkime/arkime:v6-latest \
  /opt/arkime/db/db.pl http://localhost:9200 init
```

Use the special hostname `host.docker.internal` for the database host if it is running on the same host but not with `network_mode: host` (Linux users may need `--add-host=host.docker.internal:host-gateway`).

## Docker Compose Examples
{: .subsection }

### Capture and Viewer
{: .subsubsection }

This is a complete single-host setup: one service to initialize/upgrade the database, then capture and the viewer.
It assumes an OpenSearch/Elasticsearch already running at `http://localhost:9200`, and the directories from above.

```yaml
services:
  # Creates the Arkime indices on a fresh database, and upgrades them after an
  # Arkime update. Runs on every "docker compose up" and then exits; --ifneeded
  # makes it a no-op once the database is already current.
  db-init:
    container_name: db-init
    image: ghcr.io/arkime/arkime/arkime:v6-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh db.pl --wait-for-db http://localhost:9200 --db "http://localhost:9200 initorupgradenoprompt --ifneeded --ilm" -- http://localhost:9200 ilm 26h 90d
    user: root
    restart: "no"

  capture:
    container_name: capture
    image: ghcr.io/arkime/arkime/arkime:v6-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --wait-for-db http://localhost:9200 --update-geo
    user: root
    # Give capture time to save its sessions and close its pcap files on stop
    stop_grace_period: 60s
    depends_on:
      db-init:
        condition: service_completed_successfully
    environment:
      - ARKIME__interface=eth0
      - ARKIME__dropUser=nobody
      - ARKIME__elasticsearch=http://localhost:9200

      - ARKIME__rirFile=/opt/arkime/etc/ipv4-address-space.csv
      - ARKIME__ouiFile=/opt/arkime/etc/oui.txt
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
      - /arkime/maxmind:/var/lib/GeoIP
      - ./GeoIP.conf:/etc/GeoIP.conf
    restart: unless-stopped

  viewer:
    container_name: viewer
    image: ghcr.io/arkime/arkime/arkime:v6-latest
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
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
    restart: unless-stopped
```

Then:

```bash
docker compose up -d
```

Compose starts `db-init`, waits for it to exit successfully, and then starts capture and the viewer.
Browse to `http://<host>:8005` and log in with **admin/admin**, then change the password under **Settings -> Password**.

To add more users, use the UI **OR** to manually add:

```bash
docker compose exec viewer /opt/arkime/bin/arkime_add_user.sh <user> "<Full Name>" <password> --admin
```

Updating is the same two commands every time, the schema upgrade happens on its own because `db-init` runs again:

```bash
docker compose pull
docker compose up -d
```

Some notes on this example:

* **`db-init` runs on every `up`, not on restarts.** `depends_on` is only honored by `docker compose up`. A `docker compose restart`, a container crash, or the Docker daemon restarting containers after a reboot all bypass it. That is why capture and the viewer still have their own `--wait-for-db`: without it they would crash-loop while the database comes up.
* **GeoIP is optional.** Drop the `/var/lib/GeoIP` and `GeoIP.conf` mounts and `--update-geo` if you don't use MaxMind. See the [MaxMind FAQ entry](/faq#maxmind) for getting a license key. You don't need to set `geoLite2Country`, `/var/lib/GeoIP/GeoLite2-City.mmdb` and `GeoLite2-Country.mmdb` are searched by default.
* **`user: root` is intentional.** capture needs root to open the interface and both tools drop to `dropUser`/`dropGroup` afterwards.
* **ILM is optional.** The `--ilm` and `ilm 26h 90d` above tell Elasticsearch to roll indices over after 26 hours and delete them after 90 days. Use `ism` instead of `ilm` for OpenSearch, or drop both and expire with `db.pl expire`.
* **Add `-n <nodename>`** after `--` if capture and the viewer use different node names, see Common Issues below.

### Cont3xt
{: .subsubsection }

In this example we are starting cont3xt and using a local cont3xt.ini file and overriding the port cont3xt listens on.
Environment variables are of the format `ARKIME_<section>__<config>=<value>`.

```yaml
services:
  cont3xt:
    image: ghcr.io/arkime/arkime/arkime:v6-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh cont3xt --wait-for-db https://example.com:9200
    environment:
      - ARKIME_cont3xt__port=3220
      - ARKIME__elasticsearch=https://example.com:9200
    volumes:
      - ./cont3xt.ini:/opt/arkime/etc/cont3xt.ini
    restart: always
```

### Arkime 7 with ClickHouse Sessions
{: .subsubsection }

[Arkime 7](/release-v7#databases) can store sessions in ClickHouse while keeping stats, files, fields, hunts, history and users in OpenSearch/Elasticsearch.
This is experimental, try it out but keep OpenSearch/Elasticsearch for production.

ClickHouse needs its own one-shot init service. Use **`ch.pl upgrade`**, which creates the database and tables if they are missing and then migrates the schema, so it is safe on every start. Do **not** use `ch.pl init` here, it drops and recreates the sessions table.

```yaml
services:
  clickhouse:
    container_name: clickhouse
    image: clickhouse/clickhouse-server:26.8
    network_mode: "host"
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    volumes:
      - /chdata:/var/lib/clickhouse
    healthcheck:
      test: ["CMD-SHELL", "clickhouse client -q 'SELECT 1' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 30
    restart: unless-stopped

  # Same as the db-init above, for the cluster and users data
  db-init:
    container_name: db-init
    image: ghcr.io/arkime/arkime/arkime:snapshot-v7-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh db.pl --wait-for-db http://localhost:9200 -- http://localhost:9200 initorupgradenoprompt --ifneeded
    user: root
    restart: "no"

  # ch.pl upgrade is create-if-missing plus schema migration, so it is safe on a
  # fresh or an existing database. Do NOT use "ch.pl init", it drops the sessions table.
  ch-init:
    container_name: ch-init
    image: ghcr.io/arkime/arkime/arkime:snapshot-v7-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh ch.pl --wait-for-ch http://localhost:8123 -- http://localhost:8123 upgrade
    user: root
    depends_on:
      clickhouse:
        condition: service_healthy
    restart: "no"

  capture:
    container_name: capture
    image: ghcr.io/arkime/arkime/arkime:snapshot-v7-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --wait-for-db http://localhost:9200 --wait-for-ch http://localhost:8123 --update-geo
    user: root
    stop_grace_period: 60s
    depends_on:
      db-init:
        condition: service_completed_successfully
      ch-init:
        condition: service_completed_successfully
    environment:
      - ARKIME__interface=eth0
      - ARKIME__dropUser=nobody
      - ARKIME__elasticsearch=http://localhost:9200
      - ARKIME__sessionsDbUrl=clickhouse://localhost:8123/arkime
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
    restart: unless-stopped

  viewer:
    container_name: viewer
    image: ghcr.io/arkime/arkime/arkime:snapshot-v7-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh viewer --wait-for-db http://localhost:9200 --wait-for-ch http://localhost:8123 --add-admin
    user: root
    depends_on:
      db-init:
        condition: service_completed_successfully
      ch-init:
        condition: service_completed_successfully
    environment:
      - ARKIME__viewPort=8005
      - ARKIME__dropUser=nobody
      - ARKIME__elasticsearch=http://localhost:9200
      - ARKIME__sessionsDbUrl=clickhouse://localhost:8123/arkime
    volumes:
      - /arkime/etc:/opt/arkime/etc
      - /arkime/pcap:/opt/arkime/raw
    restart: unless-stopped
```

Things to know:

* With no password, the ClickHouse default user only accepts connections from localhost, which is why this example is `network_mode: host`. Set a user and password with [sessionsDbUrl](/settings#sessionsDbUrl) if that isn't true for you.
* ClickHouse has no ILM/ISM. Expire old sessions with `ch.pl <url> expire <days>` from a cron job or a scheduled container.
* Want to try ClickHouse with the sensors you already have? esProxy's `[tee]` section can copy every session into ClickHouse while your viewers keep reading OpenSearch/Elasticsearch, see [esProxy](/esproxy).

## Sample Capture/Viewer Config File
{: .subsection }
The Arkime defaults are usually good enough to get started.  The examples save this file as `/opt/arkime/etc/config.ini` and mount the `/opt/arkime/etc` directory into the container.

```
[default]
### DB Settings - https://arkime.com/settings#db
elasticsearch=***UPDATE***

### PCAP Reading - https://arkime.com/settings#reader-afpacket
interface=***UPDATE***
snapLen=32768
pcapReadMethod=afpacketv3
tpacketv3NumThreads=1

### PCAP Writing - https://arkime.com/settings#pcapstorage
pcapDir=/opt/arkime/raw

### Processing - https://arkime.com/settings#capture
packetThreads=1
rirFile=/opt/arkime/etc/ipv4-address-space.csv
ouiFile=/opt/arkime/etc/oui.txt
#rulesFiles=/opt/arkime/etc;/opt/arkime/share

### User/Group to drop privileges to, pcapDir must be writable by this user or group
dropUser=nobody
dropGroup=daemon
```

## Common Issues
{: .subsection }

### Can't view PCAP files

The capture and viewer must use the same node name when on the same physical host.
When using different containers for capture and viewer, you may need to add a `-n <nodename>` to both the capture and viewer commands, after the `--`:

```yaml
    command: /opt/arkime/bin/docker.sh capture --wait-for-db http://localhost:9200 -- -n sensor1
```

The viewer also has to see the same pcap, so both containers need the same `/opt/arkime/raw` mount.

### The viewer returns "Bad Request"

This almost always means [webBasePath](/settings#webBasePath) doesn't match the path you are using.
If you reverse proxy the viewer under a path prefix, `webBasePath` must be that prefix **with leading and trailing slashes** (`/arkime/`), and once it is set the viewer is only reachable under that path.
If you aren't proxying, don't set `webBasePath` at all.
There is a full Caddy example in the [UDR7 guide](/udr7).

### Can't log in to a brand new install

A fresh database has no users. Add `--add-admin` to the viewer command to create an `admin`/`admin` user (and change the password right away), or run `arkime_add_user.sh` in the container.

### Permission denied writing pcap

The pcap directory has to be writable by the user capture drops to. With the examples' `dropUser=nobody`:

```bash
chown nobody /arkime/pcap /arkime/etc
```

Avoid `/home` based paths, they tend to have restrictive permissions.

### Capture loses the last sessions when stopped

capture needs time to flush its sessions and close its pcap files. Docker's default stop timeout is 10 seconds, which is often not enough on a busy sensor. Set `stop_grace_period: 60s` on the capture service (or `docker stop -t 60`).

### The database upgrade didn't run

`depends_on` is only applied by `docker compose up`. After a reboot, a crash, or `docker compose restart`, the `db-init` service does not run again. Run `docker compose up -d` after pulling a new image, and keep `--wait-for-db` on everything that talks to the database.

### Uploading PCAP through the UI does nothing useful

[uploadCommand](/settings#uploadCommand) runs `capture` inside the **viewer** container, so that viewer also needs the GeoIP, RIR and OUI settings and the MaxMind volume, otherwise the uploaded sessions are missing the enrichment your sensors add. The [UDR7 guide](/udr7) shows the full group of settings to enable together.

For a more complete real-world example (including a colocated Elasticsearch container, ILM, the ja4 plugin, TZSP capture, and a Caddy HTTPS proxy), see the [UDR7 guide](/udr7).

</div>

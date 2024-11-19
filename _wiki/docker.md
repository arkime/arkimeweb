---
title: Docker
layout: wiki
permalink: "/docker"
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Docker
{: .section-header.mt-1 }

Great news for containerized deployments!
Starting with version 5.5.0, Arkime offers official Docker images for a simplified setup.
We've adopted a user-friendly approach: a single image handles all Arkime tools, with specific commands determining which tool launches.

We provide a docker.sh script (optional) to initiate different tools using the image.
However you don't have to use it, you can run the tools directly from the container.
This gives you control over how you interact with Arkime within your container environment.

To see the options that docker.sh supports try out `docker run ghcr.io/arkime/arkime/arkime:v5-latest /opt/arkime/bin/docker.sh help`

[Github Arkime Container Registry](https://github.com/arkime/arkime/pkgs/container/arkime%2Farkime)

## Choosing the Right Arkime Image Tag
{: .subsection }

We offer several tags to help you choose the right Arkime image for your needs.
All of our releases are multi architecture, so you can use the same tag on both amd64 and arm64 systems.

### Stable Releases:

* v5-latest: This tag points to the most recent stable release within the 5.x series. Use this if you want to stay on a specific major version. (recommended)
* latest: This tag points to the most recent stable release.
* v5.M.B: This tag points to a specific release version (e.g., v5.5.0). Use this if you need a particular version for compatibility or other reasons.

### Development Snapshots:

* snapshot-v5-latest: This tag points to the latest development snapshot, which is built after each commit. Use this if you're testing the latest features or bug fixes, if you're contributing to the Arkime project, or you like the thrill of living on the edge. This should be stable enough for most users, but it's not recommended for production use.
* snapshot-v6-latest: This tag points to the latest development snapshot for the upcoming 6.x release. Currently not recommended for anyone.

## Configuring Arkime Docker Containers
{: .subsection }

You can configure Arkime Docker containers using three primary methods:

1. Configuration File:
* Create a local configuration file.
* Mount this file into the container to override default settings.
* Some complex config file sections require this method.
2. Environment Variables:
* Set environment variables to configure the container. (`ARKIME_<section>__<config>=<value>`)
* These variables take precedence over configuration file settings.
3. Command-Line Options:
* Use the `-o` command-line option to specify additional configuration options. (`-o <section>.<config>=<value>`)
* This method provides flexibility for one-time or specific configuration changes, but not recommended.

For comprehensive configuration, consider combining these methods:
* Base Configuration: Use a configuration file for general settings.
* Overrides: Employ environment variables for specific overrides.

By strategically combining these methods, you can effectively tailor Arkime Docker containers to your specific requirements.

## Setting up an Arkime environment
{: .subsection }

1. Install OpenSearch or Elasticsearch
* You can use either Docker or a standalone installation.
2. Initialize OpenSearch or Elasticsearch for Arkime use
* `docker run ghcr.io/arkime/arkime/arkime:v5-latest /opt/arkime/db/db.pl --insecure https://ESHOST:9200 init`
* This is a one time operation to create the Arkime indices in OpenSearch/Elasticsearch.
* Use the special hostname `host.docker.internal` for ESHOST if OpenSearch/Elasticsearch is running on the same host.
* You may need to specify a network mode for docker, such as `--network=host`.
3. Setup directories
* You'll need directories for your pcap and configuration files.
* The examples use `/opt/arkime/raw` and `/opt/arkime/etc` - mounting these directories into the container.
* When using /home directories you may run into permission issues.
4. Create configuration files - You can use the default configuration or create your own at `/opt/arkime/etc/config.ini` [Arkime Settings](/settings).
5. Start your Arkime containers.

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
rulesFiles=/opt/arkime/etc/default.rules
rirFile=/opt/arkime/etc/ipv4-address-space.csv
ouiFile=/opt/arkime/etc/oui.txt

### User/Group to drop privileges to, pcapDir must be writable by this user or group
dropUser=nobody
dropGroup=daemon
```

## Docker Compose Examples
{: .subsection }

### Cont3xt
{: .subsubsection }

In this example we are starting cont3xt and using a local cont3xt.ini file and overriding the port cont3xt listens on.
Environment variables are of the format `ARKIME_<section>__<config>=<value>`.

```
version: '3'

services:
  cont3xt:
    image: ghcr.io/arkime/arkime/arkime:v5-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh cont3xt
    environment:
      - ARKIME_cont3xt__port=3220
    volumes:
      - ./cont3xt.ini:/opt/arkime/etc/cont3xt.ini
    restart: always
```

### Capture and Viewer

For capture and viewer you'll need to mount a directory for the pcap data and we recommend mounting a etc directory for the configuration and all the extra GEO files. Make sure the directories are writable by the container.

```
version: '3'

services:
  capture:
    image: ghcr.io/arkime/arkime/arkime:v5-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --update-geo
    volumes:
      - /opt/arkime/raw:/opt/arkime/raw
      - /opt/arkime/etc:/opt/arkime/etc
    restart: always
  viewer:
    image: ghcr.io/arkime/arkime/arkime:v5-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh viewer
    volumes:
      - /opt/arkime/raw:/opt/arkime/raw
      - /opt/arkime/etc:/opt/arkime/etc
    restart: always
```

</div>

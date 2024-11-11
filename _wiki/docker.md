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

To see the options that docker.sh supports try out `docker run ghcr.io/arkime/arkime/arkime:snapshot-v5-latest /opt/arkime/bin/docker.sh help`

## Choosing the Right Arkime Image Tag
{: .subsection }

[Github Container Registry](https://github.com/arkime/arkime/pkgs/container/arkime%2Farkime)

### Stable Releases:

* v5-latest: This tag points to the most recent stable release within the 5.x series. Use this if you want to stay on a specific major version. (recommended)
* latest: This tag points to the most recent stable release.
* v5.M.B: This tag points to a specific release version (e.g., v5.5.0). Use this if you need a particular version for compatibility or other reasons.

### Development Snapshots:

* snapshot-v5-latest: This tag points to the latest development snapshot, which is built after each commit. Use this if you're testing the latest features or bug fixes, if you're contributing to the Arkime project, or you like the thrill of living on the edge. This should be stable enough for most users, but it's not recommended for production use.
* snapshot-v6-latest: This tag points to the latest development snapshot for the upcoming 6.x release. Currently not recommended for anyone.

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

For capture and viewer you'll need to mount a directory for the pcap data and we recommend mount a etc directory for the configuration and all the extra GEO files.

```
version: '3'

services:
  capture:
    image: ghcr.io/arkime/arkime/arkime:v5-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh capture --update-geo
    volumes:
      - /pcap:/opt/arkime/raw
      - /opt/arkime/etc:/opt/arkime/etc
    restart: always
  viewer:
    image: ghcr.io/arkime/arkime/arkime:v5-latest
    network_mode: "host"
    command: /opt/arkime/bin/docker.sh viewer
    volumes:
      - /pcap:/opt/arkime/raw
      - /opt/arkime/etc:/opt/arkime/etc
    restart: always
```

</div>

---
title: JA4
layout: wiki
permalink: "/ja4"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Arkime JA4 Usage

---


Arkime supports JA4, JA4s, JA4x, and JA4ssh with versions 5.0.0 and later.

## JA4
JA4, the TLS Client Fingerprinting portion, is built into the Arkime capture binary.
After installing Arkime 5 or later, you will automatically see tls.ja4 field show up.
We recommend using the [latest commit builds](https://github.com/arkime/arkime/releases/tag/last-commit) for now.

## JA4+
JA4+ algorithms have licensing requirements.
Please [familiarize](https://github.com/FoxIO-LLC/ja4#licensing) yourself with them before installing/enabling the JA4+ portions of Arkime.


To install/enable the JA4+ algorithms you need to:
* download the ja4plus.amd64.so or ja4plus.arm64.so plugin, please download from the SAME location/version as the Arkime you are using
* install the download in the `/opt/arkime/plugins` directory on all machines that run capture
* edit the /opt/arkime/etc/config.ini file, modifying the `plugins=` line so it contains the plugin, for example `plugins=ja4plus.amd64.so`
* restart capture, which will cause the tls.ja4s and cert.ja4x fields to be automatically created for new sessions

## Other JA4+ algorithms
Implementing some of the other JA4+ algorithms is on the Arkime todo list.
</div>

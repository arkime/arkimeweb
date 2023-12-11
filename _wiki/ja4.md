---
title: JA4
layout: wiki
permalink: "/ja4"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Arkime JA4 Usage

---


Arkime supports JA4, JA4s, JA4x with versions 5.0.0 and later.

## JA4
JA4, the TLS Client Fingerprinting portion, is built into the Arkime capture binary.
After install Arkime 5 or later, you will automatically see tls.ja4 data show up.

## JA4+
JA4+ algorithms have some licensing requirements.
Please [familiarize](https://github.com/arkime/arkime/releases/tag/last-commit) yourself with them before enabling JA4+ portions of Arkime.


To enable JA4s and JA4x you should
* download the JA4plus plugin and install it in the `/opt/arkime/plugins` directory on all machines that run capture
* edit the /opt/arkime/etc/config.ini file, modifingy the `plugins=` line so it contains the plugin, for example `plugins=ja4plus.amd64.so`
* restart capture which will cause the tls.ja4s and cert.ja4x fields to be automatically created for new sessions

## Other JA4+ algorithms
Implementing some of the other JA4+ algorithms is on the Arkime todo list.

</div>

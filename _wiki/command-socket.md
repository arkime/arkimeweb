---
title: Command Socket
layout: wiki
permalink: "/command-socket"
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Command Socket
{: .section-header.mt-1 }

With Arkime 5.4 a new command socket was added to allow for more advanced control of Arkime.
The command socket is a Unix domain socket that is used by specifying the `--command-socket <filename>` option when starting capture.
When using the command socket in offline mode, you will probably also want to use the `--command-wait` option, which will cause capture to wait to shutdown until the `shutdown` command is received.

Example Usage: <code>/opt/arkime/bin/capture --command-socket /tmp/arkime.socket --command-wait  --scheme</code> and then <code>nc -U /tmp/arkime.socket</code> to connect to the command socket interactively or <code>echo "help" | nc -U /tmp/arkime.socket</code> to send a command.

</div>

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

Example Usage: <code>/opt/arkime/bin/capture --command-socket /tmp/arkime.socket --command-wait  --scheme</code> 


```bash
echo "help" | nc -U /tmp/arkime.socket

add-dir                        - Add a directory to process
  [--delete|--nodelete]            Override command line delete files after processing
  [--op <field>=<value>]           Can be multiple, override command line op option
  [--skip|--noskip]                Override command line skip files already processed
  [--monitor|--nomonitor]          Override command line monitor the directory for new files option
  [--recursive|--norecursive]      Override command line Recurse sub directories option
  <dir>                            Directory to process
add-file                       - Add a file to process
  [--delete|--nodelete]            Override command line delete files after processing
  [--op <field>=<value>]           Can be multiple, override command line op option
  [--skip|--noskip]                Override command line skip files already processed
  <file>                           File to process
exit                           - Close the connection, can also use Ctrl-D
help                           - This help
plugins-list                   - List loaded plugins
set                            - Set/Get a config value - set [<name> [<value>]]
shutdown                       - Shutdown Arkime
version                        - Arkime Version
```

Or use <code>nc -U /tmp/arkime.socket</code> to connect to the command socket interactively.

</div>

---
title: Expression TLS on Unusual Ports
description: 'Requires Arkime 7. Tag TLS sessions that are not on a common TLS port and log what matched. A field != list means none of the values match.'
tags: expression tls tag log afterClassify
---

```
  - name: "TLS on unusual ports"
    when: "afterClassify"
    log: true
    expression: "protocols == tls && port.dst != [443, 8443, 993, 995, 465, 636]"
    ops:
      tags: "tls-odd-port"
```

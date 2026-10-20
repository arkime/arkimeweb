---
title: Expression Truncate Encrypted Traffic to the Internet
description: 'Requires Arkime 7. Only save the first 20 packets of TLS, QUIC and SSH sessions to hosts that are not private addresses. The expression is checked when protocols is set, isPrivate() covers RFC 1918, CGNAT, loopback, link local and IPv6 unique local addresses.'
tags: expression truncate fieldSet tls isPrivate
---

```
  - name: "Truncate external encrypted"
    when: "fieldSet"
    expression: "protocols == [tls, quic, ssh] && !isPrivate(ip.dst)"
    ops:
      _maxPacketsToSave: 20
```

---
title: Example Truncate PCAP localhost
description: 'Example rules that will drop all localhost packets after the first 20. Two rules are needed so we drop traffic both from and to localhost.'
tags: maxPacketsToSave fieldSet
---

```
  - name: "Drop from localhost"
    when: "fieldSet"
    fields:
      ip.src:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10

  - name: "Drop to localhost"
    when: "fieldSet"
    fields:
      ip.dst:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10
```

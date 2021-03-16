---
title: Example Truncate PCAP localhost
description: 'These example rules drop all localhost packets after the first 20. Two rules are needed so we drop traffic both to and from localhost.'
tags: maxPacketsToSave fieldSet localhost
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

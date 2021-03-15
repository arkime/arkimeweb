---
title: Drop Localhost
description: 'Sample rule that will drop all localhost packets after the first 20. If you want to add several rules, then the synatax is as follows. Make sure to have only one "rules:" per file.'
tags: localhost multiplerules drop
---

```
---
version: 1
rules:
  - name: "Drop localhost"
    when: "fieldSet"
    fields:
      ip.src:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10
  - name: "Drop localhost"
    when: "fieldSet"
    fields:
      ip.dst:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10
```

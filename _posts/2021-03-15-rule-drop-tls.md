---
title: Drop TLS
description: 'Sample rule that will drop all TLS packets after the first 20.'
tags: tls drop
---

```
---
version: 1
rules:
  - name: "Drop tls"
    when: "fieldSet"
    fields:
      protocols:
      - tls
    ops:
      _maxPacketsToSave: 20
```

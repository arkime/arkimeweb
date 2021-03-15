---
title: Drop Syn Scan
description: 'Sample rule to drop all syn scans. It requires packets.src = 1, packets.dst = 0, and tcpflags.syn = 1.'
tags: syn scan drop
---

```
---
version: 1
rules:
  - name: "Drop syn scan"
    when: "beforeFinalSave"
    fields:
      packets.src: 1
      packets.dst: 0
      tcpflags.syn: 1
    ops:
      _dontSaveSPI: 1
```

---
title: Drop Syn Scan
description: 'Rule to drop all syn scans from saving the session to Elasticsearch. It requires packets.src = 1, packets.dst = 0, and tcpflags.syn = 1.'
tags: syn scan drop
---

```
  - name: "Drop syn scan"
    when: "beforeFinalSave"
    fields:
      packets.src: 1
      packets.dst: 0
      tcpflags.syn: 1
    ops:
      _dontSaveSPI: 1
```

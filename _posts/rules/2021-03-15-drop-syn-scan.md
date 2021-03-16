---
title: Drop Syn Scan
description: 'This rule drops all syn scans from saving the session to Elasticsearch. It requires packets.src = 1, packets.dst = 0, and tcpflags.syn = 1.'
tags: syn scan drop dontSaveSPI
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

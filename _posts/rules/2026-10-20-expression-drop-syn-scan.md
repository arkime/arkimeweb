---
title: Expression Drop Syn Scan
description: 'Requires Arkime 7. The expression version of Drop Syn Scan, it drops syn scans from saving the session to OpenSearch/Elasticsearch.'
tags: expression syn scan drop dontSaveSPI
---

```
  - name: "Drop syn scan"
    when: "beforeFinalSave"
    expression: "packets.src == 1 && packets.dst == 0 && tcpflags.syn == 1"
    ops:
      _dontSaveSPI: 1
```

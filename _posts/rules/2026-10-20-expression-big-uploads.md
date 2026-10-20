---
title: Expression Big Uploads
description: 'Requires Arkime 7. Tag sessions where the source sent at least 100MB and more than 10 times what it received, using math in an expression.'
tags: expression upload exfil tag beforeFinalSave
---

```
  - name: "Big uploads"
    when: "beforeFinalSave"
    expression: "databytes.src > 10 * databytes.dst && databytes.src >= 100000000"
    ops:
      tags: "big-upload"
```

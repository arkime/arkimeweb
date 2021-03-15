---
title: Example dropByDst
description: 'The `_dropByDst` and `_dropBySrc` are very powerful if you want to drop traffic where the src/dst IPs could be ever shifting, such as a host on AWS. The packets are also dropped very early in the Arkime packet flow, so it can help with CPU. Here is an example that will start dropping any traffic to a IP that was used to talk to ad.beacon.something.example.com or ad2.beacon.something.example.com. Of course if other hosts use that same server from host header sharing that traffic will be dropped too, so be careful.'
tags: example dropByDst fieldSet
---

```
  - name: "Drop ad beacon"
    when: "fieldSet"
    fields:
      host.http:
      - ad.beacon.something.example.com
      - ad2.beacon.something.example.com
    ops:
      _dontSaveSPI: 1
      _dropByDst: 10
```

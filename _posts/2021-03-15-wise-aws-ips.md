---
title: AWS IPs
description: ''
tags: aws amazon ip cloud
---

```
{
  "url:aws-ips": {
   "type": "ip",
   "format": "json",
   "url": "https://ip-ranges.amazonaws.com/ip-ranges.json",
   "arrayPath": "prefixes",
   "keyPath": "ip_prefix",
   "fields": "field:cloud.service;db:cloud.service;kind:lotermfield;friendly:Service;shortcut:service\\nfield:cloud.region;db:cloud.region;kind:lotermfield;friendly:Region;shortcut:region",
   "view": "require:cloud;title:Public Cloud;section:cloud;fields:cloud.service,cloud.region",
   "reload": 120
  }
}
```

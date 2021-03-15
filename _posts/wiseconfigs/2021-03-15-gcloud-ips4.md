---
title: Google Cloud IPs4
description: ''
tags: google cloud gcloud ipv4 ip
---

```
{
  "url:gcloud-ips4": {
   "type": "ip",
   "format": "json",
   "url": "https://www.gstatic.com/ipranges/cloud.json",
   "arrayPath": "prefixes",
   "keyPath": "ipv4Prefix",
   "fields": "field:cloud.service;db:cloud.service;kind:lotermfield;friendly:Service;shortcut:service\\nfield:cloud.region;db:cloud.region;kind:lotermfield;friendly:Region;shortcut:scope",
   "view": "require:cloud;title:Public Cloud;section:cloud;fields:cloud.service,cloud.region",
   "reload": 120
  }
}
```

---
title: Google Cloud IPs4
description: 'Download the GCloud IP CIDRs from amazon and add cloud.region and cloud.service fields to session that match.'
tags: google cloud gcloud ip
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
  },
  "url:gcloud-ips6": {
    "type": "ip",
    "format": "json",
    "url": "https://www.gstatic.com/ipranges/cloud.json",
    "arrayPath": "prefixes",
    "keyPath": "ipv6Prefix",
    "fields": "field:cloud.service;db:cloud.service;kind:lotermfield;friendly:Service;shortcut:service\\nfield:cloud.region;db:cloud.region;kind:lotermfield;friendly:Region;shortcut:scope",
  "reload": 120
 }
}
```

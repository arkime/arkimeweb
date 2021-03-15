---
title: Azure IPs
description: ''
tags: azure ip cloud
---

```
{
  "url:azure-ips": {
   "type": "ip",
   "format": "json",
   "url": "https://www.microsoft.com/en-us/download/confirmation.aspx?id=56519",
   "urlScrapeRedirect": "https[^\"]*71D86715-5596-4529-9B13-DA13A5DE5B63[^\"]*json",
   "arrayPath": "values",
   "keyPath": "properties.addressPrefixes",
   "fields": "field:cloud.service;db:cloud.service;kind:lotermfield;friendly:Service;shortcut:name\\nfield:cloud.region;db:cloud.region;kind:lotermfield;friendly:Region;shortcut:properties.region",
   "view": "require:cloud;title:Public Cloud;section:cloud;fields:cloud.service,cloud.region",
   "reload": 120
  }
}
```

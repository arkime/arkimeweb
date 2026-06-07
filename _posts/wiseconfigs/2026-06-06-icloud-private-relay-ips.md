---
title: iCloud Private Relay IPs
description: "Download the iCloud Private Relay egress IP CIDRs from Apple and add mask.country, mask.region and mask.city fields to the sessions that match, providing geolocation of masked Apple devices."
tags: apple icloud ip cloud vpn proxy relay
---

```
{
  "url:icloud-private-relay-ips": {
    "type": "ip",
    "format": "csv",
    "column": "0",
    "url": "https://mask-api.icloud.com/egress-ip-ranges.csv",
    "reload": "120",
    "fields": "field:mask.country;db:mask.country;kind:termfield;friendly:Country;shortcut:1\\nfield:mask.region;db:mask.region;kind:termfield;friendly:Region;shortcut:2\\nfield:mask.city;db:mask.city;kind:termfield;friendly:City;shortcut:3",
    "view": "require:mask;title:Apple Private Relay;section:mask;fields:mask.country,mask.region,mask.city"
  }
}
```

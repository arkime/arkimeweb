---
title: API
layout: wiki
permalink: "/apiv0-2"
---

- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="collapse-btn d-none d-sm-block"
  onclick="toggleToc()">
  <span class="fa fa-angle-double-left">
  </span>
</div>

<div class="full-height-container with-footer pt-3 pr-2 pl-2 pb-3" markdown="1">

# Viewer v0.x - v2.x API

This is the documentation for version v0.x - v2.x. [Here is the the API for current versions](/api).

**Note:** Many of the API endpoints require a db field name, which is not the same as what you would use in a search expression.
The easiest way to see database field names is to click the owl within Arkime -> click the fields label on left -> click display the database fields.

---

## /fields

Retrieve available field objects

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
array|boolean|Whether to return an array of fields, otherwise returns a map
{: .table .table-striped .table-sm .mb-4 }

You can also fetch the fields from Elasticsearch directly
{: .mb-0 }

    curl 'http://localhost:9200/fields/_search?pretty&size=1000'

---

## /eshealth.json

Retrive Elasticsearch health and stats

---

## /connections.json

Retrieve the connections data in json format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
dstField|string|The source database field name (Default: a2)
expression|string|The expression string
iDisplayLength|integer| < 0.12 - The number of items to return (Default: 5000, Max: 2000000)
iDisplayStart|integer| < 0.12 - The entry to start at (Default: 0)
length|integer| >= 0.12 - The number of items to return (Default: 5000, Max: 2000000)
srcField|string|The source database field name (Default: a1)
start|integer| >= 0.12 - The entry to start at (Default: 0)
startTime|string|If the date parameter is not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the stop time of data to return. If and integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
{: .table .table-striped .table-sm .mb-4 }

---

## /connections.csv

Retrieve the connections data in csv format

### Parameters
{: .no_toc }
Same as /connections.json

---

## /file/list

Return a list of files that arkime knows about.
{: .mb-0 }

    GET /file/list

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
iDisplayLength|integer| < 0.12 - The number of items to return (Default: 500, Max: 10000)
iDisplayStart|integer| < 0.12 - The entry to start at (Default: 0)
length|integer| >= 0.12 - The number of items to return (Default: 500, Max: 10000)
start|integer| >= 0.12 - The entry to start at (Default: 0)
{: .table .table-striped .table-sm .mb-4 }

---

## /sessions.json

Retrieve the session data in json format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
expression|string|The expression string
facets|boolean|Also include the aggregation information for maps and time graphs
iDisplayLength|integer| < 0.11 - The number of items to return (Default: 100, Max: 2000000)
iDisplayStart|integer| < 0.11 - The entry to start at (Default: 0)
length|integer| >= 0.12 - the number of items to return (Default: 100, Max: 2000000)
start|integer| >= 0.12 - The entry to start at (Default: 0)
startTime|string|If the date parameter is not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the stop time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
fields|string|Comma separated list of db field names to return. If not specified the default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel
order|string|Comma separated list of db field names to sort on. Optionally can be followed by :asc or :desc for ascending or descending sorting.
{: .table .table-striped .table-sm .mb-4 }

---

## /sessions.csv

Retrieve the session data in csv format

### Parameters
{: .no_toc }

Same as /sessions.json

---

## /sessions.pcap

Retrieve the raw session data in pcap format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
expression|string|The expression string, used if ids not set
ids|string|The list of ids to return
iDisplayLength|integer| < 0.12 - The number of items to return (Default: 100, Max: 2000000)
iDisplayStart|integer| < 0.12 - The entry to start at (Default: 0)
length|integer| >= 0.12 - The number of items to return (Default: 100, Max: 2000000)
segments|boolean|When set return linked segments
start|integer| >= 0.12 - The entry to start at (Default: 0)
startTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
{: .table .table-striped .table-sm .mb-4 }

---

## /spigraph.json

Retrieve the spigraph data in json format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
expression|string|The expression string
field|string|The database field name to spigraph on
size|integer|The number of unique values to return
startTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
{: .table .table-striped .table-sm .mb-4 }

---

## /spiview.json

Retrieve the spiview data in json format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
expression|string|The expression string
spi|boolean|A comma separated list of fields to return data for
startTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
{: .table .table-striped .table-sm .mb-4 }

---

## /unique.txt

Retrieve the unique data for a field in text format

### Parameters
{: .no_toc }

Name | Type | Description
-----|------|---------------
date|integer|The number of hours of data to return, -1 means all data
expression|string|The expression string
exp|string|The expression field name to unique on. Either exp or field is required, field is given priority if both are present.
field|string|The database field name to unique on. Either exp or field is required, field is given priority if both are present.
startTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
stopTime|string|If the date parameter not set, this is the start time of data to return. If an integer the number of seconds since Unix EPOC is used, otherwise parsed with javascript Date parser.
strictly|boolean|When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed.
view|string|The view name to apply before the expression
{: .table .table-striped .table-sm .mb-4 }

---

## /addTags

A POST request that can add tags to individual sessions by id or by query. The URL query parameters can be the same as session.json to select the session to tag. The POST body must contain a tags item which is a comma separated list of tags to add and optionally ids which is a comma separated list of document ids.

---

## /removeTags

A POST request that can remove tags from individual sessions by id or by query. The URL query parameters can be the same as session.json to select the session to remove tags from. The POST body must contain a tags item which is a comma separated list of tags to remove and optionally ids which is a comma separated list of document ids.

</div>

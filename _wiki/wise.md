---
title: API
layout: wiki
permalink: "/wise"
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

# WISE
## With Intelligence See Everything
{: .no_toc}

----

WISE is a framework for integrating data feeds into Arkime. The data feeds can be sourced from local files, remote URLs, or commercial services such as OpenDNS, Emerging Threats Pro, and others. The data feeds can set almost any Arkime field or even create new Arkime fields. Think of WISE as the next and better version of the tagger plugin.

WISE requires a plugin be installed on each arkime-capture instance, another plugin for each viewer instance and that a wiseService process be running. The wiseService process can be shared by multiple arkime-capture servers, even if they are in different arkime clusters. Choosing the machine that the wiseService runs on is important and the networking setup is crucial. The arkime-capture process connects to the wiseService AND the wiseService will need to reach out to any commercial services (if configured). All lookups are double cached, first in the wiseService so the remote service isn't queried too often and then in the arkime-capture process for load reduction. Maximum cache times and number of items are configurable.

WISE was first available with Arkime 0.11.3

---

## Installation

### wiseService
The wiseService is the proxy and aggregator between arkime-capture and the various data sources. All the arkime-capture processes need to be able to reach it. If using external or commercial services then wiseService also needs to be able to reach those services. So pay attention to the networks available and machine setup.
{: .mb-0}

* Pick a host on the correct networks and checkout arkime, wiseService lives in `/data/arkime/wiseService`
* Initial install can be done with `/data/arkime/bin/Configure --wise` starting with Arkime 0.20.2

### wiseService Settings
Most settings will be in the individual sources for wise, however there are a few global settings

#### Caching
WISE uses multiple caches to speed up queries.

The wise.so plugin caches all results returned by wiseService, documented [here](wise#wiseso-settings).
This cache will have all recent results, no matter the wise data source, so that the capture process doesn't need to communicate with wiseService for reoccurring traffic.

The wiseService also caches all results returned by external sources.
All caching is done in memory, however since 0.15 Redis can be used for a larger external cache.
An external source is something like OpenDNS or Reverse DNS, where it is impossible to load the entire data set into memory and WISE needs to make a external query to obtain results.
An internal source is something like file or url, where each wiseService can have the entire data set.

Create a `[cache]` section
{: .mb-0}

Setting | Default | Description
--------|---------|------------
type | memory | `memory` or `redis` are supported
url | empty | For cache engines this is the url to connect to. For redis the format is `[redis:]//[[user][:password@]]host:port[/db-number]`
{: .table .table-striped .table-sm .mb-4 }


### wise.so plugin
Each arkime-capture node needs to have the wise.so plugin
{: .mb-0}

* Do a normal arkime update and compile
* In the `config.ini` file for arkime-capture add
  * default section `wiseHost=wisehost.com`
  * to the `plugins` line, either globally, per class or per node,  add `wise.so`

#### wise.so Settings
Usually just setting wiseHost is enough. These can be set globally, per class or per node.
{: .mb-0}

Setting | Default | Description
--------|---------|------------
wiseCacheSecs|600|Number of seconds to cache results before asking wiseService again
wiseHost|127.0.0.1|Host to connect to for wiseService, not used if wiseURL is set
wiseMaxCache|100000|Max number of items to store in the wise cache that is local to each arkime-capture node
wiseMaxConns|10|Number of connections to wiseService, this is also the number of concurrent wise queries.
wiseMaxRequests|100|Number of oustanding requests to the wiseService
wisePort|8081|Port the wiseService is listening on, not used if wiseURL is set
wiseTcpTupleLookups|FALSE|Should we send tcp tuple lookups to wise
wiseUdpTupleLookups|FALSE|Should we send udp tuple lookups to wise
wiseURL| |(Since 1.5.0) The url to use to connect to wise
wiseLogEvery|10000|Log wise stats every X wise requests
wiseExcludeDomains|.in-addr.arpa;.ip6.arpa|A semicolon separate list of domain suffixes to not send to wise
{: .table .table-striped .table-sm .mb-4 }

Since 1.5.0 wise also now lets you configure which fields are used for the standard wise types and you can add your own wise types. You do this by creating a `[wise-types]` section in the capture config.ini AND listing the fields using `{type}={expression};{db:dbfield}...`. The type field must be less then 12 characters, and is the same type field you would use in the wise service.

Standard config
{: .mb-0}

Type | Default | Notes
-----|---------|------
ip | db:http.xffIp | srcIp and dstIp are always looked up for ip
url | db:http.uri |
domain | db:http.host;db:dns.host
md5 | db:http.md5;db:email.md5
sha256 | db:http.sha256;db:email.sha256 | supportSha256 must be set to true in your config file
email | db:email.src;db:email.dst |
ja3 | db:tls.ja3
{: .table .table-striped .table-sm .mb-4 }

### viewer
Requires that `wise.js` be added to the `viewerPlugins=` line globally, per class or per node.

---

## WISE UI
There is a WISE User Interface to view/edit/delete your WISE Sources and to update your WISE configuration and cache. It also allows a user to query and view statistics about your configured WISE Sources.

To build and run the WISE UI, check out our [README](https://github.com/arkime/arkime/blob/master/wiseService/README.md).

---

## Common Source Settings
All sources support some common settings such excluding IPs, Domains and Email addresses from lookups. It is also possible to exclude across all sources by placing the exclude config in the `wiseService` section.
{: .mb-0}

Setting | Default | Description
--------|---------|------------
excludeIPs|EMPTY|Semicolon separated list of IPs or CIDRs to exclude in lookups
excludeDomains|EMPTY|Semicolon separated list of modified glob patterns to exclude in lookups
excludeEmails|EMPTY|Semicolon separated list of modified glob patterns to exclude in lookups
cacheAgeMin|60|Number of minutes items in the cache for this source are valid for. Ignored for sources that use internal data, such as file sources.
onlyIPs|EMPTY|If set, only ips that match the semicolon separated list of IPs or CIDRs will be looked up
fields|EMPTY|A "\n" separated list of fields that this source will add. Some wise sources automatically set for you. See [Tagger Format](taggerformat) for more information on the parts of a field entry.
view|EMPTY|The view to show in session detail when opening up a session with unique fields. The value for view can either be written in simplified format or in more powerful jade format. For the jade format [Tagger Format](taggerformat) for more information except everything has to be on one line, so replace newlines with \n. Simple format looks like `require:[toplevel db name];title:[title string];fields:[field1],[field2],[fieldN]`
{: .table .table-striped .table-sm .mb-4 }

### Glob Rules
* To match zero or more characters either `*` or `%` may be used
* To match a single digit `#` may be used
* To match a character with special meaning, you must precede it with "~". The "~" also serves as the escape character
* To match one of a specific list of characters, you may surround the character with square brackets
* Globs are anchorced on both end, use `*` to unanchor
* String case doesn't matter

---

## Commercial Sources

### Alien Vault
The Alien Vault data source currently uses the downloadable database that is updated often. Requires that access be purchased and configured.

Create a `[alienvault]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
key|REQUIRED|The API key
{: .table .table-striped .table-sm .mb-4 }

### Emerging Threats Pro
The Emerging Threats Pro data source currently uses the downloadable database that is updated often. Requires that access be purchased and configured.

Create a `[emergingthreats]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
key|REQUIRED|The API key
{: .table .table-striped .table-sm .mb-4 }

### OpenDNS Umbrella
The OpenDNS source currently uses the bulk query api and does live queries. Requires that access be purchased and configured.

Create a `[opendns]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
key|REQUIRED|The API key
cacheSize|200000|Maximum number of results to cache
{: .table .table-striped .table-sm .mb-4 }


### ThreatQ
The ThreatQ export interval time should be configured depending on process requirements and indicator volume. A minimum of version 1.16.4 is required for Arkime integration.

Create a `[threatq]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
key|REQUIRED|The API key
host|REQUIRED|Server hostname location
{: .table .table-striped .table-sm .mb-4 }

### Threatstream
The Threatstream data source currently uses the downloadable database that is only updated once a day. Requires that access be purchased and configured.

Create a `[threatstream]` section to configure.
{: .mb-0}

Setting | Default | Description
--------|---------|------------
key|REQUIRED|The API key
user|REQUIRED|The API user
{: .table .table-striped .table-sm .mb-4 }

### Splunk
The Splunk wise service can run in two different modes.
It can query Splunk for every value or it can query splunk periodicly for a table of values.
Many Splunk operators prefer the periodic query since they can scale for it.

Create a `[splunk:UNIQUENAME]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
type|REQUIRED|any type- The type of data in the file
host|REQUIRED|The Splunk hostname
keyColumn|REQUIRED|The column to use from the returned data to use as the key
periodic|false|Should we do periodic queries or individual queries
port|REQUIRED|The Splunk port
query|REQUIRED|The query to run against Splunk. For non periodic queries the string %%SEARCHTERM%% will be replaced with the key.
version|5|The Splunk api version to use
{: .table .table-striped .table-sm .mb-4 }

Example config that will query Splunk for all the vpn_ip to user name mappings during the last 24 hours every 60 seconds. It will then set the user field for any ip that matches.
{: .mb-0}

```
[splunk:users]
type = ip
format = json
host = spunk.example.com
port=5500
username=theuser
password=thepassword
periodic=60
query=search index="THEINDEX" sourcetype="vpn" assigned earliest=-24h | rex "User <(?<user>[^>]+)>.*IPv4 Address <(?<vpn_ip>[^>]+)>" | dedup vpn_ip | table user, vpn_ip
keyColumn=vpn_ip
fields=field:user;shortcut:user
```

---

## Free Sources

### Elasticsearch

The Elasticsearch wise service can query elasticsearch for fields to set

Create a `[elasticsearch:UNIQUENAME]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
type|REQUIRED|The type of data in the file, such as ip,domain,md5,ja3,email, or something defined in `[wise-types]`
elasticsearch|REQUIRED|Elasticsearch base url
esIndex|REQUIRED|The index pattern to look at
esTimestampField|REQUIRED|The field to use in queries that has the timestamp in ms.
esMaxTimeMS|1 hour|Timestamp field must be less then this
esResultField|REQUIRED|Field that is required to be in the result
{: .table .table-striped .table-sm .mb-4 }

Example config that will query elasticsearch for an ip that is in the 10.172/16 space, in the index TheIndex-\*, only looking at records that have a \@timestamp field newer than 86400000ms. It looks at the `cef_ext.src` field and only looks at records that has a cef_ext.suser field set. Once it has a result it sets the user field in arkime to whatever the `cef_ext.suser` field is in the document.

```
type=ip
onlyIPs=10.172.0.0/16
elasticsearch=http://ELKCLUSTERHOST1:9200,http://ELKCLUSTERHOST2:9200
esIndex=TheIndex-*
esTimestampField=@timestamp
esQueryField=cef_ext.src
esMaxTimeMS=86400000
esResultField=cef_ext.suser
fields=field:user;shortcut:cef_ext.suser
```

### File

The wiseService can monitor multiple files. Each file needs to have its own section, with the section name starting with `file:`. The wiseService automatically notices if the file changes and reloads it.

Create a `[file:UNIQUENAME]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
file|REQUIRED|The file to load
tags|REQUIRED|Comma separated list of tags to set for matches
type|REQUIRED|The type of data in the file, such as ip,domain,md5,ja3,email, or something defined in `[wise-types]`
format|csv|csv,[Tagger Format](taggerformat),json - The format of data file
keyColumn|0|For json formatted files, which json field is the key
column|0|For csv formatted files, which column is the data
{: .table .table-striped .table-sm .mb-4 }

#### CSV Example

Config File
{: .mb-0}

```
[file:ipcsv]
file=./ip.wise.csv
tags=ipwisecsv
type=ip
column=1
format=csv
#Asset field already exist, use field 0 for value. extra field is new, use field 2 for value
fields=field:asset;shortcut:0\nfield:extra;kind:lotermfield;count:true;friendly:extra;db:extra;help:Help for Extra;shortcut:2
```

The CSV File
{: .mb-0}

```
blah1,10.0.0.3
blah2,10.0.0.2,foo
```

#### Tagger Example

Config File
{: .mb-0}

```
[file:iptagger]
file=./ip.wise.tagger
tags=ipwisetagger
type=ip
format=tagger
```

The Tagger File
{: .mb-0}

```
#field:extra;kind:lotermfield;count:true;friendly:extra;db:extra;help:Help for Extra
10.0.0.3;asset=blah1
10.0.0.2;asset=blah2;extra=foo
```

#### JSON Example

Config File
{: .mb-0}

```
[file:ipcsv]
file=./ip.wise.json
tags=ipwisejson
type=ip
keyColumn=theip
format=json
#Asset field already exist, use field asset for value. extra field is new, use field extra for value
fields=field:asset;shortcut:asset\nfield:extra;kind:lotermfield;count:true;friendly:extra;db:extra;help:Help for Extra;shortcut:extra\n
```

The JSON File
{: .mb-0}

```
[{"asset": "blah", "theip": "10.0.0.3"},
 {"asset": "blah2", "theip": "10.0.0.2", "extra": "foo"}]
```

**Note:** you use shortcut to match between fields in the JSON dictionary and the properties in ElasticSearch.

#### Subnets Example

More complex example of the above where you want to create a new section
{: .mb-0}

```
[file:subnets]
type=ip
format=json
file=subnets.json
keyColumn=ip
fields=field:subnets.description;kind:termfield;count:true;friendly:Description;db:subnets.description;help:Description;shortcut:description\nfield:subnets.securityzone;kind:termfield;count:true;friendly:Security Zone;db:subnets.securityzone;help:Security Zone;shortcut:securityZone\nfield:subnets.vlan;kind:integer;count:true;friendly:Vlan;db:subnets.vlan;help:Vlan;shortcut:vlan\nfield:subnets.site;kind:termfield;count:true;friendly:Site;db:subnets.site;help:Site;shortcut:site
# Jade view method
view=if (session.subnets)\n    +arrayList(session.subnets, 'description', 'Description', 'subnets.description')\n    +arrayList(session.subnets, 'label', 'Label', 'subnets.label')\n    +arrayList(session.subnets, 'securityzone', 'Security Zone', 'subnets.securityzone')\n    +arrayList(session.subnets, 'vlan', 'Vlan', 'subnets.vlan')\n    +arrayList(session.subnets, 'site', 'Site', 'subnets.site')
# Simple view method
#view=require:subnets;title:Subnets;fields:subnets.description,subnets.label,subnets:securityzone,subnets.vlan,subnets.site
```

The JSON File
{: .mb-0}

```
[{"description": "the description", "label": "interesting label", "securityzone": "hot", "vlan": 123, "site": "secret",  "ip": "10.0.0.3"},
 {"description": "the description2", "label": "interesting label2", "securityzone": "cold", "vlan": 123, "site": "secret",  "ip": "10.0.0.2"}]
```

### Redis

Since 0.15.1 Redis can be used as a wise data source.
If using redis as a wise cache you'll probably want to use a different redis "database" by specifying the database number in the url. Example: `url=redis://localhost/1`
Each redis source can only handle one type of data, although multiple redis sources can be configured and they can use the same redis database.

Create a `[redis:UNIQUENAME]` section to configure.
{: .mb-0}

Setting | Default | Description
--------|---------|------------
url|REQUIRED|The format is `[redis:]//[[user][:password@]]host:port[/db-number]`
tags|REQUIRED|Comma separated list of tags to set for matches
type|REQUIRED|The type of data in the file, such as ip,domain,md5,ja3,email, or something defined in `[wise-types]`
format|csv|csv,[Tagger Format](taggerformat),json - The format of data file
column|0|For csv formatted files, which column is the data
template|%key%|The template when forming the key name. %key% = the key being looked up, %type% = the type being looked up.
{: .table .table-striped .table-sm .mb-4 }

### ReverseDNS

For IPs that are included by the ips setting, do a reverse lookup and place everything before the first dot in the field specified.

Create a `[reversedns]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
field|REQUIRED|The field to set with the hostname
ips|REQUIRED|Semicolon separated list of IPs or CIDRs to lookups. Ips that don't match this list will NOT be reverse lookuped.
servers|EMPTY|Since 1.6.1, if set the reversedns source will use the semicolon separated list of ip addresses to reverse lookuped.
stripDomains|EMPTY|If EMPTY then all domains are stripped after the FIRST period. When set ONLY domains that match the semicolon separated list of domain names are modified, and only the matching part is removed. Those that don't match will be saved in full. The list is checked in order. A leading dot is recommended. For example `stripDomains=.foo.example.com;.example.com` will convert `test1.foo.example.com` to `test1`, `test2.bar.example.com` to `test2.bar` and finally `test3.bar.com` to `test3.bar.com` - Added in 0.11.4
cacheSize|200000|Maximum number of results to cache
{: .table .table-striped .table-sm .mb-4 }

### URL

The wiseService can monitor and download URL. Each url needs to have its own section, with the section name starting with `url:`. The wiseService can automatically download and reload the files.

Create a `[url:UNIQUENAME]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
url|REQUIRED
|The URL to load
tags|REQUIRED|Comma separated list of tags to set for matches
type|REQUIRED|The type of data in the file, such as ip,domain,md5,ja3,email, or something defined in `[wise-types]`
format|csv|csv,[Tagger Format](taggerformat),json - The format of data file
column|0|For csv formatted files, which column is the data
refresh| -1|How often in minutes to refresh the file, or -1 to never refresh it
headers| |Semicolon separated list of headers to send in the URL request
{: .table .table-striped .table-sm .mb-4 }

---

## Other Sources

This are WISE sources that aren't really data sources.

### HODI
Experimental "History of Observed Data Indicators" plugin. This watches all queries to WISE and sends a feed to a configured elasticsearch cluster with firstSeen, lastSeen, and VERY rough count metric. The elasticsearch cluster must version version 1.5 or above and requires the hobi.groovy script be installed in the elasticsearch-x.x.x/config/scripts directory on all nodes. (This directory might need to be created.)

Added in 0.11.4

Create a `[hodi]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
esHost|REQUIRED|The elasticsearch connection string, usually host:port
{: .table .table-striped .table-sm .mb-4 }

### right-click
This source monitors configured files for right-click actions to send to all the viewer instances that connect to this WISE Server. Each file needs to have its own section, with the section name starting with `right-click:`. The format of the monitored files is the same as [WISE](settings#wise). It will auto reload the right click files if they change.

Create a `[right-click:UNIQUENAME]` section to configure
{: .mb-0}

Setting | Default | Description
--------|---------|------------
file|REQUIRED|The file to load
{: .table .table-striped .table-sm .mb-4 }

So for example you might have
{: .mb-0}

```
[right-click:virustotal]
file=/data/arkime/etc/rightclick-virustotal.ini
```

and then /data/arkime/etc/rightclick-virustotal.ini could contain
{: .mb-0}

```
VTIP=url:https://www.virustotal.com/en/ip-address/%TEXT%/information/;name:Virus Total IP;category:ip
VTHOST=url:https://www.virustotal.com/en/domain/%HOST%/information/;name:Virus Total Host;category:host
VTURL=url:https://www.virustotal.com/latest-scan/%URL%;name:Virus Total URL;category:url
```

Starting with Arkime 1.5, a section named `[right-click]` with NO colon or unique name, allows the right clicks to live in the wise.ini file, but require a wiseService restart to reload.

---

## What does WISE know?
WISE is http query-able so you can verify what it knows.

Type
{: .mb-0}

* ip
* email
* md5
* domain
* url

### Query Source
`/[sectionname]/[type]/[value]`

Query a particular source

### Query all Sources
`/[type]/[value]`

Query all sources

### Display all values for Source
`/dump/[sectionname]`

Display all elements for a particular source

---

## Known Issues
* When configured, if wiseService is down, arkime-capture will not start (current running are fine)

</div>

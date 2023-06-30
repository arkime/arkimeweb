---
title: Cont3xt
layout: wiki
permalink: "/cont3xt"
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

# Cont3xt
{: .no_toc}

Cont3xt centralizes and simplifies a structured approach to gathering contextual intelligence in support of technical investigations. It enriches indicators using popular commercial and OSINT sources in a structured, consistent, and thorough process. Some of the default enrichment integrations include PassiveTotal, VirusTotal, Censys, Shodan, and more. Simplify your analytic life!

Additionally, you can build custom links to any public/private web resource where the web application supports query string deep linking. This makes it easy to pivot investigations to other sources.

Cont3xt was first available in the Arkime 4.0 release.

## The Problem
* Do you hate popping loads of browser tabs into many different services to research technical indicators, like I used to do?
* Are you inconsistent with your use of available research tools, like I used to be?
* Do you wish you could easily pivot into other web accessible investigative resources, like I used to wish?

## Introducing Cont3xt

Cont3xt automates the task of gathering contextual intelligence from a handful of popular services. Cont3xt will auto enrich supported indicator types of IP, domain/hostname, URL, email address, hash or phone number.

Enter an indicator in the search bar. The search bar supports refanging input and identifies the indicator type. Search does not currently support bulk lookups, but will in the future.

You can add custom link to query your available resources that will simplify team access to frequently queried resources.

Share links with team mates that are tailored to specific views and link filters to guide the investigative process.

Export full reports, or subsets of response data.

<img src="assets/cont3xt-purple.org.png" height="800px" />

## Auto Enrichments:

We currently support a bunch of different services for auto enrichments, and are adding new ones all the time.

#### Domains/Hostnames:
1. Use of Cloudflare DNS over HTTPS to perform resolution of records types including A, AAAA, NS, MX, TXT, SPF/DMARC, CAA and SOA. Any explicit IP's resolved will have the IP iType enrichment performed.
2. Direct/Public Whois request. This can be valuable over other third party commercial services which will offer results, but may be cached or not current when dealing with freshly registered domains.
3. PassiveTotal Whois
4. PassiveTotal PDNS
5. PassiveTotal subdomains
6. BuiltWith
7. URLHaus
8. URLScan 'contains'
9. VirusTotal 'contains'
10. AlienVault OTX
11. Anomali ThreatStream search

#### IPs:
1. RDAP query identifying RIR, and link to detail.
2. SPUR.us
3. GreyNoise
4. Censys
5. AbuseIPDB
5. Shodan
6. PassiveTotal PDNS
7. BGPView
8. ThreatFox
9. URLHaus
10. URLScan
11. VirusTotal
12. AlienVault OTX
13. Anomali ThreatStream


#### Email:
1. Perform a direct connection SMTP sender receipt verification. This is the only heavy touch that cont3xt currently performs. You can disable this in integrations.
2. Anomali ThreatStream
3. Extract the base domain, and perform all relevant Domain enrichments.


#### Hashes:
1. MalwareBazaar
2. ThreatFox
3. VirusTotal
4. AlienVault OTX
5. Anomali ThreatStream

#### Phone Numbers (U.S only):
1. Twilio - identify carrier and caller name

---

## Installation

1. Configure OpenSearch/Elasticsearch, if only using for Cont3xt a small single node deployment is enough
2. <a href="/downloads">Download</a> Arkime 4.0 or later
3. Install the RPM/DEB file
4. Run `/opt/arkime/bin/Configure --cont3xt` to enable systemd file
5. If a NEW install, run `/opt/arkime/db/db.pl http://eshost:port init`
6. Edit /opt/arkime/etc/cont3xt.ini and update <code>elasticsearch</code> setting
7. If a NEW install, run `/opt/arkime/bin/arkime_add_user.sh admin admin PASSWORD --admin` to create an initial user
8. Run `systemctl restart arkimecont3xt`
9. If Cont3xt isn't working, look at `/opt/arkime/log/cont3xt.log`

### cont3xt.js

You'll need to run `cont3xt.js` from the `cont3xt` directory.

If not using anonymous mode, every user will need either the cont3xtUser or cont3xtAdmin role assigned to them.
The cont3xtAdmin role will allow the user to edit any link group.

### Settings

By default, settings live in a config.ini file.
There are two types of settings that you may need to change: Settings with the cont3xt service itself and settings with the integrations.
It is assumed that each user of Cont3xt will set up their own integration users/keys but it is possible to have global keys.

#### General
Create a `[cont3xt]` section
{: .mb-0}

Setting | Default | Description
--------|---------|------------
cacheTimeout | 1h | How long to cache results for integrations, can be overridden, can be overriden per intergration
cachePolicy | shared | Can be `shared` or `user`, if set to user then the cache is per user, can be overriden per intergration
port | 3218 | The port that the cont3xt service listens on
cont3xtHost | empty | What hostname to bind to
hstsHeader | false | Set the hsts header on requests to cont3xt
webBasePath | / | The base url for Cont3xt web requests. Must end with a / or bad things will happen.
certFile | empty | Public certificate to use for https, if not set then http will be used. keyFile must also be set.
keyFile | empty | Private certificate to use for https, if not set then http will be used. certFile must also be set.
userNameHeader | anonymous | Header to use for determining the username to check in the database for instead of using http digest. Set to <strong>digest</strong> to use http digest authentication.
httpRealm | Moloch | The Realm to use with digest authentication. Must match the setting from the Viewer as set in `config.ini`.
userAgent | cont3xt | The http user-agent header to use when talking to remote services
geoLite2ASN | | <a href="settings#geolite2asn">settings page</a>
geoLite2Country | | <a href="settings#geolite2country">settings page</a>
{: .table .table-striped .table-sm .mb-4 }

#### DB Settings
These also live in the `[cont3xt]` section.

{: .mb-0}

Setting | Default | Description
--------|---------|------------
dbUrl | empty | Either lmdb:DIRECTORY or an OpenSearch/Elasticsearch URL for storing cont3xt data.
elasticsearch | http://localhost:9200 | The OpenSearch/Elasticsearch URL to use, dbUrl overrides this setting
elasticsearchAPIKey | empty | See <a href="settings#elasticsearchAPIKey">settings page</a>
elasticsearchBasicAuth | empty | See <a href="settings#elasticsearchBasicAuth">settings page</a>
elasticsearchTimeout | 300 | See <a href="settings#elasticsearchtimeout">settings page</a>
esClientKey | empty | See <a href="settings#esclientkey">settings page</a>
esClientCert | empty | See <a href="settings#esclientcert">settings page</a>
esClientKeyPass | empty | See <a href="settings#esclientkeypass">settings page</a>
usersUrl | empty | Either lmdb:DIRECTORY or an OpenSearch/Elasticsearch URL for storing cont3xt users database. Can be the same that all Arkime tools use.
usersElasticsearch | empty | See <a href="settings#userselasticsearch">settings page</a>
usersPrefix | empty | See <a href="settings#usersprefix">settings page</a>
usersElasticsearchAPIKey | empty | See <a href="settings#usersElasticsearchAPIKey">settings page</a>
usersElasticsearchBasicAuth | empty | See <a href="settings#usersElasticsearchBasicAuth">settings page</a>
passwordSecret | password | See <a href="settings#passwordsecret">settings page</a>, make sure you use the same value for cont3xt and viewer if you want to share users across all applications.
{: .table .table-striped .table-sm .mb-4 }

#### Caching
Cont3xt can cache integration queries to speed up results and to lower the load on the integration services.

Create a `[cache]` section
{: .mb-0}

Setting | Default | Description
--------|---------|------------
type | memory | `memory`, `redis`, `memcached`, `lmdb` are supported. `lmdb` is recommend for a local disk cache and `redis` for a cached shared.
redisURL | empty | Format is `redis://[:password@]host:port/db-number, redis-sentinel://[[sentinelPassword]:[password]@]host[:port]/redis-name/db-number, or redis-cluster://[:password@]host:port/db-number`
memcachedURL | empty | Format is `memcached://[user:pass@]server1[:11211],[user:pass@]server2[:11211],...`
lmdbDir | empty | Path where to create the lmdb cache directory
cacheSize|100000|Maximum number of results to cache in memory, used for all but lmdb
cacheTimeout|24 hours| In seconds the MAX time to cache any item, used by redis/memcachd
{: .table .table-striped .table-sm .mb-4 }

#### Common settings per integration

Every integration can have its own settings with keys, passwords and other things.
Usually keys and passwords should be set per user in the UI, which will override these.

In each `[integrationname]` section
{: .mb-0}

Setting | Default | Description
--------|---------|------------
disabled | false | If set to true users can NOT use this integration
cacheTimeout | cont3xt.cacheTimeout | How long to cache results for this integration
cachePolicy | cont3xt.cachePolicy | Can be `shared` or `user`, if set to user then the cache is per user
{: .table .table-striped .table-sm .mb-4 }

## Sample Configs

Possible configurations for cont3xt

### Using OpenSearch/Elasticsearch
It is possible to setup cont3xt in the Arkime universe.

<pre>
[cont3xt]
# Where all the cont3xt data is stored
elasticsearch=https://ESHOST1:9200,https://ESHOST2:9200

# Where the user database is. This might be the same as above
usersElasticsearch=https://USERESHOST1:9200,https://USERESHOST2:9200

# If using SSO uncomment below with the http header with the username in it
#userNameHeader=moloch_user

# default cache timeout
cacheTimeout=1d

# Configure local disk cache
[cache]
type=lmdb
lmdbDir=/opt/arkime/cont3xt-cache

##### INTEGRATION SETTINGS

[Threatstream]
# For threatstream we don't share the cache, it is per user
cachePolicy=user
#host=threatstreamonprem.host

[VirusTotal]
# For VT lets increase the timeout
cacheTimeout=1w
</pre>

### Using standalone

It is possible to setup cont3xt in a standalone deployment without OpenSearch/Elasticsearch.
You will need to use the addUser script with the cont3xt.ini configuration file to add users.

<pre>
[cont3xt]
# Where all the cont3xt data is stored
dbUrl=lmdb:///opt/arkime/cont3xt-db

# Where the user database is. This should be different than above
usersUrl=lmdb:///opt/arkime/cont3xt-users

# If using SSO uncomment below with the http header with the username in it
#userNameHeader=moloch_user

# default cache timeout
cacheTimeout=1d

# Configure local disk cache
[cache]
type=lmdb
lmdbDir=/opt/arkime/cont3xt-cache

##### INTEGRATION SETTINGS

[Threatstream]
# For threatstream we don't share the cache, it is per user
cachePolicy=user
#host=threatstreamonprem.host

[VirusTotal]
# For VT lets increase the timeout
cacheTimeout=1w
</pre>

## Known Issues
* This document needs to be improved

</div>

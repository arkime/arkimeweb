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
## What is it
{: .no_toc}

----

Cont3xt centralizes and simplifies a structured approach to gathering contextual intelligence in support of technical investigations. It enriches indicators using popular commercial and OSINT sources in a structured, consistent, and thorough process. Some of the default enrichment integrations include PassiveTotal, VirusTotal, Censys, Shodan, and more. Simplify your analytic life!

Additionally, you can build custom links to any public/private web resource where the web application supports query string deep linking. This makes it easy to pivot investigations to other sources.

Cont3xt was first available in the Arkime 4.0 release.

---

## Installation

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
userAgent | cont3xt | The http user-agent header to use when talking to remote services
geoLite2ASN | | <a href="settings#geolite2asn">settings page</a>
geoLite2Country | | <a href="settings#geolite2country">settings page</a>
{: .table .table-striped .table-sm .mb-4 }

#### DB Settings
These also live in the `[cont3xt]` section.

{: .mb-0}

Setting | Default | Description
--------|---------|------------
dbUrl | empty | Either lmdb:DIRECTORY or an elasticsearch URL for storing cont3xt data.
elasticsearch | http://localhost:9200 | The elasticsearch URL to use, dbUrl overrides this setting
elasticsearchAPIKey | empty | See <a href="settings#elasticsearchAPIKey">settings page</a>
elasticsearchBasicAuth | empty | See <a href="settings#elasticsearchBasicAuth">settings page</a>
elasticsearchTimeout | 300 | See <a href="settings#elasticsearchtimeout">settings page</a>
esClientKey | empty | See <a href="settings#esclientkey">settings page</a>
esClientCert | empty | See <a href="settings#esclientcert">settings page</a>
esClientKeyPass | empty | See <a href="settings#esclientkeypass">settings page</a>
usersUrl | empty | Either lmdb:DIRECTORY or an elasticsearch URL for storing cont3xt users database. Can be the same that all Arkime tools use.
usersElasticsearch | empty | See <a href="settings#userselasticsearch">settings page</a>
usersPrefix | empty | See <a href="settings#usersprefix">settings page</a>
usersElasticsearchAPIKey | empty | See <a href="settings#usersElasticsearchAPIKey">settings page</a>
usersElasticsearchBasicAuth | empty | See <a href="settings#usersElasticsearchBasicAuth">settings page</a>
passwordSecret | password | See <a href="settings#passwordsecret">settings page</a>
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

### Using elasticsearch
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

It is possible to setup cont3xt in a standalone deployment without elasticsearch.
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

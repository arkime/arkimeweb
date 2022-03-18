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

Cont3xt provides context, and is part of the Arkime 4.0 release.

WORDS GO HERE.

---

## Installation

### cont3xt.js

You'll need to run cont3xt.js from the cont3xt directory.

### Settings

By default settings live in a config.ini file.
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
dbUrl |
certFile |
keyFile |
userNameHeader |
elasticsearch |
elasticsearchAPIKey |
elasticsearchBasicAuth |
elasticsearchTimeout |
esClientKey |
esClientCert |
esClientKeyPass |
usersUrl |
usersElasticsearch |
usersPrefix |
usersElasticsearchAPIKey |
usersElasticsearchBasicAuth |
userAgent | cont3xt | The http user-agent header to use when talking to remote services
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



### Common per integration settings

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

## Known Issues
* This document need to be improved before 4.0 release

</div>

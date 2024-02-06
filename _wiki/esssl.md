---
title: Elasticsearch SSL
layout: wiki
permalink: /esssl
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Elasticsearch SSL
{: .section-header.mt-1 }

Arkime supports connecting to Elasticsearch using TLS.  We've tested with both [search-guard](https://search-guard.com) and [elasticsearch](https://www.elastic.co/guide/en/elastic-stack-overview/current/ssl-tls.html), but these instructions should apply to other solutions.  You should still use iptables, there is someone on your network, you just don't know it :).

**Try this on a test cluster first!**


### Elasticsearch implementation
{: .subsection }

* First make sure you are using ES 6.8/7.1 or later for the free version
* We recommend you get the ES cluster and Arkime working before enabling TLS
* Create the certs required, we recommend creating a single wildcard cert
* Here is a sample config for your elasticsearch.yml
  * It assumes the private key is the file es.key with no password and public key es.cert
  * It turns off user authentication
  * It disables monitoring

```
xpack.monitoring.enabled: false
xpack.security.enabled: true
xpack.security.dls_fls.enabled: false

xpack.security.transport:
  ssl.enabled: true
  ssl.verification_mode: certificate
  ssl.key: es.key
  ssl.certificate: es.cert

xpack.security.http:
  ssl.enabled: true
  ssl.verification_mode: certificate
  ssl.key: es.key
  ssl.certificate: es.cert

xpack.security.authc:
  anonymous:
    username: anonymous
    roles: superuser
    authz_exception: true
```

* Do a full cluster restart
* Change your Arkime config.ini files for everything to use https
* See https://www.elastic.co/guide/en/elastic-stack-overview/current/ssl-tls.html for more information


### Searchguard implementation
{: .subsection }

* We recommend you get the ES cluster and Arkime working before enabling TLS
* Visit https://docs.search-guard.com/latest/search-guard-versions and select the proper ES version and search guard version
* Here is a sample config for your elasticsearch.yml
  * It assumes the private key is the file es.key with no password and public key es.cert
  * It turns off all search guard features except for tls, for example user authentication

```
searchguard.ssl_only: true
# NODE2NODE
searchguard.ssl.transport.enabled: true
searchguard.ssl.transport.pemkey_filepath: es.key
searchguard.ssl.transport.pemcert_filepath: es.cert
searchguard.ssl.transport.pemtrustedcas_filepath: es.cert

# HTTP
searchguard.ssl.http.enabled: true
searchguard.ssl.http.pemkey_filepath: es.key
searchguard.ssl.http.pemcert_filepath: es.cert
searchguard.ssl.http.pemtrustedcas_filepath: es.cert
```

* Do a full cluster restart
* Change your Arkime config.ini files for everything to use https


### Notes:
{: .subsection }

* Arkime 2.0 supports using client auth with Elasticsearch SSL.  You will need to set the the <a href="/settings#esclientkey">esClientKey</a> and <a href="/settings#esclientcert">esClientCert</a> settings.
* When using curl you may need to add the ```--tlsv1.1``` option on older machines
* On any host where db.pl runs you'll need to install the ```perl-Crypt-SSLeay``` and/or ```perl-LWP-Protocol-https``` packages depending on OS
* Currently Arkime doesn't support client auth. **You should still use iptables!**

</div>

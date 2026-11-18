---
title: OpenSearch/Elasticsearch TLS
layout: wiki
permalink: /esssl
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# OpenSearch/Elasticsearch TLS
{: .section-header.mt-1 }

Current versions of both OpenSearch and Elasticsearch turn on TLS and authentication when you install them, so usually there is nothing to enable.
Instead you need to tell Arkime how to log in and how to trust the cluster's certificate.
You should still use a firewall so only Arkime and the other cluster nodes can reach ports 9200 and 9300, there is someone on your network, you just don't know it :).

**Try any certificate change on a test cluster first!**

### Elasticsearch
{: .subsection }

* Since Elasticsearch 8.0 the deb/rpm packages generate certificates the first time Elasticsearch starts
  * The CA that signed the HTTP certificate is `/etc/elasticsearch/certs/http_ca.crt`, copy it to each Arkime machine
  * Set the `elastic` user's password with `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic -i`
* New nodes get certificates when they join with an enrollment token, see [Multiple Host](multihost)
* You can replace the generated certificates with ones from your own or a public CA, see the Elastic [secure cluster communications](https://www.elastic.co/docs/deploy-manage/security/secure-cluster-communications) docs
* You can use an [Elasticsearch API key](settings#elasticsearchAPIKey) instead of a user and password

### OpenSearch
{: .subsection }

* The deb/rpm packages install the security plugin with demo certificates when `OPENSEARCH_INITIAL_ADMIN_PASSWORD` is set, like the [install](install) examples
  * The demo CA is `/etc/opensearch/root-ca.pem`
  * Every install uses the same demo certificates, so replace them before going to production or adding nodes
* See the OpenSearch [TLS configuration](https://docs.opensearch.org/latest/security/configuration/tls/) docs for using your own certificates

### Configuring Arkime
{: .subsection }

* Use `https` URLs in the [elasticsearch](settings#elasticsearch) setting, the hostnames must match the names in the certificate
* Set [elasticsearchBasicAuth](settings#elasticsearchBasicAuth) or [elasticsearchAPIKey](settings#elasticsearchAPIKey)
* If the certificate isn't signed by a CA the operating system already trusts, set [caTrustFile](settings#caTrustFile) to the CA file. It replaces the operating system's CA list for those connections, it doesn't add to it.
* Since 7.0 Cont3xt and WISE use the same caTrustFile/esClientKey/esClientCert/esClientKeyPass settings for their OpenSearch/Elasticsearch connections

```
[default]
elasticsearch=https://es1.example.com:9200,https://es2.example.com:9200
elasticsearchBasicAuth=arkime:PASSWORD
caTrustFile=/opt/arkime/etc/es-ca.pem
```

You can check the CA, hostname and password with curl before starting Arkime:

```
curl --cacert /opt/arkime/etc/es-ca.pem --user arkime https://es1.example.com:9200/_cat/health
```

### db.pl
{: .subsection }

* db.pl is written in perl and needs LWP::Protocol::https, which is the `liblwp-protocol-https-perl` package on Debian/Ubuntu and `perl-LWP-Protocol-https` on EL based systems
* db.pl doesn't read config.ini, so use `--esuser user:password` or `--esapikey key`, or set the `ARKIME__elasticsearchBasicAuth` or `ARKIME__elasticsearchAPIKey` environment variables
* db.pl doesn't use caTrustFile, either add the CA to the operating system's trust store or point perl at it with the `PERL_LWP_SSL_CA_FILE` environment variable
* db.pl skips certificate verification when connecting to `localhost` or `127.0.0.1`

```
PERL_LWP_SSL_CA_FILE=/opt/arkime/etc/es-ca.pem /opt/arkime/db/db.pl --esuser arkime https://es1.example.com:9200 info
```

### Client certificates
{: .subsection }

* Arkime supports TLS client authentication with OpenSearch/Elasticsearch, set the [esClientKey](settings#esclientkey) and [esClientCert](settings#esclientcert) settings, plus [esClientKeyPass](settings#esclientkeypass) if the key has a password
* db.pl uses the `--clientcert` and `--clientkey` options, the key must not have a passphrase
* Cont3xt integrations and WISE sources that call a URL take per section <a href="/settings#cont3xt-integration-common">clientKey/clientCert/caTrustFile</a> settings for other servers that require client certificates

### Self-signed certificates
{: .subsection }

We recommend real certificates, see the FAQ on [self-signed or private CA certificates](faq#self-signed-ssl-tls-certificates).
For testing, capture, viewer and db.pl accept `--insecure` to turn off certificate checks, but don't leave it on.

</div>

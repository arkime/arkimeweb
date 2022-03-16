---
title: ES Proxy
layout: wiki
permalink: "/esproxy"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# ES Proxy

---

The Elasticsearch Proxy is a security oriented proxy that remote capture/viewer nodes can use instead of a real ES server to limit ES APIs used.
The proxy checks the node name, (optionally) password, and source IP for every request that is made.
The proxy only allows API calls that a remote capture/viewer node would need to make.

An ES proxy should be used in cases where capture/viewer nodes live on machines that are outside your control or can be accessed by many people.
The ES proxy ensures that anyone who can access a machine can only access data for that machine.
ES by itself does NOT have this fine grain API access controls.

The ES proxy also has a secondary feature where it can send traffic to a secondary ES cluster. This is useful when migrating to a new cluster.

<div class="alert alert-info">
Note: You MUST be using central viewers that the operators use, and those central viewers MUST NOT talk to the ES proxy.
</div>

---

### Example
Let's say you have a node in Toronto and a node in Singapore, and a bad actor gets access to the Toronto machine.
If there is no ES proxy set up, the bad actor could make API calls from the Toronto machine to return Singapore sessions.
But if the Toronto machine can only talk to an ES Proxy, they would not be able to do ANY session searches or ANY actions that only a central viewer should do.
The bad actor would only be able to access data about Toronto sessions, NOT Singapore sessions.

In the following configuration example we will use the node names `toronto01` and `singapore01`.

There are 2 required sections in the esproxy.ini file, `[default]` and `[esproxy-sensors]`:

#### [default] section

The [default] section has the general configuration for esProxy and shard these settings with viewer:
<a href="settings#elasticsearch">elasticsearch</a>
<a href="settings#esclientkey">esClientKey</a>
<a href="settings#esclientcert">esClientCert</a>
<a href="settings#esclientkey">esClientKey</a>
<a href="settings#esclientkeypass">esClientKeyPass</a>
<a href="settings#elasticsearchAPIKey">elasticsearchAPIKey</a>
<a href="settings#elasticsearchBasicAuth">elasticsearchBasicAuth</a>

<pre>
[default]
# The ES server to proxy requests for.
# Make sure the capture/viewer nodes can NOT access ES directly.
elasticsearch=https://the.real.es.server:9999
# What port we listen to for connections from the capture/viewer nodes
esProxyPort=9999
# If set, our cert and key, setting these enables https for the proxy
#certFile=/path/tls.cert.pem
#keyFile=/path/tls.key.pem
</pre>

#### [esproxy-sensors] section

The [esproxy-sensors] section has a line for each sensor, with a list of semicolon seperated parameters.
The key for the line should be the nodename of the sensor, and it will be the username used in `config.ini` for the remote capture/viewer elasticsearch configuration.

<pre>
[esproxy-sensors]
THE_NODE=pass:THE_PASSWORD;ip:THE_IP
toronto01=pass:torontorules;ip:10.10.10.10
singapore01=ip:10.11.11.11
</pre>

In the Toronto `config.ini` you would use <code>elasticsearch=http://toronto01:torontorules@the.esproxyhost:9999</code>.
In the Singapore `config.ini` you would use <code>elasticsearch=http://singapore01:@the.esproxyhost:9999</code> (notice it does not have a password).
For both of these the source IP address would be checked, so that another machine couldn't pretend it was toronto01 even if it had the user/password.
<div class="alert alert-info">
Note: this user/pass is NOT your ES user pass, this is from capture/viewer to esproxy.
The user MUST be the nodename of the capture/viewer process since it will be used to limit data.
There should be a unique line for each remote capture/viewer machine.
Esproxy to ES will use the elasticsearch url in the <code>[default]</code> section, which may or may not include the real elasticsearch user/pass.
</div>

#### [tee] section

Since 3.4.0 the ES Proxy allows you to send a copy of all elasticsearch items to another cluster.
This is extremely useful when you are trying to bring up a new cluster and want to write to 2 ES clusters but still read from the old ES cluster.
The tee section supports the following settings:
<a href="settings#elasticsearch">elasticsearch</a>
<a href="settings#elasticsearchAPIKey">elasticsearchAPIKey</a>
<a href="settings#elasticsearchBasicAuth">elasticsearchBasicAuth</a>
the real elasticsearch
So for example with the following example configuration any incoming requests, like a bulk insert or update will be sent to both oldes and newes, however the results from newes will be ignored. Only the results from the oldes will be sent back to viewer.
<pre>
[default]
elasticsearch=http://oldes:9200
[tee]
elasticsearch=http://newes:9200
</pre>

</div>

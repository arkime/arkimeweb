---
title: ES Proxy
layout: wiki
permalink: "/esproxy"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# ES Proxy

---

The Elasticsearch Proxy is a security oriented proxy that sensor capture/viewer nodes can use instead of a real ES server to limit ES APIs used.
The proxy checks the node name, (optionally) password, and source IP for every connection that is made.
The proxy only allows API calls that a sensor capture/viewer node would need to make.

An ES proxy should be used in cases where capture/viewer nodes live on machines that are outside your control or can be accessed by many people.
The ES proxy ensures that anyone who can access a machine can only access data for that machine.
ES by itself does NOT have this fine grain API access controls.

<div class="alert alert-info">
Note: You MUST be using central viewers that the operators use, and those central viewers MUST NOT talk to the ES proxy.
</div>

---

### Example
Let's say you have a node in Toronto and a node in Singapore, and a bad actor gets access to the Toronto machine.
If there is no ES proxy set up, the bad actor could make API calls from the Toronto machine to return Singapore sessions.
But if the Toronto machine can only talk to an ES Proxy, they would not be able to do ANY session searches or ANY actions that only a central viewer should do. The bad actor would only be able to access data about Toronto sessions, NOT Singapore sessions.

In the following configuration example we will use the node names `toronto01` and `singapore01`.

There are 2 sections in the esproxy.ini file, `[default]` and `[esproxy-sensors]`:

#### [default]

The [default] section has the general configuration for esProxy

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

#### [esproxy-sensors]

The [esproxy-sensors] section has a line for each sensor, with a list of semicolon seperated parameters.
The key for the line should be the nodename of the sensor, and it will be the username used in `config.ini` for capture/viewer.

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
Note: this user/pass is NOT your ES user pass, this is from capture/viewer to esproxy. The user should be the nodename of the capture/viewer process since it will be used to limit data.
Esproxy to ES will use the elasticsearch url in the <code>[default]</code> section, which may or may not include a user/pass.
</div>
</div>

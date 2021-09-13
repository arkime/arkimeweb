---
title: ES Proxy 
layout: wiki
permalink: "/esproxy"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# ES Proxy

A security oriented ES proxy that sensor capture/viewer nodes can use instead of a real ES server to limit ES APIs used.
The proxy will check a user name and optionally a password, source ip, or both for every connection that is made.
The proxy will only allows calls thru that a sensor only capture/viewer node would need to make.
You MUST be using central viewers that the operators hit directly, and those central viewers MUST NOT talk to the ES proxy.

We realized that in some cases capture/viewer nodes may live on machines that either live on machines outside your control or machines that can be accessed by many folks.
We wanted to make sure that anyone who can access a machine can only access data for that machine.
For example lets say you have a machine in Toronto and a machine in Singapore and a bad actor gets access to the Toronto machine.
If that machine is talking to a ES Proxy the goal is they would not be able to do ANY session searches, ANY actions that only a central viewer should do, and would only be able to access data about Toronto sessions, NOT Singapore sessions

ES by itself does NOT have this fine grain access controls around API usage.

## Settings

There are 2 sections in the esproxy.ini file 

### [default]

The [default] section has the general configuration for esProxy

Sample:
<pre>
[default]
# The ES server to proxy requess for
elasticsearch=https://the.real.es.server:9999
# What port we listen to
esProxyPort=9999
# If set our cert and key, setting these enables https for the proxy
#certFile=/path/tls.cert.pem
#keyFile=/path/tls.key.pem
</pre>

### [esproxy-sensors]

The [esproxy-sensors] section has a line for each sensor, with a list of semicolon seperated parameters.
The key for the line will be the username used in config.ini for capture/viewer.

Sample:
<pre>
[esproxy-sensors]
THE_KEY=pass:THE_PASSWORD;ip:THE_IP
toronto=pass:torontorules;ip:10.10.10.10
singapore=ip:10.11.11.11
</pre>

With the above, in the toronoto config.ini you would use <code>elasticsearch=http://toronto:torontorules@the.esproxyhost:9999</code> while the singapore one doesn't have a password so it would be <code>elasticsearch=http://singapore:@the.esproxyhost:9999</code>.
For both of these the source ip address would be checked, so that another machine couldn't pretend it was toronto even if it had the user/password.
Note, this user/pass is NOT your ES user pass, this is from capture/viewer => esproxy. From esProxy => ES will use the elasticsearch url in the [default] section, which may or may not include a user/pass.
</div>

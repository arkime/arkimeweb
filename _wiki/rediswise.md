---
title: Rediswise
layout: wiki
permalink: "/rediswise"
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

# WISE - With Intelligence See Everything
{: .no_toc.section-header.mt-1 }

Capture can query basically any supported Arkime fields from Wise. WISE can query Redis source and enrich Arkime with results. Logstash/other log shippers can ship different logs to Redis. This means that, given a proper "key", we can enrich Arkime sessions with pretty much any kind of logs. It is likely that using Kafka for doing it would be better, but Arkime Kafka output is not very well supported. Also, this method seems to work reasonably well and is simple to configure.

Sample configuration uses logstash, but other log shippers should work as well. It is possible that Redis can be replaced with Memcached (Memcached could be better), but I had Redis already installed and if you have a hammer, all screws look like nails.

Do note that this requires Arkime/Moloch version 3.4.x+, as previously Redis source in Wise was broken.

## Configuration
{: .subsection-header }

### Logstash
{: .subsection }

Logstash configuration is rather simple, we just add a redis output and tell it to use "keyfield" (currently community_id) as redis key. The example conf also checks if the log actually has "keyfield" set, which is a good idea, because otherwise logstash would simply output events that don't have the field set to key "%{community_id}". You can use https://github.com/Cyb3rWard0g/HELK/blob/master/docker/helk-logstash/pipeline/8911-fingerprints-network_community_id-filter.conf to calculate network community ids for logs that do not have it by default (that means most network logs :) ).

```
output {

  if [community_id] {
    redis {
      host => ["redishost"]
      port => "6379"
      password => "AwesomePassw0rd"
      data_type => "list"
      key => "%{community_id}"
      db => 0
    }
}

```

### Capture
{: .subsection }

Capture configuration is very simple, we must tell capture to use Wise and query the field that should match the values in Wise for the "keyfield".

```
#plugins setting must contain wise.so
plugins=wise.so
#it is also clever to tell the viewer to use the wise plugin, so you could have a better overview in sessions
viewerPlugins=wise.js
#Wise host should be set to the server that is hosting your Wise service
#wiseHost=127.0.0.1


#this section has to contain the extra fields that we want to query from wise
[wise-types]
communityid=communityId
```

### Redis
{: .subsection }

As some logs might not get hits, Redis should be configured to automatically remove older data.

```
#some arbitary memory count limit, should be enough to contain at least 20 min of source logs
maxmemory 8gb
#evict least recently used keys
maxmemory-policy allkeys-lru
#all save lines should be commented out, our data is expected to be short lived and snapshotting it is not necessary
```

### WISE
{: .subsection }

Wise should get an extra source, as follows. For the sake of simplicity this is using ECS compatible Sysmon event code 3 logs, but any other logs that have the correct key may work as well.

```
[redis:sysmon]
url=redis://:AwesomePassw0rd@redishost:6379/0
redisURL=redis://:AwesomePassw0rd@redishost:6379/0
tags=wiseredistest
type=communityid
format=json
#column=network
#for community id the template has to be as follows
template=1:%key%
##keypath has to be set to the json object value that contains the "keyfield value"
keyPath=network.community_id
fields=field:sysmon.processname;db:sysmon.processname;kind:termfield;friendly:Process Name;shortcut:process.name\nfield:sysmon.username;db:sysmon.username;kind:termfield;friendly:User;shortcut:user.name\nfield:sysmon.hostname;db:sysmon.hostname;kind:termfield;friendly:Host Name;shortcut:host.name
redisMethod=lpop
view=if (session.sysmon)\n  div.sessionDetailMeta.bold SYSMON\n  dl.sessionDetailMeta\n    +arrayList(session.sysmon, 'processname', 'Process Name', 'sysmon.processname')\n    +arrayList(session.sysmon, 'username', 'User', 'sysmon.username')\n    +arrayList(session.sysmon, 'hostname', 'Host Name', 'sysmon.hostname')
```

### Starting it all up
{: .subsection }

1. Start redis server
2. Start wise server
3. Start logstash
4. Start capture&viewer
5. Wait ~3-4 min
6. Run query "sysmon.username==EXISTS!" in viewer. It should give some matches, if you open the session you should see new Sysmon fields.

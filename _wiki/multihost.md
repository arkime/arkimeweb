---
title: Multiple Host
layout: wiki
permalink: /multihost
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Multiple Host

---

Going from a single host to a multiple host deployment isn't too difficult. Basically, you just install the Arkime deb/rpm on each machine and point to the same OpenSearch/Elasticsearch cluster. The biggest issues include opening up OpenSearch/Elasticsearch to more than just localhost and getting the OpenSearch/Elasticsearch configuration right.

**Note:** these instructions assume you've installed from the prebuilt deb/rpm and everything is in `/data/arkime`.

---

### Expanding OpenSearch/Elasticsearch

If you are using the demo install and you plan on having a large Arkime cluster, you should move OpenSearch/Elasticsearch to multiple machines. We no longer provide detailed instructions since OpenSearch/Elasticsearch now has lots of good tutorials. If running on dedicated machines give up to 1/2 of physical memory (up to 30G) for OpenSearch/Elasticsearch. You can read more about [how many nodes](faq#how-many-elasticsearch-nodes-or-machines-do-i-need) in the [FAQ](faq).

##### At a high level you will want to
{: .mb-0 }

  * Change your current cluster from listening on 127.0.0.1 (localhost) to 0.0.0.0
  * Add more OpenSearch/Elasticsearch nodes to the cluster
  * Mark the old demo node as ignore
  * Wait for all the shards to move to new nodes
  * Shutdown the old demo node.
  * Setup iptables on the OpenSearch/Elasticsearch machines, since by default there is NO protection.

**Note:** make sure you set `gateway.recover_after_nodes` and `gateway.expected_nodes` to the total number of DATA nodes.

---

### Capture/Viewer nodes

Adding multiple capture nodes is easy! Just install the prebuilt deb/rpm package on each machine. It is best to use a system like ansible or chef so you can use the same config.ini file every where and push out to each of the sensors. As long as all the capture and viewer nodes talk to the same OpenSearch/Elasticsearch cluster they will show up in the same UI.

If you set up multiple OpenSearch/Elasticsearch clusters for multiple Arkime clusters you can merge the results by using a multiviewer.

</div>

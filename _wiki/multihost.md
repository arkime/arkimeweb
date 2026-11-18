---
title: Multiple Host
layout: wiki
permalink: /multihost
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Multiple Host
{: .section-header.mt-1 }

Going from a single host to a multiple host deployment isn't too difficult. You install the Arkime package on each machine and point them all at the same OpenSearch/Elasticsearch cluster. The biggest issues are opening up OpenSearch/Elasticsearch to more than just localhost and getting its cluster configuration right.

**Note:** these instructions assume you've installed from the prebuilt deb/rpm and everything is in `/opt/arkime`. See the [architecture](architecture) page for example designs.

### Expanding OpenSearch/Elasticsearch
{: .subsection }

If you started with the [single machine install](install) and you plan on having a large Arkime cluster, you should move OpenSearch/Elasticsearch to dedicated machines. We don't provide detailed instructions since both projects document this well, see the [OpenSearch cluster](https://docs.opensearch.org/latest/tuning-your-cluster/) and [Elasticsearch add nodes](https://www.elastic.co/docs/deploy-manage/maintenance/add-and-remove-elasticsearch-nodes) docs. On dedicated machines give OpenSearch/Elasticsearch up to half of physical memory, but no more than about 30GB of heap. You can read more about [how many nodes](faq#how-many-elasticsearch-nodes-or-machines-do-i-need) in the [FAQ](faq).

##### At a high level you will want to

  * Make the current node listen on an address the other machines can reach, instead of only 127.0.0.1 (localhost). Both the HTTP port (9200) and the transport port (9300) need to be reachable.
  * Remove `discovery.type: single-node` if you set it, and set `discovery.seed_hosts` on every node
  * Add more OpenSearch/Elasticsearch nodes to the cluster
    * Elasticsearch deb/rpm installs can join with an enrollment token: run `elasticsearch-create-enrollment-token -s node` on an existing node, then `elasticsearch-reconfigure-node --enrollment-token <token>` on the new node before starting it
    * OpenSearch nodes all need certificates from the same CA; don't use the demo certificates on a multiple node cluster
  * Move the data off the old single node by excluding it, for example `cluster.routing.allocation.exclude._name: <old node name>`
  * Wait for all the shards to move to the new nodes
  * Shut down the old node
  * Use a firewall so only Arkime and the other cluster nodes can reach ports 9200 and 9300. Security is on by default in current versions, but it is still a good idea.

### Capture/Viewer nodes
{: .subsection }

Adding multiple capture nodes is easy! Install the prebuilt package on each machine. It is best to use a system like Ansible or Chef so you can push the same config.ini file to every sensor. Set [elasticsearch](settings#elasticsearch) to a comma separated list of your OpenSearch/Elasticsearch nodes. Only run `db.pl init` once for the whole cluster, not on each new sensor.

Run viewer on each capture node as well, since that is how other viewers retrieve the PCAP stored on that node. As long as all the capture and viewer nodes talk to the same OpenSearch/Elasticsearch cluster, they will show up in the same UI.

If you set up multiple OpenSearch/Elasticsearch clusters for multiple Arkime clusters you can search them together with a [multiviewer](faq#how-do-i-search-multiple-arkime-clusters), and monitor them all with [Parliament](parliament).

</div>

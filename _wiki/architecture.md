---
title: Arkime Architecture
layout: wiki
permalink: /architecture
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Arkime Architecture
{: .section-header.mt-1 }


Here are some sample deployments of Arkime for different network architectures. Most folks will probably run a hybrid of the following since no one solution fits all. The ability to scale capturing can be done horizontally by adding more capture machines, vertically by adding more cpus/disk, or both. We usually recommend scaling horizontally unless physically space constrained, and using a network packet broker in front of multiple machines. However it is possible to use big machines, with lots of cpu/disk, and run arkime-capture with more threads. There is a [companion video](https://youtu.be/ZFd7TYRurms) for this page.

#### Legend/Info:

* A box represents a physical machine.
* It is possible to run multiple capture processes per machine, or have a single capture process listen to multiple interfaces - ([FAQ Answer](faq#what-kind-of-packet-capture-speeds-can-arkime-capture-handle))
* Recommend "Big Data" style boxes for capture - ([FAQ Answer](faq#what-kind-of-capture-machines-should-we-buy))
* Run multiple OpenSearch/Elasticsearch processes per machine since each ES node should be configured at most to 30G - ([FAQ Answer](faq#how-many-elasticsearch-nodes-or-machines-do-i-need))
* Except for single host deployments, it is recommended/useful that all operator access flows through a central viewer with potentially a reverse proxy that can provide enterprise level authentication, logging, and a single choke point - ([FAQ Answer](faq#how-do-i-proxy-arkime-using-apache))

#### Security

* All ES instances should have iptables for port 9200-920N and 9300-930N, where N is the number of ES instances per machine, and only allow the other OpenSearch/Elasticsearch, capture and viewer machines to connect
* All viewer hosts, except the central viewer box, should have iptables for port 8005 and only allow other viewer machines to connect. The viewer must listen on OS interface if using multiple machines
* The shared viewer instances can listen on localhost since only reverse proxy talks to it

## Single Host
{: .subsection-header }

![Single Host](/assets/SingleHostArkime.gif)

A single host deployment should usually only be used for demos and extremely low traffic networks. The read/write patterns of Arkime vs OpenSearch/Elasticsearch will tax most systems using spinning disks and is not recommended.

## Multiple Hosts Monitoring Multiple Network Segments
{: .subsection-header }

![Multi Host Arkime](/assets/MultiHostArkime.gif)

### Multiple Hosts Monitoring High Traffic Networks
{: .subsection-header }

![High Traffic Arkime](/assets/HighTrafficArkime.gif)

### Notes:
{: .subsection }

* Using a Network Packet Broker (NPB) allows traffic to be load balanced and recombined. This is especially useful in HA or asymmetric routing cases
* By using a NPB, other security devices can see the same traffic arkime sees
* When running multiple arkime-captures on the same host make sure the IO doesn't over whelm the disk and other subsystems.
* Use a TAP with high traffic networks since many mirror ports drop traffic under heavy load
* Operators use an apache fronted viewer (central viewer) and don't hit the other viewers directly. The apache provides authentication.
* Lock down ES and arkime viewer with iptables

## Multiple Clusters
{: .subsection-header }

![Multi Cluster Arkime](/assets/MultiClusterArkime.gif)

#### Notes:
{: .subsection }

* It is possible to use a single ES cluster using the prefix= ini configuration
* Operator uses apache fronted viewers (central viewers) and doesn't hit the other viewers directly. The apache provides authentication. Can use virtual paths to route to different clusters.
* NPBs are recommended for high traffic networks

## Remote Device capture
{: .subsection-header }

In some cases, it’s not practical or possible to physical co-locate a capture server near a device we want to instrument. If the device is reachable via ssh, we can use ssh to login to the remote device, initiate a capture and stream the raw pcap data back to a arkime server. This streaming pcap data is written into a UNIX pipe.  One starts a arkime capture process using the pipe as the capture interface, resulting in real-time capture instrumentation of a remote device.

### Diagram with Steps to implement:
{: .subsection }

![RemoteCaptureArch](/assets/RemoteCaptureArch.gif)

Steps:
1. Create named pipe on the local capture machine, you can name whatever you want: <br><code>mkfifo /tmp/10.1.2.3-ens3</code>
1. Start capture on on the local capture machine: <br><code>/opt/arkime/bin/capture --copy -r /tmp/10.1.2.3-ens3</code>
1. Use ssh to copy the data from remote to localhost machine, exclude capturing the traffic we are sending over ssh: <br><code>ssh user@10.1.2.3 sudo /usr/sbin/tcpdump -s0 -i ens3 -w - not host 192.168.10.5 > /tmp/10.1.2.3-ens3</code><br>(The sudo and full path to tcpdump might not be required, remember to update the ips.)

This is NOT the recommended way to use Arkime.
{: .alert.alert-warning }


</div>

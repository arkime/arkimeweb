---
title: Other FPC Systems
description: "How Arkime compares to other full packet capture and network security monitoring systems."
layout: wiki
permalink: "/otherfpc"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Other FPC Systems
{: .section-header.mt-1.mb-3 }

#### Here are some other full packet capture systems that might be useful to compare against Arkime

**Basic Indexing** means you can find packets by time, IP and port without scanning every PCAP file.
**Protocol Indexing** means you can also search on application data, such as hostnames, URLs or certificates.
Several of these are platforms or appliances that do much more than packet capture; this table only compares their packet capture.
Links were last checked in November 2026, please [let us know](https://github.com/arkime/arkimeweb/issues) about any that have changed.

Name | Type | Basic Indexing | Protocol Indexing | UI | Notes
-----|------|----------------|-------------------|----|------
[Corelight Smart PCAP](https://corelight.com/platform/smart-pcap) | commercial | yes | yes | yes | Keeps packets for selected connections and links them to Zeek logs
[Corvil Capture](https://www.pico.net/products/corvil-analytics/network-capture/) | commercial | yes | yes | yes | Now part of Pico Corvil Analytics, hardware time-stamping
[dumpcap](https://www.wireshark.org/docs/man-pages/dumpcap.html) | opensource | no | no | no | Ring buffer capture that ships with Wireshark
[EndaceProbe](https://www.endace.com/endaceprobe) | commercial | yes | ? | yes | Appliances, hardware time-stamping
[ExtraHop RevealX](https://www.extrahop.com/platform) | commercial | yes | yes | yes |
[FMADIO](https://www.fmad.io/products) | commercial | yes | ? | yes | Appliances
[Malcolm](https://github.com/cisagov/Malcolm) | opensource | yes | yes | yes | Bundles Arkime with Zeek, Suricata and OpenSearch Dashboards
[n2disk](https://www.ntop.org/products/traffic-recording/n2disk/) | commercial | yes | ? | yes | Search and extraction through ntopng
[netsniff-ng](https://github.com/netsniff-ng/netsniff-ng) | opensource | no | no | no |
[NetWitness Network](https://www.netwitness.com/) | commercial | yes | yes | yes |
[NIKSUN NetDetector](https://www.niksun.com/products.html) | commercial | yes | yes | yes |
[Observer GigaStor](https://www.viavisolutions.com/en-us/enterprise/products/observer-gigastor) | commercial | yes | ? | yes |
[PcapDB](https://github.com/dirtbags/pcapdb) | opensource | yes | no | yes | No commits since 2023
[Security Onion](https://securityonionsolutions.com/software/) | opensource | ? | yes | yes | Suricata writes the PCAP (Stenographer before 3.0), Zeek and Suricata logs are searchable
[SolarCapture](https://github.com/Xilinx-CNS/solarcapture) | opensource | no | no | no | Needs AMD Solarflare NICs, hardware time-stamping
[Stenographer](https://github.com/google/stenographer) | opensource | yes | no | no | No longer maintained, the repository is archived
[tcpdump](https://www.tcpdump.org) | opensource | no | no | no |
{: .table .table-striped .table-sm .mb-4 }

</div>

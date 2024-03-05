---
title: WISE
layout: wiki
permalink: "/wise"
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

WISE is a framework for integrating data feeds into Arkime. The data feeds can be sourced from local files, remote URLs, or commercial services such as OpenDNS, Emerging Threats Pro, and others. The data feeds can set almost any Arkime field or even create new Arkime fields. Think of WISE as the next and better version of the tagger plugin.

WISE requires a plugin be installed on each arkime-capture instance, another plugin for each viewer instance and that a wiseService process be running. The wiseService process can be shared by multiple arkime-capture servers, even if they are in different arkime clusters. Choosing the machine that the wiseService runs on is important and the networking setup is crucial. The arkime-capture process connects to the wiseService AND the wiseService will need to reach out to any commercial services (if configured). All lookups are double cached, first in the wiseService so the remote service isn't queried too often and then in the arkime-capture process for load reduction. Maximum cache times and number of items are configurable.

WISE was first available with Arkime 0.11.3

## Installation
{: .subsection-header }

The wiseService is the proxy and aggregator between arkime-capture and the various data sources. All the arkime-capture processes need to be able to reach it. If using external or commercial services then wiseService also needs to be able to reach those services. So pay attention to the networks available and machine setup.

* Pick a host on the correct networks and install Arkime, wiseService lives in `/opt/arkime/wiseService`
* Initial install can be done with `/opt/arkime/bin/Configure --wise`.

You'll want to visit the [settings page](settings#wiseService).

### Caching
{: .subsection }

WISE uses multiple caches to speed up queries.

The wise.so plugin caches all results returned by wiseService, documented [here](/settings#wise).
This cache will have all recent results, no matter the wise data source, so that the capture process doesn't need to communicate with wiseService for reoccurring traffic.

The wiseService also caches all results returned by external sources, documented [here](/settings#caching-wise)

## WISE UI
{: .subsection-header }

There is a WISE User Interface to view/edit/delete your WISE Sources and to update your WISE configuration and cache. It also allows a user to query and view statistics about your configured WISE Sources.

To build and run the WISE UI, check out our [README](https://github.com/arkime/arkime/blob/main/wiseService/README.md).

## WISE Configuration Gallery
{: .subsection-header }

View the [WISE Config Gallery](wise-configs) to browse for ideas or contribute your own!

## What does WISE know?
{: .subsection-header }

WISE is http query-able so you can verify what it knows.

Type

* ip
* email
* md5
* domain
* url

### Query Source
{: .subsection }

`/[sectionname]/[type]/[value]`

Query a particular source

### Query all Sources
{: .subsection }

`/[type]/[value]`

Query all sources

### Display all values for Source
{: .subsection }

`/dump/[sectionname]`

Display all elements for a particular source

## Known Issues
{: .subsection-header }

* When configured, if wiseService is down, arkime-capture will not start (current running are fine)

</div>

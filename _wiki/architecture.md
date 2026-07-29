---
title: Arkime Architecture
layout: wiki
permalink: /architecture
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3 arch-scope" markdown="1">

# Arkime Architecture
{: .section-header.mt-1 }

Here are some sample deployments of Arkime for different network architectures. Most folks will probably run a hybrid of the following since no one solution fits all. The ability to scale capturing can be done horizontally by adding more capture machines, vertically by adding more cpus/disk, or both. We usually recommend scaling horizontally unless physically space constrained, and using a network packet broker in front of multiple machines. However it is possible to use big machines, with lots of cpu/disk, and run arkime-capture with more threads. There is a [companion video](https://youtu.be/ZFd7TYRurms) for this page.

<style>
.arch-scope {
  --box:#ffffff; --box-stroke:#cbd6e2;
  --machine-bg:#f5f9fd; --machine-stroke:#b6c8dc;
  --ink:#1d2b3a; --muted:#5b6b7b; --grid:#e7f0f8;
  --blue:#0084e4; --blue-d:#004C83; --green:#66B689; --green-d:#228C50;
  --orange:#F29A2E; --magenta:#B50054; --flow:#7c8d9d;
}
.dark-theme .arch-scope {
  --box:#2b3138; --box-stroke:#49525d;
  --machine-bg:#1b2026; --machine-stroke:#3b444f;
  --ink:#e9eef3; --muted:#a4b4c4; --grid:#1f2b36;
  --flow:#9fb0c0;
}
.arch-fig { margin:2rem auto; text-align:center; }
.arch-fig svg { width:100%; height:auto; display:block; margin:0 auto; }
.arch-fig figcaption { color:var(--muted); font-size:.85rem; margin-top:.35rem; }
.arch-scope hr.arch-rule { border:0; border-top:2px solid var(--ink); opacity:.7; margin:2.75rem 0 1.25rem; }
.arch-scope svg text { font-family:inherit; text-anchor:middle; dominant-baseline:central; fill:var(--ink); }

.arch-scope .machine { fill:var(--machine-bg); stroke:var(--machine-stroke); stroke-width:1.5; }
.arch-scope .m-accent { stroke:var(--blue); stroke-width:2.5; stroke-linecap:round; }
.arch-scope .m-title { font-size:12px; font-weight:700; fill:var(--muted); letter-spacing:.02em; }
.arch-scope .m-sub { font-size:10px; fill:var(--muted); }

/* NOTE: symbol-internal selectors are intentionally un-scoped (no .arch-scope
   prefix) because the descendant combinator does not pierce the <use> shadow
   tree. CSS custom properties still inherit across that boundary, so the theme
   colors below resolve correctly. Class names verified unused elsewhere. */
.chip { stroke-width:1.5; }
.chip-cap  { fill:rgba(242,154,46,.15); stroke:var(--orange); }
.chip-view { fill:rgba(0,132,228,.15); stroke:var(--blue); }
.chip-wise { fill:rgba(102,182,137,.20); stroke:var(--green-d); }
.chip-tap  { fill:rgba(0,76,131,.10); stroke:var(--blue-d); }
.chip-npb  { fill:rgba(0,76,131,.15); stroke:var(--blue-d); }
.chip-proxy{ fill:rgba(48,48,48,.08); stroke:var(--muted); }
.chip-t { font-size:13px; font-weight:600; fill:var(--ink); text-anchor:middle; dominant-baseline:central; }
.chip-ic-cap  * { stroke:var(--orange); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.chip-ic-view path { stroke:var(--blue); fill:none; stroke-width:1.8; }
.chip-ic-view circle { fill:var(--blue); stroke:none; }
.chip-ic-wise * { stroke:var(--green-d); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

.cyl-body, .cyl-top { fill:var(--box); stroke:var(--box-stroke); stroke-width:1.4; }
.cyl-pcap .cyl-top { fill:rgba(0,132,228,.18); }
.cyl-es .cyl-top { fill:rgba(102,182,137,.28); }
.cyl-t { font-size:10.5px; font-weight:700; fill:var(--ink); text-anchor:middle; dominant-baseline:central; }

.cloud { fill:var(--grid); stroke:var(--box-stroke); stroke-width:1.5; }
.cloud-t { font-size:13px; font-weight:700; fill:var(--muted); text-anchor:middle; dominant-baseline:central; }

.arch-scope .flow         { fill:none; stroke:var(--flow); stroke-width:2; }
.arch-scope .flow-traffic { fill:none; stroke:var(--orange); stroke-width:3; }
.arch-scope .flow-mgmt    { fill:none; stroke:var(--blue); stroke-width:2; stroke-dasharray:5 4; }
.arch-scope .flow-out     { fill:none; stroke:var(--green-d); stroke-width:3; }
.arch-scope .flow-in      { fill:none; stroke:var(--blue); stroke-width:3; stroke-dasharray:6 4; }

.arch-scope .op { fill:rgba(0,76,131,.10); stroke:var(--blue-d); stroke-width:1.5; }
.arch-scope .op-t { font-size:12px; font-weight:600; fill:var(--ink); }

.arch-scope .box { fill:var(--box); stroke:var(--box-stroke); stroke-width:1.4; }
.arch-scope .box-t { font-size:11px; font-weight:700; fill:var(--muted); }
.arch-scope .clusterA { fill:rgba(0,132,228,.05); stroke:var(--blue); stroke-width:1.5; stroke-dasharray:6 4; }
.arch-scope .clusterB { fill:rgba(102,182,137,.06); stroke:var(--green-d); stroke-width:1.5; stroke-dasharray:6 4; }
.arch-scope .cluster-t { font-size:11px; font-weight:700; }
.arch-scope .cluster-tA { fill:var(--blue); }
.arch-scope .cluster-tB { fill:var(--green-d); }

.arch-scope .barrier { stroke:var(--magenta); stroke-width:2; stroke-dasharray:6 5; fill:none; }
.arch-scope .barrier-band { fill:rgba(181,0,84,.06); }
.arch-scope .barrier-t { font-size:11px; font-weight:700; fill:var(--magenta); }

.arch-scope .tunnel { fill:rgba(102,182,137,.10); stroke:var(--green-d); stroke-width:1.5; }
.arch-scope .badge { fill:var(--box); stroke:var(--box-stroke); stroke-width:1.2; }
.arch-scope .badge-t { font-size:11px; fill:var(--muted); }
.arch-scope .lbl { font-size:11.5px; font-weight:600; }
.arch-scope .lbl-out { fill:var(--green-d); }
.arch-scope .lbl-in  { fill:var(--blue); }
.arch-scope .num { font-size:12px; font-weight:800; fill:#fff; }
.arch-scope .num-out { fill:var(--green-d); }
.arch-scope .num-in { fill:var(--blue); }
.arch-scope .tap-t { font-size:11px; font-weight:600; fill:var(--ink); }
</style>

<svg class="arch-defs" width="0" height="0" aria-hidden="true" style="position:absolute">
  <defs>
    <marker id="mo" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto-start-reverse"><path d="M1 1 L8.5 4.5 L1 8 Z" fill="#F29A2E"/></marker>
    <marker id="mb" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto-start-reverse"><path d="M1 1 L8.5 4.5 L1 8 Z" fill="#0084e4"/></marker>
    <marker id="mn" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto-start-reverse"><path d="M1 1 L8.5 4.5 L1 8 Z" fill="#8a9bab"/></marker>
    <marker id="mg" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto-start-reverse"><path d="M1 1 L8.5 4.5 L1 8 Z" fill="#228C50"/></marker>
  </defs>

  <symbol id="s-capture" viewBox="0 0 130 32">
    <rect class="chip chip-cap" x="1" y="1" width="128" height="30" rx="15"/>
    <g class="chip-ic-cap"><path d="M20 8 v10"/><path d="M15 14 l5 5 l5 -5"/><path d="M13 23 h14"/></g>
    <text class="chip-t" x="77" y="16">capture</text>
  </symbol>
  <symbol id="s-viewer" viewBox="0 0 130 32">
    <rect class="chip chip-view" x="1" y="1" width="128" height="30" rx="15"/>
    <g class="chip-ic-view"><path d="M13 16 c4 -6 11 -6 15 0 c-4 6 -11 6 -15 0 z"/><circle cx="20.5" cy="16" r="2.4"/></g>
    <text class="chip-t" x="79" y="16">viewer</text>
  </symbol>
  <symbol id="s-wise" viewBox="0 0 130 32">
    <rect class="chip chip-wise" x="1" y="1" width="128" height="30" rx="15"/>
    <g class="chip-ic-wise"><path d="M13 20 l4 -9 l4 7 l4 -7 l4 9"/></g>
    <text class="chip-t" x="80" y="16">WISE</text>
  </symbol>
  <symbol id="s-pcap" viewBox="0 0 64 62">
    <g class="cyl cyl-pcap">
      <path class="cyl-body" d="M8 12 v38 a24 8 0 0 0 48 0 v-38"/>
      <ellipse class="cyl-top" cx="32" cy="12" rx="24" ry="8"/>
    </g>
    <text class="cyl-t" x="32" y="30">PCAP</text>
    <text class="cyl-t" x="32" y="44">files</text>
  </symbol>
  <symbol id="s-es" viewBox="0 0 64 62">
    <g class="cyl cyl-es">
      <path class="cyl-body" d="M8 12 v38 a24 8 0 0 0 48 0 v-38"/>
      <ellipse class="cyl-top" cx="32" cy="12" rx="24" ry="8"/>
    </g>
    <text class="cyl-t" x="32" y="36">ES</text>
  </symbol>
  <symbol id="s-cloud" viewBox="0 0 150 74">
    <path class="cloud" d="M40 64 C21 64 13 46 27 37 C22 23 41 15 53 24 C60 9 87 9 95 24 C108 15 127 24 121 39 C138 43 135 64 116 64 Z"/>
    <text class="cloud-t" x="73" y="45">Network</text>
  </symbol>
</svg>

#### Legend / Info

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 96" role="img" aria-label="Legend">
  <use href="#s-capture" x="14" y="14" width="120" height="30"/>
  <text class="m-sub" x="74" y="58">packet capture</text>
  <use href="#s-viewer" x="150" y="14" width="120" height="30"/>
  <text class="m-sub" x="210" y="58">web/API viewer</text>
  <use href="#s-wise" x="286" y="14" width="120" height="30"/>
  <text class="m-sub" x="346" y="58">enrichment</text>
  <use href="#s-pcap" x="430" y="8" width="46" height="44"/>
  <text class="m-sub" x="453" y="62">raw pcap on disk</text>
  <use href="#s-es" x="560" y="8" width="46" height="44"/>
  <text class="m-sub" x="583" y="62">OpenSearch / ES</text>
  <line class="flow-traffic" x1="30" y1="82" x2="70" y2="82" marker-end="url(#mo)"/>
  <text class="m-sub" x="150" y="82" text-anchor="start" style="text-anchor:start">mirrored packets</text>
  <line class="flow" x1="300" y1="82" x2="340" y2="82"/>
  <text class="m-sub" x="420" y="82">node&#8209;to&#8209;node</text>
  <line class="flow-mgmt" x1="500" y1="82" x2="540" y2="82" marker-end="url(#mb)"/>
  <text class="m-sub" x="600" y="82">operator access</text>
</svg>
</figure>

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

<figure class="arch-fig" style="max-width:300px">
<svg viewBox="0 0 300 400" role="img" aria-label="Single host Arkime deployment diagram">
  <rect class="chip chip-tap" x="80" y="14" width="140" height="34" rx="10"/>
  <text class="tap-t" x="150" y="31">Mirror or Tap</text>
  <line class="flow-traffic" x1="150" y1="48" x2="150" y2="84" marker-end="url(#mo)"/>

  <rect class="machine" x="46" y="90" width="208" height="222" rx="14"/>
  <text class="m-title" x="150" y="106">Single Host</text>
  <line class="m-accent" x1="66" y1="116" x2="234" y2="116"/>
  <use href="#s-capture" x="85" y="126" width="130" height="32"/>
  <use href="#s-viewer"  x="85" y="168" width="130" height="32"/>
  <use href="#s-wise"    x="85" y="210" width="130" height="32"/>
  <use href="#s-pcap" x="82"  y="252" width="54" height="52"/>
  <use href="#s-es"   x="164" y="252" width="54" height="52"/>

  <line class="flow" x1="150" y1="312" x2="150" y2="366"/>
  <use href="#s-cloud" x="75" y="330" width="150" height="70"/>
</svg>
<figcaption>Capture, viewer, WISE and both data stores all live on one machine.</figcaption>
</figure>

A single host deployment should usually only be used for demos and extremely low traffic networks. The read/write patterns of Arkime vs OpenSearch/Elasticsearch will tax most systems using spinning disks and is not recommended.

## Multiple Hosts Monitoring Multiple Network Segments
{: .subsection-header }

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 620" role="img" aria-label="Multiple hosts monitoring multiple network segments">
  <!-- capture machines -->
  <g>
    <rect class="chip chip-tap" x="50"  y="18" width="120" height="30" rx="9"/><text class="tap-t" x="110" y="33">Mirror or Tap</text>
    <rect class="chip chip-tap" x="260" y="18" width="120" height="30" rx="9"/><text class="tap-t" x="320" y="33">Mirror or Tap</text>
    <rect class="chip chip-tap" x="470" y="18" width="120" height="30" rx="9"/><text class="tap-t" x="530" y="33">Mirror or Tap</text>
    <line class="flow-traffic" x1="110" y1="48" x2="110" y2="74" marker-end="url(#mo)"/>
    <line class="flow-traffic" x1="320" y1="48" x2="320" y2="74" marker-end="url(#mo)"/>
    <line class="flow-traffic" x1="530" y1="48" x2="530" y2="74" marker-end="url(#mo)"/>
  </g>
  <g id="capnode">
    <rect class="machine" x="20"  y="78" width="180" height="190" rx="12"/>
    <rect class="machine" x="230" y="78" width="180" height="190" rx="12"/>
    <rect class="machine" x="440" y="78" width="180" height="190" rx="12"/>
    <text class="m-title" x="110" y="96">Capture Node</text>
    <text class="m-title" x="320" y="96">Capture Node</text>
    <text class="m-title" x="530" y="96">Capture Node</text>
    <use href="#s-capture" x="45"  y="110" width="130" height="32"/>
    <use href="#s-capture" x="255" y="110" width="130" height="32"/>
    <use href="#s-capture" x="465" y="110" width="130" height="32"/>
    <use href="#s-pcap" x="83"  y="152" width="54" height="52"/>
    <use href="#s-pcap" x="293" y="152" width="54" height="52"/>
    <use href="#s-pcap" x="503" y="152" width="54" height="52"/>
    <use href="#s-viewer" x="45"  y="220" width="130" height="32"/>
    <use href="#s-viewer" x="255" y="220" width="130" height="32"/>
    <use href="#s-viewer" x="465" y="220" width="130" height="32"/>
  </g>

  <!-- machines to cloud (head only at the node end; cloud is drawn last, over the stubs) -->
  <path class="flow" d="M110 268 C110 315 250 340 300 352"/>
  <line class="flow" x1="320" y1="268" x2="320" y2="352"/>
  <path class="flow" d="M530 268 C530 315 390 340 340 352"/>

  <!-- WISE -->
  <rect class="chip chip-wise" x="512" y="340" width="108" height="36" rx="12"/><text class="chip-t" x="566" y="358">WISE</text>
  <line class="flow" x1="368" y1="359" x2="512" y2="358"/>

  <!-- ES clusters -->
  <rect class="box" x="30" y="470" width="220" height="104" rx="12"/>
  <text class="box-t" x="140" y="486">OpenSearch / Elasticsearch</text>
  <use href="#s-es" x="70"  y="500" width="54" height="56"/>
  <use href="#s-es" x="130" y="500" width="54" height="56"/>
  <text class="m-sub" x="215" y="530" style="font-size:16px;font-weight:800">…</text>

  <rect class="box" x="270" y="470" width="150" height="104" rx="12"/>
  <text class="box-t" x="345" y="486">Data nodes</text>
  <use href="#s-es" x="290" y="500" width="54" height="56"/>
  <use href="#s-es" x="348" y="500" width="54" height="56"/>

  <path class="flow" d="M300 368 C250 405 185 445 150 470"/>
  <path class="flow" d="M324 372 C332 410 340 450 345 470"/>

  <!-- central viewer + reverse proxy -->
  <rect class="machine" x="450" y="452" width="170" height="122" rx="12"/>
  <text class="m-title" x="535" y="468">Central Viewer</text>
  <use href="#s-viewer" x="475" y="480" width="120" height="30"/>
  <rect class="chip chip-proxy" x="475" y="522" width="120" height="34" rx="12"/><text class="chip-t" x="535" y="539" style="font-size:11px">reverse proxy</text>
  <path class="flow" d="M352 366 C400 398 452 428 484 452"/>

  <!-- operators (below the box, so nothing crosses it) -->
  <rect class="op" x="470" y="584" width="150" height="28" rx="14"/><text class="op-t" x="545" y="598">Operators</text>
  <line class="flow-mgmt" x1="545" y1="584" x2="545" y2="558" marker-end="url(#mb)"/>

  <!-- network cloud drawn last so all connector stubs tuck underneath it -->
  <use href="#s-cloud" x="245" y="322" width="150" height="74"/>
</svg>
<figcaption>Each segment gets its own capture node; operators reach every cluster through a single reverse&#8209;proxied central viewer.</figcaption>
</figure>

<hr class="arch-rule"/>

### Multiple Hosts Monitoring High Traffic Networks
{: .subsection-header }

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 690" role="img" aria-label="High traffic Arkime deployment with a network packet broker">
  <!-- taps -->
  <rect class="chip chip-tap" x="70"  y="14" width="90" height="30" rx="9"/><text class="tap-t" x="115" y="29">Tap</text>
  <rect class="chip chip-tap" x="275" y="14" width="90" height="30" rx="9"/><text class="tap-t" x="320" y="29">Tap</text>
  <rect class="chip chip-tap" x="480" y="14" width="90" height="30" rx="9"/><text class="tap-t" x="525" y="29">Tap</text>
  <line class="flow-traffic" x1="115" y1="44" x2="180" y2="70" marker-end="url(#mo)"/>
  <line class="flow-traffic" x1="320" y1="44" x2="320" y2="70" marker-end="url(#mo)"/>
  <line class="flow-traffic" x1="525" y1="44" x2="460" y2="70" marker-end="url(#mo)"/>

  <!-- NPB -->
  <rect class="chip chip-npb" x="140" y="72" width="360" height="42" rx="12"/>
  <text class="chip-t" x="320" y="93">Network Packet Broker</text>
  <line class="flow-traffic" x1="200" y1="114" x2="130" y2="150" marker-end="url(#mo)"/>
  <line class="flow-traffic" x1="320" y1="114" x2="320" y2="150" marker-end="url(#mo)"/>
  <line class="flow-traffic" x1="440" y1="114" x2="510" y2="150" marker-end="url(#mo)"/>

  <!-- capture machines -->
  <rect class="machine" x="20"  y="154" width="180" height="184" rx="12"/>
  <rect class="machine" x="230" y="154" width="180" height="184" rx="12"/>
  <rect class="machine" x="440" y="154" width="180" height="184" rx="12"/>
  <text class="m-title" x="110" y="172">Capture Node</text>
  <text class="m-title" x="320" y="172">Capture Node</text>
  <text class="m-title" x="530" y="172">Capture Node</text>
  <use href="#s-capture" x="45"  y="186" width="130" height="32"/>
  <use href="#s-capture" x="255" y="186" width="130" height="32"/>
  <use href="#s-capture" x="465" y="186" width="130" height="32"/>
  <use href="#s-pcap" x="83"  y="228" width="54" height="52"/>
  <use href="#s-pcap" x="293" y="228" width="54" height="52"/>
  <use href="#s-pcap" x="503" y="228" width="54" height="52"/>
  <use href="#s-viewer" x="45"  y="292" width="130" height="32"/>
  <use href="#s-viewer" x="255" y="292" width="130" height="32"/>
  <use href="#s-viewer" x="465" y="292" width="130" height="32"/>

  <!-- cloud -->
  <path class="flow" d="M110 338 C110 385 250 410 300 422"/>
  <line class="flow" x1="320" y1="338" x2="320" y2="422"/>
  <path class="flow" d="M530 338 C530 385 390 410 340 422"/>

  <rect class="chip chip-wise" x="512" y="410" width="108" height="36" rx="12"/><text class="chip-t" x="566" y="428">WISE</text>
  <line class="flow" x1="368" y1="429" x2="512" y2="428"/>

  <!-- ES + central viewer -->
  <rect class="box" x="30" y="540" width="220" height="104" rx="12"/>
  <text class="box-t" x="140" y="556">OpenSearch / Elasticsearch</text>
  <use href="#s-es" x="70"  y="570" width="54" height="56"/>
  <use href="#s-es" x="130" y="570" width="54" height="56"/>
  <text class="m-sub" x="215" y="600" style="font-size:16px;font-weight:800">…</text>

  <rect class="box" x="270" y="540" width="150" height="104" rx="12"/>
  <text class="box-t" x="345" y="556">Data nodes</text>
  <use href="#s-es" x="290" y="570" width="54" height="56"/>
  <use href="#s-es" x="348" y="570" width="54" height="56"/>

  <path class="flow" d="M300 438 C250 475 185 515 150 540"/>
  <path class="flow" d="M324 442 C332 480 340 515 345 540"/>

  <rect class="machine" x="450" y="522" width="170" height="122" rx="12"/>
  <text class="m-title" x="535" y="538">Central Viewer</text>
  <use href="#s-viewer" x="475" y="550" width="120" height="30"/>
  <rect class="chip chip-proxy" x="475" y="592" width="120" height="34" rx="12"/><text class="chip-t" x="535" y="609" style="font-size:11px">reverse proxy</text>
  <path class="flow" d="M352 436 C400 468 452 498 484 522"/>
  <rect class="op" x="470" y="654" width="150" height="28" rx="14"/><text class="op-t" x="545" y="668">Operators</text>
  <line class="flow-mgmt" x1="545" y1="654" x2="545" y2="628" marker-end="url(#mb)"/>

  <!-- network cloud drawn last so all connector stubs tuck underneath it -->
  <use href="#s-cloud" x="245" y="392" width="150" height="74"/>
</svg>
<figcaption>A packet broker load&#8209;balances and recombines high&#8209;rate traffic across many capture nodes.</figcaption>
</figure>

#### Notes
{: .subsection }

* Using a Network Packet Broker (NPB) allows traffic to be load balanced and recombined. This is especially useful in HA or asymmetric routing cases
* By using a NPB, other security devices can see the same traffic arkime sees
* When running multiple arkime-captures on the same host make sure the IO doesn't overwhelm the disk and other subsystems.
* Use a TAP with high traffic networks since many mirror ports drop traffic under heavy load
* Operators use an apache fronted viewer (central viewer) and don't hit the other viewers directly. The apache provides authentication.
* Lock down ES and arkime viewer with iptables

## Multiple Clusters
{: .subsection-header }

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 560" role="img" aria-label="Multiple Arkime clusters served through central viewers">
  <!-- spokes (head only at the node end); the cloud is drawn AFTER them, over the stubs -->
  <path class="flow" d="M194 140 C242 180 265 240 300 268"/>
  <path class="flow" d="M446 110 C400 165 380 240 342 268"/>
  <path class="flow" d="M194 430 C236 395 258 322 300 290"/>
  <path class="flow" d="M446 440 C405 400 384 322 342 290"/>
  <line class="flow" x1="320" y1="190" x2="320" y2="266"/>
  <line class="flow" x1="320" y1="356" x2="320" y2="290"/>

  <!-- central network cloud, drawn last so the spoke stubs tuck underneath it -->
  <use href="#s-cloud" x="250" y="244" width="140" height="68"/>

  <!-- Cluster A (blue): capture node top-left, ES top-right -->
  <text class="cluster-t cluster-tA" x="60" y="36">Cluster A</text>
  <rect class="machine" x="36" y="44" width="158" height="150" rx="12"/>
  <text class="m-title" x="115" y="58">Capture Node</text>
  <line class="m-accent" x1="52" y1="68" x2="178" y2="68"/>
  <use href="#s-capture" x="50" y="74" width="130" height="30"/>
  <use href="#s-pcap" x="92" y="110" width="46" height="46"/>
  <use href="#s-viewer" x="50" y="160" width="130" height="30"/>
  <rect class="box" x="446" y="52" width="158" height="92" rx="12" style="stroke:var(--blue)"/>
  <text class="cluster-t cluster-tA" x="525" y="68">ES cluster A</text>
  <use href="#s-es" x="474" y="80" width="46" height="50"/>
  <use href="#s-es" x="530" y="80" width="46" height="50"/>

  <!-- Cluster B (green): capture node bottom-left, ES bottom-right -->
  <text class="cluster-t cluster-tB" x="60" y="358">Cluster B</text>
  <rect class="machine" x="36" y="366" width="158" height="150" rx="12"/>
  <text class="m-title" x="115" y="382">Capture Node</text>
  <line class="m-accent" x1="52" y1="392" x2="178" y2="392" style="stroke:var(--green-d)"/>
  <use href="#s-viewer" x="50" y="398" width="130" height="30"/>
  <use href="#s-pcap" x="92" y="436" width="46" height="46"/>
  <use href="#s-capture" x="50" y="484" width="130" height="30"/>
  <rect class="box" x="446" y="414" width="158" height="92" rx="12" style="stroke:var(--green-d)"/>
  <text class="cluster-t cluster-tB" x="525" y="430">ES cluster B</text>
  <use href="#s-es" x="474" y="442" width="46" height="50"/>
  <use href="#s-es" x="530" y="442" width="46" height="50"/>

  <!-- WISE above cloud -->
  <rect class="chip chip-wise" x="268" y="150" width="104" height="40" rx="14"/><text class="chip-t" x="320" y="170">WISE</text>

  <!-- central multi-viewer below cloud -->
  <rect class="machine" x="258" y="356" width="124" height="118" rx="12"/>
  <text class="m-title" x="320" y="371">Central Viewers</text>
  <rect class="chip chip-view" x="264" y="378" width="112" height="24" rx="12"/><text class="chip-t" x="320" y="390" style="font-size:10.5px">viewer &#8594; cluster A</text>
  <rect class="chip chip-wise" x="264" y="406" width="112" height="24" rx="12"/><text class="chip-t" x="320" y="418" style="font-size:10.5px">viewer &#8594; cluster B</text>
  <rect class="chip chip-proxy" x="264" y="434" width="112" height="24" rx="12"/><text class="chip-t" x="320" y="446" style="font-size:10.5px">reverse proxy</text>
  <rect class="op" x="255" y="484" width="130" height="28" rx="14"/><text class="op-t" x="320" y="498">Operators</text>
  <line class="flow-mgmt" x1="320" y1="484" x2="320" y2="460" marker-end="url(#mb)"/>
</svg>
<figcaption>Independent clusters, each with its own capture nodes and ES, all reachable through the network; a virtual&#8209;path reverse proxy routes operators to either one.</figcaption>
</figure>

#### Notes
{: .subsection }

* It is possible to use a single ES cluster using the prefix= ini configuration
* Operator uses apache fronted viewers (central viewers) and doesn't hit the other viewers directly. The apache provides authentication. Can use virtual paths to route to different clusters.
* NPBs are recommended for high traffic networks

## Packet Portal (Sensors behind NAT)
{: .subsection-header }

<p><strong>Experimental &mdash; added in Arkime 6.7.0.</strong></p>

Normally the Central Viewer opens short-lived outbound connections *to* each Sensor's viewer to fetch pcap, run hunts, and proxy per-node requests — which only works when the Sensor is directly reachable. A **Packet Portal** flips that around for edge sensors that sit behind NAT, a firewall, or an IP&#8209;locked reverse proxy: the **Sensor** opens one long-lived outbound connection to the **Central Viewer**, and the Central Viewer sends its normal node&#8209;to&#8209;node requests *back down that same connection*. When no portal is present everything falls back to normal node&#8209;to&#8209;node HTTP, so the feature is purely additive.

<figure class="arch-fig" style="max-width:740px">
<svg viewBox="0 0 760 400" role="img" aria-label="Packet portal reverse connection from a NATed sensor to the central viewer">
  <!-- Sensor -->
  <rect class="machine" x="26" y="110" width="210" height="238" rx="14"/>
  <text class="m-title" x="131" y="128">Sensor (edge capture)</text>
  <text class="m-sub" x="131" y="143">behind NAT / firewall</text>
  <use href="#s-capture" x="66" y="158" width="130" height="28"/>
  <use href="#s-pcap" x="108" y="190" width="46" height="44"/>
  <use href="#s-viewer" x="66" y="236" width="130" height="34"/>
  <text class="m-sub" x="131" y="292">cannot accept inbound connections</text>

  <!-- NAT/firewall barrier, at the sensor's edge and clear of the tunnel labels -->
  <rect class="barrier-band" x="272" y="104" width="34" height="222"/>
  <line class="barrier" x1="289" y1="104" x2="289" y2="326"/>
  <text class="barrier-t" x="289" y="94">NAT / firewall</text>

  <!-- Central Viewer -->
  <rect class="machine" x="524" y="110" width="210" height="238" rx="14"/>
  <text class="m-title" x="629" y="128">Central Viewer</text>
  <text class="m-sub" x="629" y="150">accepts portals on :8006</text>
  <text class="m-sub" x="629" y="165">(packetPortalPort)</text>
  <use href="#s-viewer" x="564" y="236" width="130" height="34"/>

  <rect class="op" x="554" y="360" width="150" height="28" rx="14"/><text class="op-t" x="629" y="374">Operators</text>
  <line class="flow-mgmt" x1="629" y1="360" x2="629" y2="272" marker-end="url(#mb)"/>

  <!-- portal tunnel: viewer chip <-> viewer chip, straight through the NAT -->
  <rect class="tunnel" x="196" y="224" width="368" height="58" rx="29"/>

  <!-- 1: outbound establish (green, sensor viewer -> central viewer) -->
  <line class="flow-out" x1="198" y1="244" x2="562" y2="244" marker-end="url(#mg)"/>
  <circle class="num-out" cx="210" cy="244" r="9"/><text class="num" x="210" y="244">1</text>
  <text class="lbl lbl-out" x="420" y="235">long&#8209;lived outbound portal</text>

  <!-- 2: requests return (blue dashed, central viewer -> sensor viewer) -->
  <line class="flow-in" x1="562" y1="266" x2="198" y2="266" marker-end="url(#mb)"/>
  <circle class="num-in" cx="550" cy="266" r="9"/><text class="num" x="550" y="266">2</text>
  <text class="lbl lbl-in" x="420" y="274">pcap · hunts · cron requests</text>

  <!-- viewer-to-viewer emphasis + auth -->
  <rect class="tunnel" x="345" y="290" width="150" height="26" rx="8"/>
  <text class="lbl lbl-out" x="420" y="303">viewer&#8209;to&#8209;viewer</text>
  <rect class="badge" x="313" y="322" width="204" height="42" rx="8"/>
  <text class="badge-t" x="415" y="335">S2S auth: serverSecret +</text>
  <text class="badge-t" x="415" y="351">[packetportal&#8209;nodes] per&#8209;node</text>
</svg>
<figcaption>The Sensor's <em>viewer</em> dials out once, directly to the Central <em>viewer</em>; every request the Central Viewer sends back over that portal is individually server&#8209;to&#8209;server authenticated.</figcaption>
</figure>

#### Notes
{: .subsection }

* Use a packet portal when a Sensor's viewer cannot be reached directly — a Sensor behind NAT or a firewall, or a Central Viewer that is fronted by a reverse proxy, uses header authentication, and is IP locked down.
* On each **Sensor**, set [`packetPortalConnect`](settings#packetportalconnect) to the Central Viewer(s) to keep an outbound portal open to. Portals reconnect automatically with backoff, and multiple Central Viewers can each reach the same Sensor.
* On the **Central Viewer**, pick *one* way to accept portals: a dedicated [`packetPortalPort`](settings#packetportalport) (recommended — its own firewall rules, unaffected by the main viewer's proxy/header auth/IP restrictions), or [`packetPortalListen`](settings#packetportallisten)`=true` to accept them on the existing viewer port.
* Every request carried over a portal is individually S2S authenticated with `serverSecret`, and the loopback address and any `userNameHeader` a request appears to carry are **not** trusted — so header/IP auth cannot be spoofed through a portal.
* Because a Sensor names itself when it opens a portal, the Central Viewer authenticates that claim with the [`[packetportal-nodes]`](settings#packetportal-nodes) section (per&#8209;node password and/or source IP, falling back to `[esproxy-sensors]`), so one compromised Sensor cannot claim another's node name.
* See the [Packet Portal settings](settings#packetPortal) for the full list of options.

## Remote Device Capture
{: .subsection-header }

In some cases, it’s not practical or possible to physically co-locate a capture server near a device we want to instrument — for example a small router or appliance that can see the traffic but can't run a full Arkime install. There are two common ways to get that remote traffic to Arkime.

### Option 1 — TZSP forwarding (recommended)
{: .subsection }

The remote device captures on one of its interfaces and forwards each packet, encapsulated in [TZSP](https://en.wikipedia.org/wiki/TZSP), over UDP to an Arkime capture process configured with <code>pcapReadMethod=tzsp</code>. Nothing is stored on the device, so this works well for small appliances and routers — Arkime even ships a tiny <code>tzsp_forwarder</code> helper for exactly this.

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 300" role="img" aria-label="Remote device capture forwarding TZSP packets to an Arkime capture server">
  <!-- remote device -->
  <rect class="chip chip-tap" x="79" y="40" width="80" height="26" rx="8"/><text class="tap-t" x="119" y="53">br0</text>
  <rect class="machine" x="24" y="70" width="190" height="168" rx="12"/>
  <text class="m-title" x="119" y="92">Remote device</text>
  <text class="m-sub" x="119" y="107">router / small appliance</text>
  <rect class="chip chip-proxy" x="44" y="126" width="150" height="30" rx="15"/><text class="chip-t" x="119" y="141" style="font-size:11px">tzsp_forwarder</text>
  <text class="m-sub" x="119" y="178">captures br0 &#8594; TZSP</text>

  <!-- transport cloud -->
  <use href="#s-cloud" x="248" y="108" width="150" height="72"/>

  <!-- Arkime capture server: full capture / pcap / viewer stack -->
  <rect class="machine" x="426" y="44" width="190" height="216" rx="12"/>
  <text class="m-title" x="521" y="64">Arkime capture server</text>
  <use href="#s-capture" x="446" y="82" width="150" height="30"/>
  <use href="#s-pcap" x="496" y="122" width="50" height="48"/>
  <use href="#s-viewer" x="446" y="178" width="150" height="30"/>
  <text class="m-sub" x="521" y="226">pcapReadMethod=tzsp</text>
  <text class="m-sub" x="521" y="242">listens on UDP :37008</text>

  <!-- TZSP stream into capture -->
  <path class="flow-traffic" d="M214 140 C234 142 248 144 264 145" marker-end="url(#mo)"/>
  <path class="flow-traffic" d="M380 144 C408 128 418 104 446 98" marker-end="url(#mo)"/>
  <rect class="badge" x="290" y="190" width="66" height="26" rx="8"/><text class="badge-t" x="323" y="203" style="font-weight:700">TZSP</text>
  <text class="lbl" x="323" y="284" style="fill:var(--orange)">packets forwarded over the network as TZSP (UDP :37008)</text>
</svg>
</figure>

* On the **remote device**, run the <code>tzsp_forwarder</code> helper (build it from <code>contrib/tzsp_forwarder.c</code>) pointed at the interface to monitor and the Arkime host: <br><code>./tzsp_forwarder br0 &lt;arkime_host&gt; [&lt;bpf_filter&gt;]</code>
* On the **Arkime capture** side, set <code>pcapReadMethod=tzsp</code> (the <code>interface</code> setting is ignored — set it to <code>dummy</code>) and capture will listen on [`tzspPort`](settings#reader-tzsp) (UDP 37008).
* For a full, worked end-to-end example — forwarding from a Ubiquiti **UDR7** router into a Dockerized Arkime, plus optional HTTPS with Caddy — see [Arkime on the UDR7](/udr7).

### Option 2 — SSH pcap streaming (not recommended)
{: .subsection }

If the device is reachable via ssh, we can log in to the remote device, start a capture, and stream the raw pcap back to an Arkime server through a UNIX pipe. One starts an Arkime capture process using the pipe as the capture interface, giving real-time capture of the remote device.

<figure class="arch-fig" style="max-width:640px">
<svg viewBox="0 0 640 300" role="img" aria-label="Remote device capture over ssh into a named pipe">
  <!-- remote device -->
  <rect class="chip chip-tap" x="72" y="40" width="76" height="28" rx="9"/><text class="tap-t" x="110" y="54">ens3</text>
  <rect class="machine" x="30" y="72" width="180" height="166" rx="12"/>
  <text class="m-title" x="120" y="118">Remote device</text>
  <text class="m-sub" x="120" y="136">10.1.2.3</text>
  <text class="m-sub" x="120" y="154">tcpdump &#8594; stdout</text>

  <!-- transport cloud -->
  <use href="#s-cloud" x="245" y="108" width="150" height="72"/>

  <!-- Arkime capture server: pipe -> capture / pcap / viewer stack -->
  <rect class="machine" x="426" y="44" width="190" height="216" rx="12"/>
  <text class="m-title" x="521" y="62">Arkime capture server</text>
  <rect class="chip chip-proxy" x="452" y="78" width="138" height="26" rx="12"/><text class="chip-t" x="521" y="91" style="font-size:11px">named pipe (fifo)</text>
  <line class="flow" x1="521" y1="104" x2="521" y2="116" marker-end="url(#mn)"/>
  <use href="#s-capture" x="446" y="118" width="150" height="30"/>
  <use href="#s-pcap" x="496" y="158" width="50" height="46"/>
  <use href="#s-viewer" x="446" y="212" width="150" height="30"/>

  <!-- ssh pcap stream into the pipe -->
  <path class="flow-traffic" d="M210 144 C234 146 246 148 264 149" marker-end="url(#mo)"/>
  <path class="flow-traffic" d="M378 148 C408 122 418 96 452 90" marker-end="url(#mo)"/>
  <rect class="badge" x="288" y="192" width="66" height="26" rx="8"/><text class="badge-t" x="320" y="205" style="font-weight:700">ssh</text>
  <text class="lbl" x="320" y="284" style="fill:var(--orange)">raw pcap streamed over ssh</text>
</svg>
</figure>

Steps:
1. Create named pipe on the local capture machine, you can name whatever you want: <br><code>mkfifo /tmp/10.1.2.3-ens3</code>
1. Start capture on the local capture machine: <br><code>/opt/arkime/bin/capture --copy -r /tmp/10.1.2.3-ens3</code>
1. Use ssh to copy the data from remote to localhost machine, exclude capturing the traffic we are sending over ssh: <br><code>ssh user@10.1.2.3 sudo /usr/sbin/tcpdump -s0 -i ens3 -w - not host 192.168.10.5 > /tmp/10.1.2.3-ens3</code><br>(The sudo and full path to tcpdump might not be required, remember to update the ips.)

This is NOT the recommended way to use Arkime.
{: .alert.alert-warning }


</div>

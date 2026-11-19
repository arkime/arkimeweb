---
title: Arkime Documentation
description: "Arkime documentation: installation, Docker, architecture, rules, WISE, Cont3xt, Parliament and the full API reference."
layout: wiki
permalink: "/learn"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

## Start here
{: .subsection-header.mt-1 }

<div class="row mb-4" markdown="0">
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">1. See it first</h5>
        <p class="card-text">No install. A live Arkime full of real traffic you can search and pivot through right now.</p>
        <a href="/demo" class="btn btn-success btn-interactive">Try the demo</a>
      </div>
    </div>
  </div>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">2a. Install on Linux</h5>
        <p class="card-text">The full guide: OpenSearch/Elasticsearch, capture, viewer and your first user.</p>
        <a href="/install" class="btn btn-primary btn-interactive">Installation guide</a>
      </div>
    </div>
  </div>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">2b. Or run containers</h5>
        <p class="card-text">One image holds every Arkime application. Copy a Docker Compose file and go.</p>
        <a href="/docker" class="btn btn-primary btn-interactive">Arkime with Docker</a>
      </div>
    </div>
  </div>
</div>

Stuck, or just want to ask something? [Where to ask Arkime questions](/questions) &mdash; Slack, GitHub Discussions and [Office Hours](/officehours).
{: .alert.alert-info }

{% for g in site.data.learn %}
## {{ g.group }}
{: .subsection-header }

{% if g.blurb %}{{ g.blurb }}
{: .text-muted }
{% endif %}

<div class="row" markdown="0">
{% for item in g.items %}
  {% assign p = site.pages | where: "permalink", item.url | first %}
  {% assign t = item.title | default: p.title %}
  {% assign d = item.desc | default: p.description %}
  <div class="col-md-6 mb-3">
    <a href="{{ item.url }}"><strong>{{ t }}</strong></a>
    <div class="small text-muted">{{ d }}</div>
  </div>
{% endfor %}
</div>
{% endfor %}

## Everything, by component
{: .subsection-header.mt-4 }

Already know what you're after? The full list, grouped by the part of Arkime it belongs to.
{: .text-muted }

<div class="row" markdown="0">
{% for g in site.data.learn_components %}
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <strong>{{ g.group }}</strong>
    <ul class="list-unstyled small mt-1 mb-0">
    {% for item in g.items %}
      {% assign p = site.pages | where: "permalink", item.url | first %}
      <li><a href="{{ item.url }}">{{ item.title | default: p.title }}</a></li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>

## Want to contribute to our documentation?
{: .subsection-header.mt-1 }

Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md) file for more information.

</div>

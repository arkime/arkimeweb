---
title: Arkime Rules
layout: wiki
permalink: "/rules"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">
# Arkime Rules
{: .section-header.mt-1 }

This is a gallery of Arkime Rules to browse. Learn how to contribute one [here](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#arkime-rules).

Check out the [rules format](rulesformat) page for more details on Arkime Rules.

<input type="text"
  id="rulesSearch"
  class="form-control"
  placeholder="Search Arkime Rules by name or tag..."
/>

{% for file in site.posts %}
  {% if file.path contains 'rules' %}
  <div class="gallery-item">
    <h3 class="search-title subsection">{{file.title}}</h3>
    {% if file.description %}
    <p class="lead mb-1">{{file.description}}</p>
    {% endif %}
    {% if file.tags %}
    {% for tag in file.tags %}
    <span class="badge badge-secondary search-badge mb-1">{{tag}}</span>{% endfor %}
    {% endif %}
    <button class="btn btn-primary btn-copy-code"
      onclick="copyCode('{{file.title}}')">
      Copy
    </button>
    <div id="{{file.title}}">
    {{file.content}}
    </div>
  </div>
  {% endif %}
{% endfor %}

<div
  class="row"
  id="no-results"
  style="display:none;">
  <div class="col-12">
    <h1 class="display-4 text-center text-muted mt-5 mb-5">
      <span class="fa fa-folder-open"></span>
      <br>
      No Results
    </h1>
  </div>
</div>

## Want to contribute an Arkime Rule?
{: .subsection-header }

Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#arkime-rules) file for more information.

</div>

<script src="gallery.js"></script>

---
title: WISE 3.x Configs
layout: wiki
permalink: "/wise-configs"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">
### WISE 3.x Configuration Files

This is a list of example WISE 3.x configuration files to browse.

---

{% for file in site.posts %}
  <h4>{{file.title}}</h4>
  {% if file.description %}
  <p class="lead mb-1">{{file.description}}</p>
  {% endif %}
  {% if file.tags %}
  {% for tag in file.tags %}
  <span class="badge badge-secondary">{{tag}}</span>{% endfor %}
  {% endif %}
  {{file.content}}
  ---
{% endfor %}

#### Want to contribute a WISE 3.x Config?

<!-- TODO add wise config section to contributing
  add your config into the _posts directory
  the filename must be yyyy-mm-dd-title.md (use the date as the day you're including the file)
  add a title (required) and a description (optional) and tags (optional)
  make sure to format it with proper indentation and enclose the block with ```
-->
<!-- TODO link directly to new wise section of the contributing file -->
Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md) file for more information.

</div>

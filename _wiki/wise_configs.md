---
title: WISE 3.x Configs
layout: wiki
permalink: "/wise-configs"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">
### WISE 3.x Configurations

This is a gallery WISE 3.x configurations to browse. Learn how to contribute one [here](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#wise-configs).

---

{% for file in site.posts %}
  {% if file.path contains 'wiseconfigs' %}
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
  {% endif %}
{% endfor %}

#### Want to contribute a WISE 3.x Config?

Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#wise-configs) file for more information.

</div>

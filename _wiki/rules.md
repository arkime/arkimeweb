---
title: Arkime Rules
layout: wiki
permalink: "/Rules"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">
### Arkime Rule Files

This is a list of example Arkime Rules files to browse.

---

{% for file in site.posts %}
  {% if file.path contains 'rule' %}
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

#### Want to contribute an Arkime Rule File?

Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#arkime-rules) file for more information.

</div>

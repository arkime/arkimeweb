---
title: Arkime Rules
layout: wiki
permalink: "/Rules"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">
### Arkime Rules

This is a gallery of Arkime Rules to browse. Learn how to contribute one [here](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#arkime-rules)

---

{% for file in site.posts %}
  {% if file.path contains 'rules' %}
  <h4>{{file.title}}</h4>
  {% if file.description %}
  <p class="lead mb-1">{{file.description}}</p>
  {% endif %}
  {% if file.tags %}
  {% for tag in file.tags %}
  <span class="badge badge-secondary">{{tag}}</span>{% endfor %}
  {% endif %}
  <button class="btn btn-primary btn-copy-code"
    onclick="copyCode('{{file.title}}')">
    Copy
  </button>
  <div id="{{file.title}}">
  {{file.content}}
  </div>
  ---
  {% endif %}
{% endfor %}

#### Want to contribute an Arkime Rule?

Check out our [contributing](https://github.com/arkime/arkimeweb/blob/main/CONTRIBUTING.md#arkime-rules) file for more information.

</div>

---
title: Arkime APIs
layout: wiki
permalink: "/apiv3"
---

- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="collapse-btn d-none d-sm-block"
  onclick="toggleToc()">
  <span class="fa fa-angle-double-left">
  </span>
</div>

<div class="full-height-container with-footer pt-3 pe-2 ps-2 pb-3 api-container" markdown="1">

# Viewer v3.x - v5.x API

**_This API is not final and is subject to change._**
{: .primary-theme-text }

This is the documentation for version 3.x - 5.x. [Here is the the API for previous versions](/api).

Arkime uses digest authentication for all API calls, so make sure you enable that in your library or curl command.
The easiest way to learn how to make API calls is to open up your browser's javascript console and observe the calls the Arkime UI is making, it uses all the same APIs.

**Note:** Many of the API endpoints require a db field name, which is not the same as what you would use in a search expression.
The easiest way to see database field names is to click the owl within Arkime -> click the fields label on left -> click display the database fields.

---

{% include_relative api_viewer_docs.md %}

</div>

<script>
  $(document).ready(() => {
    const hash = window.location.hash;
    if (hash) {
      window.location.hash = '';
      window.location.hash = hash;
    }
  });
</script>

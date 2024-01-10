---
title: Common APIs
layout: wiki
permalink: "/commonapi"
---

- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="collapse-btn d-none d-sm-block"
  onclick="toggleToc()">
  <span class="fa fa-angle-double-left">
  </span>
</div>

<div class="full-height-container with-footer pt-3 pr-2 pl-2 pb-3 api-container" markdown="1">

# Common v4.x-v5.x API

**_This API is not final and is subject to change._**
{: .primary-theme-text }

**Note:** These endpoints are used across Arkime apps, including Viewer, WISE, Cont3xt, and Parliament.

---

{% include_relative api_common_docs.md %}

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

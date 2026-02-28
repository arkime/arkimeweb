---
title: Sanitize Builds
layout: wiki
permalink: "/sanitize"
---


<div class="full-height-and-width-container with-footer pt-3 pe-5 ps-5 pb-3" markdown="1">
# Sanitize Builds
{: .section-header.mt-1 }

We provide Address Sanitizer (ASAN) builds of the [latest commit releases](https://github.com/arkime/arkime/releases/tag/last-commit6) of Arkime.
These builds are designed to help folks identify memory issues in Arkime.
They can be tricky to get working, so here are some tips.

1. Install sanitize build of Arkime as you would normally.
2. You must set some environment variables to enable ASAN, we recommend the following:
  - `export ASAN_OPTIONS=detect_stack_use_after_return=1:verbosity=1:malloc_context_size=20:fast_unwind_on_malloc=0:detect_leaks=1`
  - `export G_SLICE=always-malloc`
3. Test that running capture for a short period of time outputs LeakSanitzer messages
4. Now run capture, if doing a live capture use `kill -SIGUSR1 <pid>` to dump the current leaks to the log file.

It is important to run the sanitize capture with the same options as your normal capture, otherwise the ASAN build will not be able to detect issues properly.

</div>

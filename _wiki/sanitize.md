---
title: Sanitize Builds
layout: wiki
permalink: "/sanitize"
---


<div class="full-height-and-width-container with-footer pt-3 pe-5 ps-5 pb-3" markdown="1">
# Sanitize Builds
{: .section-header.mt-1 }

We provide AddressSanitizer (ASan) builds of the [latest commit releases](https://github.com/arkime/arkime/releases/tag/last-commit6) of Arkime.
These builds are designed to help find memory issues in Arkime capture.
They run slower and use more memory than normal builds, so use them for debugging instead of long-term production capture.

## Installing a sanitize build
{: .section-header }

Download the sanitize package for your operating system from the latest commit release.
The packages are named `arkimesanitize_main.*.deb` for Debian/Ubuntu and `molochsanitize-main.*.rpm` for EL systems.
Install the package the same way you would install a normal Arkime package.

For best results, use the same `config.ini`, interfaces, plugins, and capture options that you use with your normal capture service.
Changing the capture workload can hide the issue you are trying to reproduce.

## Enabling ASan
{: .section-header }

You must set the ASan environment variables before starting capture.
We recommend:

```bash
export ASAN_OPTIONS=detect_stack_use_after_return=1:verbosity=1:malloc_context_size=20:fast_unwind_on_malloc=0:detect_leaks=1
export G_SLICE=always-malloc
```

If you start capture from a shell, export those variables in the same shell before running capture.
If you use systemd, add them to the `arkimecapture` service override:

```bash
systemctl edit arkimecapture
```

```ini
[Service]
Environment="ASAN_OPTIONS=detect_stack_use_after_return=1:verbosity=1:malloc_context_size=20:fast_unwind_on_malloc=0:detect_leaks=1"
Environment="G_SLICE=always-malloc"
```

Then restart capture:

```bash
systemctl daemon-reload
systemctl restart arkimecapture
```

## Checking for leaks
{: .section-header }

Start capture and let it run long enough to exercise the traffic or PCAP that reproduces the problem.
Confirm the capture log in `/opt/arkime/logs` contains LeakSanitizer output.

For live capture, send `SIGUSR1` to the capture process to write the current leak report to the log file without waiting for the process to exit:

```bash
kill -SIGUSR1 <capture-pid>
```

Include the full LeakSanitizer output and the capture command line or service configuration when reporting the issue.

</div>

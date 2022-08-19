---
title: Security
layout: wiki
permalink: "/security"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Reporting Security Issues

The Arkime project takes security very seriously, but any complex software project is going to have some vulnerabilities.
Please submit any security issues to [HackerOne](https://hackerone.com/yahoo) or arkime.security@yahooinc.com, please use [github issues](https://github.com/arkime/arkime/issues) or slack for non security issues.


## Scope
Examples of security items in scope

* Stored XSS
* Buffer overflow
* UI/API permission checking
* Bypassing forced expressions (excluding when a sessionId is known)

## Out of Scope
Examples of security items that are out of scope and maybe should be submitted to our [github issues](https://github.com/arkime/arkime/issues) page

* all - Crash or security issue on startup from bad config settings or command line options
* all - Admins configuring bad/dangerous URLs/items in notifiers, clusters, WISE sources, etc
* all - Using md5 for security indicators
* all - Auth brute force, http-digest weeknesses, lack of rate limiting
* all - Most issues around anonymous auth mode
* viewer - Accessing a session using the sessionId
* viewer - Viewing the results of another user's hunt
* wise - /dump end point

# Known Security Issues
Security Issues that are known and are either not fixable or a known limitation of Arkime.

* IP TTL Expiry Attacks - An attacker can manipulate IP TTLs so that Arkime will see packets that the end host will not see.  The only "fix" is to add TTL normalization at the network border.  Future versions of Arkime may try and detect this attack.
* Not all Tunnel protocols are supported by Arkime


# Past Security Issues

{:class="table table-bordered"}
| Vulnerability | Date | First | Last |
| ------------- |-------------| ----- | ----- |
| Possible NSH parser infinite recursion | 2022/01/07 | 3.1.0 | 3.2.1 |
| Possible tagger plugin buffer overflow write when enabled | 2021/11/16 | 0.0.0 | 3.1.1 |
| Possible reader-pcapoverip buffer overflow write when enabled | 2021/04/05 | 2.7.0 | 2.7.1 |
| API doesn't enforce permissions correctly for some end points | 2019/11/19 | 1.0.0 | 2.0.1 |
| rXSS for many UI endpoints on errors | 2019/11/19 | 0.0.0  | 2.0.1 |
| sXSS | 2019/11/19 | 1.5.0 | 2.0.1 |
| Long config vars cause capture OOB reads/writes| 2019/11/19 | 0.0.0  | 2.0.1 |
| Capture hashtable DOS | 2019/11/19 | 0.0.0 | 2.0.1 |
| Capture Socks/SSH parser OOB reads | 2019/11/19 |  0.9.0  | 2.0.1 |
| Several APIs are vulnerable to CSRF | 2019/11/19 | 1.0.0  | 2.0.1 |
| Notifier token exposed using API to non admins| 2019/11/19 | 1.7.0 | 2.0.1 |
| Packet Hunt details exposed using API to non admins| 2019/11/19 | 1.6.0 | 2.0.1 |
| Oracle Padding Attacks | 2019/11/19 | 0.6.0 | 2.0.1 |
| rXSS | 2019/01/17 | 1.0.0  | 1.6.2 |


</div>

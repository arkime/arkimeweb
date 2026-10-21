---
title: Rules Format
layout: wiki
permalink: "/rulesformat"
copyLink: True
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Rules Format
{: .section-header.mt-1 }

Rules files allow you to specify actions to perform when criteria are met with certain fields or state.
The rules files are in yaml format and are specified in the config.ini using `rulesFiles=` setting.
There can be multiple files using a semicolon separated list.
Each file can have multiple rules.
The files will automatically be reloaded when they are changed, you do NOT need to restart capture.

Check out the [rules gallery](rules) for inspiration, or add your rule file to help out others!

**Each rule must have a**
{: .mb-0 }

* name - friendly name
* when - when is the rule checked
* ops - A set of operations to perform

**A rule then must also have one of the following**
{: .mb-0 }

* fields - what fields to check
* bpf - A bpf expression
* expression - (Since 7.0.0) A search expression with `&&`, `||`, `!`, wildcards, regex, math and functions, see [Expressions](#expressions)

Sample rule that will drop all tls and quic packets after the first 20 packets
{: .mb-0 }

```
---
version: 1
rules:
  - name: "Drop tls"
    when: "fieldSet"
    fields:
      protocols:
      - tls
      - quic
    ops:
      _maxPacketsToSave: 20
```

If you want to add several rules, then the syntax is as follows. Make sure to have only one "rules:" per file.

```
---
version: 1
rules:
  - name: "Drop localhost"
    when: "fieldSet"
    fields:
      ip.src:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10
  - name: "Drop localhost"
    when: "fieldSet"
    fields:
      ip.dst:
      - 127.0.0.1
    ops:
      _maxPacketsToSave: 10
```

### When
{: .subsection }

**Possible values for the when field, only available when using a field or expression check:**
{: .mb-0 }

* sessionSetup     - Check just during the first few packets of a session.
* afterClassify    - Check after the session has run thru the classifiers
* fieldSet         - Check when ever a field has been set, the most common value for when
* beforeMiddleSave - Check before doing a mid save
* beforeFinalSave  - Check before doing a final save
* beforeBothSave   - Check before either a mid or final save

**Possible values for the when field, only available when using a bpf check:**
{: .mb-0 }

* sessionSetup     - Check just during the first few packets of a session. The config settings dontSaveBPFs and minPacketsSaveBPFs are converted to sessionSetup rules.
* everyPacket      - Check after every packet

### Fields
{: .subsection }
A map of field expressions and values for each field, one value from each field expression must be set.
Currently not all field expressions are supported, but will be added over time.
Since 7.0.0 fields rules are compiled onto the same engine as [expressions](#expressions), with the same meaning as before, and they match faster.

The following example would require that the protocols field is set to tls and that host.http was set to one of the 3 values.
If those two fields are set, then it will add tlsrulestest to the protocols field.
{: .mb-0 }

```
  - name: "Set tlsrulestest on certain hosts"
    when: "fieldSet"
    fields:
      protocols:
        - tls
      host.http:
        - www.aol.com
        - mail.google.com
        - foo.bar.com
    ops:
      "protocols": "tlsrulestest"
```
### String Fields Modifier
{: .subsection }

While fields rules don't support wildcards or regex in string fields (use an [expression](#expressions) for those), we do support 3 different modifiers that allow you to perform some of the same actions.
Rules support endsWith, startsWith, or contains modifiers which are placed after the field name separated by a comma.
So for example you could do the following to get aol.com, google.com, and any sub hostnames of those two domains.
```
  - name: "Set tlsrulestest on certain hosts and any subdomains"
    when: "fieldSet"
    fields:
      protocols:
        - tls
        - quic
      host.http:
        - aol.com
        - google.com
      host.http,endsWith:
        - .aol.com
        - .google.com
    ops:
      "protocols": "tlsrulestest"
```

### Numeric ranges
{: .subsection }

Since Arkime 3.4.1 you can also specify numeric ranges for integer fields.
Use the format of MIN-MAX.
For example this rule requires the src port to be < 1024 and dst port be > 1024
```
  - name: "low src high dst"
    when: "fieldSet"
    fields:
      protocols:
        - tls
        - quic
      port.src:
        - 1-1023
      port.dst:
        - 1024-65535
    ops:
      "protocols": "lowsrcport"
```

### NOT fields
{: .subsection }

Since Arkime 5.1.1 you can also specify fields that match when a value is NOT in the list for string and integer fields.
These fields can not be used with the fieldSet when attribute.
To specify a NOT field, use an exclamation mark before the field name.
```
- name: "NOT example"
  when: "beforeFinalSave"
  fields:
    "!protocols":
      - tcp
      - http
      - dns
    ip.src: 10.0.0.2
  ops:
    "tags": "nottcpdnshttp"
```

### Expressions
{: .subsection }

Since Arkime 7.0.0 a rule can use an `expression` instead of `fields` or `bpf`.
Expressions use a syntax similar to the Sessions search bar, plus math and functions, so a rule can use `&&`, `||`, `!` and parentheses, wildcards, regex and comparisons.
See the [differences](#differences-from-the-sessions-search-bar) below.
Expressions are compiled when the rules file loads, and mistakes are reported with the rule name, line and column.
They work with every `when` except everyPacket, and `fields`, `bpf` and `expression` rules can be mixed in the same file, which still uses `version: 1`.
{: .mb-0 }

```
  - name: "Odd TLS"
    when: "afterClassify"
    log: true
    expression: >
      protocols == tls
      && port.dst != [443, 8443]
      && !(ip.dst == [10.0.0.0/8, 192.168.0.0/16])
    ops:
      tags: "odd-tls"
```

**Operators**
{: .mb-0 }

* `a && b` or `a & b` - and
* `a || b` or `a | b` - or, `&&` binds tighter than `||`
* `!a` - not
* `( )` - grouping
* `==`, `=` and `!=` - match a field against values
* `<`, `<=`, `>` and `>=` - compare numbers
* `+`, `-`, `*`, `/` and `%` - math, put spaces around the operator since field names and values can contain `-`, `*` and `/`

**Values on the right of `==` and `!=`**
{: .mb-0 }

Form | Example
-----|--------
exact | `host.http == www.example.com`, `http.method == "GET"`
any of a list | `port.dst == [80, 8080, 8000-8100]`
all of a list | `http.method == ]GET,HEAD[`
wildcard | `host.http == *.example.com`, `foo*`, `*bar*`, `a?c*`
regex | `http.uri == /\/admin\/.*\.php/`, matches the whole value, same as the viewer
range | `port.dst == 1000-2000`
cidr | `ip.src == 10.0.0.0/8`, `ip.dst == 2001:db8::/32`, `ip.dst == ipv4`
exists | `http.uri == EXISTS!`, `http.uri != EXISTS!`

A `]` ends a `[...]` list, so put a regex that uses brackets outside of a list, for example `host.http == *.example.ru || host.http == /.*[0-9]{6,}\..*/`.
A bare word on the right is a value for string fields, same as the viewer; for other types it is a field if it isn't a valid value, so `port.src == port.dst` compares two fields.
Values for fields that capture keeps in lowercase are lowercased too, so `host.http == WWW.Example.com` works.
{: .mb-0 }

**Differences from the Sessions search bar**
{: .mb-0 #differences-from-the-sessions-search-bar }

* Use a specific field, the `ip`, `host` and `port` groups aren't supported, for example use `ip.src` or `host.http`.
* IPs must be full addresses or cidrs, use `1.2.3.0/24` instead of `1.2.3`, and `ip.dst == 1.2.3.4 && port.dst == 80` instead of `ip.dst == 1.2.3.4:80`.
* Shortcuts (`$name`) aren't supported.
* Only fields capture has can be used, fields only the viewer has, such as `starttime` or `ip.protocol`, aren't available.
* Regex uses PCRE instead of the OpenSearch/Elasticsearch regex syntax, simple patterns work the same.
* Math, comparing two fields and functions are only in rules.

**How fields are matched**
{: .mb-0 }

* A field with several values matches if any of the values match, `http.method == GET` is true when one of the methods is GET.
* `!=` means no value matches, it is the same as `!(a == b)`. A field that isn't set matches `!=` and doesn't match `==`.
* A comparison or function that needs a field that isn't set is false, so under `!` it is true.
* `all()` is false when the field has no values.

**Functions**
{: .mb-0 }

Function | Description
---------|------------
`count(field)` | number of values, same as the `.cnt` fields
`has(field)` | the field has a value
`len(s)` | string length
`lower(s)`, `upper(s)` | change case
`startsWith(s, x)`, `endsWith(s, x)`, `contains(s, x)` | substring tests
`icontains(s, x)` | case insensitive contains
`isPrivate(ip)` | 10/8, 172.16/12, 192.168/16, 100.64/10, 127/8, 169.254/16, fc00::/7, fe80::/10 or ::1
`isMulticast(ip)`, `isV4(ip)`, `isV6(ip)` |
`min(a, b)`, `max(a, b)`, `abs(a)` | numbers
`any(field, condition)` | condition is true for some value of the field, `_` is the value
`all(field, condition)` | condition is true for every value of the field
`bpf("filter")` | the packet matches a bpf filter, sessionSetup rules only

```
  - name: "Scripted clients"
    when: "beforeFinalSave"
    expression: >
      count(host.http) > 5
      || any(http.user-agent, icontains(_, curl) || icontains(_, python))
    ops:
      tags: "scripted"

  - name: "Big uploads"
    when: "beforeFinalSave"
    expression: "databytes.src > 10 * databytes.dst && databytes.src >= 100000000"
    ops:
      tags: "big-upload"
```

**fieldSet expressions**
{: .mb-0 }

A fieldSet expression is checked each time a field it uses without a `!` gets a new value, so the order fields are set in doesn't matter.
Only fields set while capture parses can trigger the check: any field that is saved in the session, `ip.src`, `ip.dst`, `port.src`, `port.dst`, `cert.alt` and the `dns.*` and `host.dns.*` fields.
A fieldSet expression with nothing to trigger on, such as only negations or only fields like `packets.src`, fails to load; use a stage like beforeFinalSave for those.
Matches directly on a field, such as `host.http == [a, *.b]`, only check the rule when one of those values is set.

```
  - name: "Truncate external encrypted"
    when: "fieldSet"
    expression: "protocols == [tls, quic, ssh] && !isPrivate(ip.dst)"
    ops:
      _maxPacketsToSave: 20
```

**Debugging and limits**
{: .mb-0 }

* With `debug=2` capture logs each expression rule's parsed form, its optimized form, the bytecode and, for fieldSet rules, what triggers it.
* Capture logs a warning for an expression that is always true or always false.
* Parentheses, `!` and `-` can be nested 256 deep, and `any()`/`all()` 6 deep.
* Lists can be large, 50,000 values load in well under a second.

**Plugin functions**
{: .mb-0 }

Capture plugins can add their own functions with `arkime_rulesv2_register_function()`, see [capture/RULES.md](https://github.com/arkime/arkime/blob/main/capture/RULES.md) for the details.

### Ops
{: .subsection }

The operations are a map of the fields to set in the session. There are some special field names that set meta data about the session.

**Special field names**
{: .mb-0 }

* `_dontSaveSPI: 1`                 - Don't save SPI data for session, either 0 or 1
* `_maxPacketsToSave: 20`           - Try to save at most 20 packets, max value is 65535. Arkime will sometimes save more packets if it couldn't determine to stop saving packets until later.
* `_minPacketsBeforeSavingSPI: 33`  - Don't save SPI data unless at least 33 packets have been sent/received, max value is 255
* `_dropByDst: 5`                   - (Since 1.5) drop all traffic to dst ip:port for 5 minutes. This is good for dropping traffic that is going to the cloud and has shifting ips.
* `_dropBySrc: 10`                  - (Since 1.5) drop all traffic from src ip:port for 10 minutes. You probably almost never want to use this.
* `_dontCheckYara: 1`               - (Since 1.6) don't check yara for remaining packets of session, either 0 or 1
* `_closeNow: 1`                    - (Since 5.4.1) mark the session to be closed now
* `_flipSrcDst: 1`                  - (Since 5.6.0) flip the src and dst ip/port for the session
* `_maxPackets: 500`                - (Since 6.9.0) override the maxPackets setting for the session, the session is saved and a new one started every 500 packets, max value is 65535


**The following example would not save syn scans, it requires all 3 fields to be set**
{: .mb-0 }

```
  - name: "Drop syn scan"
    when: "beforeFinalSave"
    fields:
      packets.src: 1
      packets.dst: 0
      tcpflags.syn: 1
    ops:
      _dontSaveSPI: 1
```

The `_dropByDst` and `_dropBySrc` are very powerful if you want to drop traffic where the src/dst ips could be ever shifting, such as a host on AWS.
The packets are also dropped very early in the Arkime packet flow, so it can help with cpu.
Here is an example that will start dropping any traffic to a ip that was used to talk to ad.beacon.something.example.com.
Of course if other hosts use that same server from host header sharing that traffic will be dropped too, so be careful.
{: .mb-0 }

```
  - name: "Drop ad beacon"
    when: "fieldSet"
    fields:
      host.http:
      - ad.beacon.something.example.com
      - ad2.beacon.something.example.com
    ops:
      _dontSaveSPI: 1
      _dropByDst: 10
```

### Integer Ops Bounding
{: .subsection }

Since Arkime 4.1.0 it is possible to have operations that only change a value if the value is less than or greater than the new value.
This is useful when you have 2 rules changing the same value, and you want to make sure which rule will be used.
To specify, use `min NEWVALUE` to only change the value if less and `max NEWVALUE` to only change the value if greater.
In the example below, if foo.aol.com is seen, the first rule sets packets to save to 20 no matter what the previous value is, the second rule will NOT override it to 200 since it has the min modifier.
Think of it as doing a `min(current value, 200)` or `min(20, 200)` which would be `20`.

```
  - name: "foo.aol.com"
    when: "fieldSet"
    fields:
      host.http:
        - foo.aol.com
    ops:
      _maxPacketsToSave: 20
  - name: "*.aol.com"
    when: "fieldSet"
    fields:
      host.http,endsWith:
        - .aol.com
    ops:
      _maxPacketsToSave: "min 200"

```

### Logging
{: .subsection }

Since 3.0.0 you can log when a rule is matched using the optional log element.
Since 7.0.0 the log lists each condition that matched and the value it matched, for example `Odd TLS - 10.0.0.1:52925 => 10.0.2.9:8000 - port.dst != [443, 8443], !(ip.dst == [10.0.0.0/8, 192.168.0.0/16]), protocols == tls (tls)`.
Fields rules log `field (value)` for each field that matched, before 7.0.0 they logged `field: value`.
{: .mb-0 }

```
  - name: "Drop ad beacon"
    log: true
    when: "fieldSet"
    fields:
      host.http:
      - ad.beacon.something.example.com
    ops:
      _dropByDst: 10
```

### Special Fields
{: .subsection }

Capture rules supports some special fields that aren't actually written to OpenSearch/Elasticsearch.
They can be used in fields and expression rules.

Field | Description
------|------------
ip.dst:port | The destination ip and port in string format
dst.ip:port | The destination ip and port in string format
tcp.synSet | (since 5.6.0) For the session and all linked session if a syn/syn-ack was received 0 - not set, 1 - src set, 2 - dst set, 3 - both set

### Values from config file
{: .subsection }

Starting with 5.6.0 rules values can come from the config file or environment variables.
Use the new "${varname}" syntax will allow you to have either the config file value of `varname=value` or the environment variable value of `ARKIME_varname=value`.
A whole expression can come from the config file the same way, `expression: "${myRuleExpression}"`.
{: .mb-0 }

For example:
```
  - name: "Drop tls"
    when: "fieldSet"
    fields:
      protocols:
      - tls
      - quic
    ops:
      _maxPacketsToSave: ${maxPacketsToSave}
```


</div>

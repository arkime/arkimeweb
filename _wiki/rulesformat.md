---
title: Rules Format
layout: wiki
permalink: "/rulesformat"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Rules Format

---

Rules files allow you to specify actions to perform when criteria are met with certain fields or state. The rules files are in yaml format and are specified in the config.ini using `rulesFiles=` setting. There can be multiple files using a semicolon separated listed. Each file can have multiple rules. The files will automatically reloaded when they are changed, you do NOT need to restart capture.

Check out some [rules example files](rules) for inspiration, or add your rule file to help out others!

**Each rule must have a**
{: .mb-0 }

* name - friendly name
* when - when is the rule checked
* ops - A set of operations to perform

**A rule then must also have one of the following**
{: .mb-0 }

* fields - what fields to check
* bpf - A bpf expression

Sample rule that will drop all tls packets after the first 20 packets
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
    ops:
      _maxPacketsToSave: 20
```

If you want to add several rules, then the synatax is as follows. Make sure to have only one "rules:" per file.

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


---

## When

**Possible values for the when field, only available when using a field check:**
{: .mb-0 }

* sessionSetup     - Check just during the first few packets of a session.
* afterClassify    - Check after the session has run thru the classifiers
* fieldSet         - Check when ever a field has been set
* beforeMiddleSave - Check before doing a mid save
* beforeFinalSave  - Check before doing a final save
* beforeBothSave   - Check before either a mid or final save

**Possible values for the when field, only available when using a bpf check:**
{: .mb-0 }

* sessionSetup     - Check just during the first few packets of a session. The config settings dontSaveBPFs and minPacketsSaveBPFs are converted to sessionSetup rules.
* everyPacket      - Check after every packet

---

## Fields
A map of field expressions and values for each field, one value from each field expression must be set. Currently not all field expressions are supported, but will be added over time.

The following example would require that the protocols field is set to tls and that host.http was set to one of the 3 values. If those two fields are set, then it will add tlsrulestest to the protocols field.
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

---

## Ops
The operations are a map of the fields to set in the session. There are some special field names that set meta data about the session.

**Special field names**
{: .mb-0 }

* `_dontSaveSPI: 1`                 - Don't save SPI data for session
* `_maxPacketsToSave: 20`           - Don't save more then 20 packets
* `_minPacketsBeforeSavingSPI: 33`  - Don't save SPI data unless 33 many packets have been sent/received
* `_dropByDst: 5`                  - (Since 1.5) drop all traffic to dst ip:port for 5 minutes. This is good for dropping traffic that is going to the cloud and has shifting ips.
* `_dropBySrc: 10`                  - (Since 1.5) drop all traffic from src ip:port for 10 minutes. You probably almost never want to use this.
* `_dontCheckYara: 1`               - (Since 1.6) don't check yara for remaining packets of session


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

</div>

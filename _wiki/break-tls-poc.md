---
title: Break TLS Proof of concept
layout: wiki
permalink: /break-tls-poc
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Break TLS Proof of concept
{: .section-header.mt-1 }

We've been interested in breaking TLS for certain types of traffic and sending thru our visibility stack for a while now.
Here is a proof of concept we've put together to meet our requirements.

Our Requirements:
* No new hardware
* Only break certain TLS connections
* Both the normal traffic and decrypted traffic must flow thru our visibility stack (arkime, suricata, zeek, ...)
* Don't want to run multiple of each tool on each box
* Each visibility box can only have 1 connection to the NPB

Our POC Solution:
* Use the SRX that we already have. The SRX does NOT modify the 5 tuple of the decrypted traffic, so if tools get both the decrypted and normal version of the traffic they may become confused.
* The SRX can be configure to only break certain TLS connections, for the POC we configured a few sites to break by hostname, but the SRX supports categories and other methods.
* We did NOT push out new roots to folks. If they visit one of the configured decrypted sites, the browser will warn them that it is insecure.

![Break TLS POC](/assets/break-tls-poc.png)


1. The SRX will send traffic to the NPB that it has decrypted. The NPB will also receive traffic normally from the SPAN port.
2. The NPB will add a vlan tag (4000 in our POC) to traffic coming in on the connection to the SRX
3. The NPB will forward both the normal traffic and the decrypted traffic to the local visibility hosts
4. The local visibility host will need to change tool configs to ignore vlan 4000 (bpf = not vlan 4000). This may mean you can't use afpacket.
5. The local visibility host has a openvpn tunnel to a centralized remote visibility host. On the local host we created a eth1.4000 interface and then bridged that interface to the openvpn tap1 interface.
6. The central remote visibility host has all its tools listening on tap1 interface

Pros:
* The decrypted traffic can be stored more securely on a central box with difference access controls
* Don't have to setup a second set of tools on each box

Cons:
* Might have been easier to setup a vm or something on each visibility host
* Arkime and other tools can't show you which site the traffic came from using the visibility hostname
* Need to configure npb or tools to ignore the traffic from local hosts to central visibility hosts or you will process again

Other Solutions:
* Setup different machines (or VMs) in each location for normal vs decrypted traffic
* Connect multiple interfaces on visibility machines to NPB for normal vs decrypted traffic instead of using vlan

## Sample Configs
{: .subsection-header }

These are the configs we used for this POC.

You'll notice that there are no routes/iptables setup anywhere, and there shouldn't be.
Remember, we are using openvpn to just forward our mirrored traffic from one host to another for processing.
The traffic gets to the VPN tap1 interface because of the bridge that just copies everything from eth1.4000 to tap1 on the local machine.

In this POC for the VPN we are using TCP and not UDP.
We don't need to worry about traffic retransmits from using TCP because this is a mirror of the real traffic.
We should probably do more testing on TCP vs UDP for this use case.

### How to setup a vlan interface - /etc/sysconfig/network-scripts/ifcfg-eth1.4000
{: .subsection }

```
{% raw %}
DEVICE={{visibility_interface}}.4000
BOOTPROTO=none
ONBOOT=yes
NM_CONTROLLED=no
VLAN=yes
{% endraw %}
```

### Setup client side openvpn
{: .subsection }

```
{% raw %}
#!/bin/sh
openvpn --mktun --dev tap1
ifconfig tap1 up
ifconfig tap1 mtu 2048
brctl addbr br1
brctl addif br1 tap1
brctl addif br1 {{visibility_interface}}.4000
ifconfig br1 up
{% endraw %}
```

### Client side /etc/openvpn/client/tap1.conf
{: .subsection }

We decided to use tcp/tls to connect to the tls visibility server and we used public certs since every host already had one.
For a real deployment you might not want to use public certs.

```
{% raw %}
verb 3
dev tap1
remote {{openvpn_remote}}
cipher AES-256-CBC
port 443

tls-client
ca /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
cert {{openvpn_cert}}
key {{openvpn_key}}

proto tcp-client
persist-tun
persist-key

link-mtu 2048
{% endraw %}
```

### Server side /etc/openvpn/server/tap1.conf
{: .subsection }

Because we are using public certs we set verify-x509-name.

```
{% raw %}
verb 3
mode server
dev tap1
cipher AES-256-CBC
port 443

tls-server
dh dh2048.pem
ca /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
cert {{openvpn_cert}}
key {{openvpn_key}}
duplicate-cn

proto tcp-server
# user nobody
# group nobody
persist-tun
persist-key
verify-x509-name {{openvpn_verify_name}}

ping 30
{% endraw %}
```

</div>

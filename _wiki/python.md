---
title: Python
layout: wiki
permalink: "/python"
copyLink: True
---


<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Python
{: .section-header.mt-1 }

Starting with version 6, Arkime now support Python scripting for custom processing of packets and sessions.
This allows you to write custom classifiers and parsers in Python.
The Python support in Arkime requires Python 3.12 or newer, so it may not be available with older linux distributions.
Use the setting <code>disablePython=true</code> to disable Python support in Arkime.

<strong>Currently Python support is unavailable in the AL2023, Ubuntu 22, and Debian 12 Arkime packages.</strong>

# Python Arkime Module

The Python Arkime module has high level methods to register callbacks for packet processing.

## Constants
 * VERSION : String - The Arkime version as a string
 * CONFIG_PREFIX : String - The Arkime install prefix, usually /opt/arkime
 * API_VERSION : Integer - The Arkime API version from arkime.h

### PortKind - The PortKind for register_port_classifier. Bitwise OR the values together to match multiple ports.
 * PORT_UDP_SRC : Integer - Match on udp src port
 * PORT_UDP_DST : Integer - Match on udp dst port
 * PORT_TCP_SRC : Integer - Match on tcp src port
 * PORT_TCP_DST : Integer - Match on tcp dst port
 * PORT_SCTP_SRC : Integer - Match on sctp src port
 * PORT_SCTP_DST : Integer - Match on sctp dst port

## Callbacks

### classifyCb(session, packetBytes, packetLen, direction)
This callback is called for the first packet of a session in each direction that matches the tcp/udp/port registered classifiers.
The callback should look at the bytes and see if it understand the protocol.
If it does it will usually call the arkime_session.ad_protocol and/or arkime_session.register_parser methods.

* session: The opaque session object, used with any arkime_session module methods.
* packetBytes: The memory view of the packet bytes; only valid during the callback.
* packetLen: The length of the packet.
* direction: The direction of the packet, 0 for client to server, 1 for server to client.

### long parserCb(session, packetBytes, packetLen, direction)
This callback is called for the every packet of a session in each direction where the callback has been registered using arkime_session.register_parser.
Return -1 to unregister the parser for the session, 0 is normal case or positive value for the number of bytes consume if this protocol wraps others (rare).

* session: The opaque session object, used with any arkime_session module methods.
* packetBytes: The memory view of the packet bytes; only valid during the callback.
* packetLen: The length of the packet.
* direction: The direction of the packet, 0 for client to server, 1 for server to client.

### saveCb(session, final)
This callback is used for both pre_save and save callbacks. 

* session: The opaque session object, used with any arkime_session module methods.
* final: True if this is the final session save callback, False if there are more linked sessions.

## Methods

### fieldPos field_define(fieldExpression, fieldDefinition)

Create a new field that can be used in sessions.
This method returns a fieldPosition that can be used in other calls for faster field access.

* fieldExpression: The expression used in viewer to access the field
* fieldDefinition: The definition of the field from [custom-fields](https://arkime.com/settings#custom-fields)

### fieldPos field_get(fieldExpression)

Retrieve the field position for a field expression.

* fieldExpression: The expression used in viewer to access the field

### register_port_classifier(name, port, portKind, classifyCb)

Register a classifier that matchs on a specific port and protocol type.
This usually isn't recommended since most protocols can run on any port.

* name: The short name of the classifier, used internally to identify the classifier.
* port: The IP port to match on.
* portKind: Bitwise OR the values from the PortKind constants to match on.
* classifyCb: The callback to call when the classifier matches.

### register_pre_save(saveCb)
* saveCb: The callback to call when the session is going to be saved to the database but before some hosekeeping is done, such as running the save rules.

### register_tcp_classifier(name, matchOffset, matchBytes, classifyCb)

Register a TCP classifier that will call the classifyCb callback for the first packet of a session in each direction that matches the matchBytes starting at the matchOffset.

* name: The short name of the classifier, used internally to identify the classifier.
* matchOffset: The byte offset in the packet where the matchBytes should be found.
* matchBytes: The bytes to match in the packet.
* classifyCb: The callback to call when the classifier matches.

### register_udp_classifier(name, matchOffset, matchBytes, classifyCb)

Register a UDP classifier that will call the classifyCb callback for the first packet of a session in each direction that matches the matchBytes starting at the matchOffset.

* name: The short name of the classifier, used internally to identify the classifier.
* matchOffset: The byte offset in the packet where the matchBytes should be found.
* matchBytes: The bytes to match in the packet.
* classifyCb: The callback to call when the classifier matches.

### register_sctp_classifier(name, matchOffset, matchBytes, classifyCb)

Register a SCTP classifier that will call the classifyCb callback for the first packet of a session in each direction that matches the matchBytes starting at the matchOffset.

* name: The short name of the classifier, used internally to identify the classifier.
* matchOffset: The byte offset in the packet where the matchBytes should be found.
* matchBytes: The bytes to match in the packet.
* classifyCb: The callback to call when the classifier matches. The which field will contain the direction AND sctp stream id. Arkime will send full messages to the callback.

### register_sctp_protocol_classifier(name, protocol, classifyCb)

Register a SCTP protocol classifier that will call the classifyCb callback for the first packet of a session in each direction that matches the protocolId in the SCTP header.

* name: The short name of the classifier, used internally to identify the classifier.
* protocol: The protocol id in the SCTP header to match.
* classifyCb: The callback to call when the classifier matches. The which field will contain the direction AND sctp stream id. Arkime will send full messages to the callback.

### register_save(saveCb)
* saveCb: The callback to call when the session is being saved to the database.

## Variables

### CONFIG_PREFIX

The Arkime install prefix, usually /opt/arkime

### VERSION

The Arkime version as a string

# Python Arkime Session Module

The Python Arkime Session module has methods for dealing with sessions.
The API is very unpythonic and treats the session as a opaque object that needs to be passed around.

## Methods


### add_int(session, fieldPosOrExp, value)

Add an integer value to a session field.

* session: The session object from the classifyCb or parserCb.
* fieldPosOrExp: The field position returned by field_define/field_get or the field expression
* value: The integer value to add to the session field.

### add_protocol(session, protocol)
Optimized version of add_string(session, "protocol", protocol).

* session: The session object from the classifyCb or parserCb.
* protocol: The protocol string to add to the session.


### add_string(session, fieldPosOrExp, value)
Add an string value to a session field.

* session: The session object from the classifyCb or parserCb.
* fieldPosOrExp: The field position returned by field_define/field_get or the field expression
* value: The string value to add to the session field.

### add_tag(session, tag)

Optimized version of add_string(session, "tags", tag).

* session: The session object from the classifyCb or parserCb.
* tag: The tag string to add to the session.

### decref(session)
Decrement the reference count of a session.

* session: The session object from the classifyCb or parserCb.

### get(session, fieldPosOrExp)
Retrieve the value of a session field. Can be a list of values or a single value depending on the field.

* session: The session object from the classifyCb or parserCb.
* fieldPosOrExp: The field position returned by field_define/field_get or the field expression

### has_protocol(session, protocol)
Optimized version of get(session, "protocol") and checking if the list contains the protocol.

* session: The session object from the classifyCb or parserCb.
* protocol: The protocol string to check for in the session.

### incref(session)
Increment the reference count of a session.

* session: The session object from the classifyCb or parserCb.

### register_parser(session, parserCb)
* session: The session object from the classifyCb or parserCb.
* parserCb: The callback to call for every packet of the session in each direction.

# Python Arkime Packet Module

The Python Arkime Packet module has methods for dealing with packets before they are associated with sessions.
The API is very unpythonic and treats the packet as a opaque object that needs to be passed around.

## Constants

### PacketRC
The return values for a packetCb callback.
 * DO_PROCESS : Integer - Process the packet normally
 * CORRUPT : Integer - The packet is corrupt
 * UNKNOWN : Integer - The packet is unknown and can't be processed
 * DONT_PROCESS : Integer - The packet should not be processed but can be freed
 * DONT_PROCESS_OR_FREE : Integer - The packet should not be processed and should not be freed

## Callbacks

### PacketRC packetCb(batch, packet, packetBytes, packetLen)
This callback is called for packets by the reader threads that the Python script has registered for.
Usually some basic processing is done and then the run_ethernet_cb or run_ip_cb methods are called to process the packet.
The callback should return the results from the run calls or one of the ARKIME_PACKET_* values.

* batch: The opaque batch object
* packet: The opaque patch object
* packetBytes: The memory view of the packet bytes; only valid during the callback.
* packetLen: The length of the packet.

## Methods

### get(packet, field)
Retrieve the value of a packet field.
* packet: The packet object from the packetCb.
* field: The string field name to retrieve.

### set(packet, field, value)
Set the value of a packet field. Not all fields can be set.
* packet: The packet object from the packetCb.
* field: The string field name to set.
* value: The integer value to set

### set_ethernet_cb(type, packetCb)
Register an ethertype packet callback that will be called for packets of the given type.
Usually this callback with just need to strip some headers and call either run_ip_cb or run_ethernet_cb.
* type: The Ethertype to register the callback for.
* packetCb: The callback to call for packets of the given ethertype.

### set_ip_cb(type, ipCb)
Register an IP protocol packet callback that will be called for packets of the given protocol.
* type: The IP protocol to register the callback for.
* ipCb: The callback to call for packets of the given protocol.

### set_run_ethernet_cb(batch, packet, packetBytes, type, str)
* batch: The opaque batch object
* packet: The opaque patch object
* packetBytes: The memory view of the packet bytes
* type: The Ethertype of the packet now
* str: A string description of the packet now

### set_run_ip_cb(batch, packet, packetBytes, type, str)
* batch: The opaque batch object
* packet: The opaque patch object
* packetBytes: The memory view of the packet bytes
* type: The ip protocol of the packet now
* str: A string description of the packet now

## Example

Create a <code>/opt/arkime/parsers/example.py</code> file with the following content:

```python
import arkime
import arkime_session
import arkime_packet
import sys

def my_parsers_cb(session, bytes, len, which):
    # Write code here to parse the bytes and extract information
    print("PARSER:", arkime_session.get(session, "ip.src"), ":", arkime_session.get(session, "port.src"), "->", arkime_session.get(session, "ip.dst"), ":", arkime_session.get(session, "port.dst"), "len", len, "which", which)

    # then you could set a field
    # arkime_session.add_string(session, pos, "my value")

    # A parser should return -1 to unregister itself, 0 to continue parsing
    return 0

def my_classify_callback(session, bytes, len, which):
    print("CLASSIFY:", arkime_session.get(session, "ip.src"), ":", arkime_session.get(session, "port.src"), "->", arkime_session.get(session, "ip.dst"), ":", arkime_session.get(session, "port.dst"), "len", len, "which", which)

    # Example of adding a tag
    arkime_session.add_tag(session, "python")

    # Do some kind of check to see if you want to classify this session, if so register
    arkime_session.register_parser(session, my_parsers_cb)

def my_pre_save_callback(session, final):
    print("PRE SAVE:", arkime_session.get(session, "ip.src"), ":", arkime_session.get(session, "port.src"), "->", arkime_session.get(session, "ip.dst"), ":", arkime_session.get(session, "port.dst"), "final", final)

def my_save_callback(session, final):
    print("SAVE:", arkime_session.get(session, "ip.src"), ":", arkime_session.get(session, "port.src"), "->", arkime_session.get(session, "ip.dst"), ":", arkime_session.get(session, "port.dst"), "final", final)

def my_ethernet_cb(batch, packet, bytes, len):
    print("ETHERNET:", "batch", batch, "packet", "packet", "bytes", bytes, "len", len, "pktlen", arkime_packet.get(packet, "pktlen"))

    # Remove first 18 bytes of ethernet header and run ethernet callback again
    bytes = bytes[18:]
    return arkime_packet.run_ethernet_cb(batch, packet, bytes, 0, "example")


### Start ###
# Register a classifier. This example will match all TCP sessions
arkime.register_tcp_classifier("test", 0, bytes("", "ascii"), my_classify_callback)
arkime.register_pre_save(my_pre_save_callback)
arkime.register_save(my_save_callback)

arkime_packet.set_ethernet_cb(0xff12, my_ethernet_cb)

# Create a new field in the session we will be setting
pos = arkime.field_define("arkime_rulz", "kind:lotermfield;db:arkime_rulz")

print("VERSION", arkime.VERSION, "CONFIG_PREFIX", arkime.CONFIG_PREFIX, "POS", pos)
```
</div>

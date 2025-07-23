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
The Python support in Arkime requires Python 3.12 or newer, so it may not be enabled with old linux distributions.
Use the setting <code>disablePython=true</code> true to disable Python support in Arkime.

<strong>Currently Python support is disabled in the AL2023, Ubuntu 22, and Debian 12 Arkime packages.</strong>

# Python Arkime Module

The Python Arkime module has high level methods to register callbacks for packet processing.


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

## Methods

### fieldPos field_define(fieldExpression, fieldDefinition)

Create a new field that can be used in sessions.
This method returns a fieldPosition that can be used in other calls for faster field access.

* fieldExpression: The expression used in viewer to access the field
* fieldDefinition: The definition of the field from [custom-fields](https://arkime.com/settings#custom-fields)

### fieldPos field_get(fieldExpression)

Retrieve the field position for a field expression.

* fieldExpression: The expression used in viewer to access the field

### register_port_classifier(name, port, type, classifyCb)

Register a classifier that matchs on a specific port and protocol type.
This usually isn't recommended since most protocols can run on any port.

* name: The short name of the classifier, used internally to identify the classifier.
* port: The IP port to match on.
* type: Or the following values:
  * 0x01 - udp src
  * 0x02 - udp dst
  * 0x04 - tcp src
  * 0x08 0 tcp dst
* classifyCb: The callback to call when the classifier matches.

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

</div>

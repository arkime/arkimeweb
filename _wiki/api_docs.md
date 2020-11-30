<a name="buildQuery"></a>

## buildQuery
POST/GET - /api/buildQuery

Builds an elasticsearch session query and returns the query and the elasticsearch indices to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | The elasticsearch query |
| indices | <code>object</code> | The elasticsearch indices that contain sessions in this query |

<a name="sessions"></a>

## sessions
POST/GET - /api/sessions

Builds an elasticsearch session query. Gets a list of sessions and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code> | The data to populate the sessions map |
| graph | <code>object</code> | The data to populate the sessions timeline graph |
| data | <code>array</code> | The list of sessions with the requested fields |
| recordsTotal | <code>number</code> | The total number of files Arkime knows about |
| recordsFiltered | <code>number</code> | The number of files returned in this result |
| health | <code>object</code> | The elasticsearch cluster health status and info |

<a name="sessions/csv"></a>

## sessions/csv
POST/GET - /api/sessions/csv

Builds an elasticsearch session query. Gets a list of sessions and returns them as CSV to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| csv | <code>string</code> | The csv with the sessions requested |

<a name="spiview"></a>

## spiview
POST/GET - /api/spiview

Builds an elasticsearch session query. Gets a list of field values with counts and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| spi | <code>string</code> |  | Comma separated list of db fields to return. Optionally can be followed by :{count} to specify the number of values returned for the field (defaults to 100). |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code> | The data to populate the sessions map |
| graph | <code>object</code> | The data to populate the sessions timeline graph |
| spi | <code>object</code> | The list of spi fields with values and counts |
| protocols | <code>object</code> | The list of protocols with counts |
| recordsTotal | <code>number</code> | The total number of files Arkime knows about |
| recordsFiltered | <code>number</code> | The number of files returned in this result |
| health | <code>object</code> | The elasticsearch cluster health status and info |

<a name="spigraph"></a>

## spigraph
POST/GET - /api/spigraph

Builds an elasticsearch session query. Gets a list of values for a field with counts and graph data and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| field | <code>string</code> | <code>&quot;node&quot;</code> | The database field to get data for. Defaults to "node". |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code> | The data to populate the main/aggregate spigraph sessions map |
| graph | <code>object</code> | The data to populate the main/aggregate spigraph sessions timeline graph |
| items | <code>array</code> | The list of field values with their corresponding timeline graph and map data |
| recordsTotal | <code>number</code> | The total number of files Arkime knows about |
| recordsFiltered | <code>number</code> | The number of files returned in this result |
| health | <code>object</code> | The elasticsearch cluster health status and info |

<a name="spigraphhierarchy"></a>

## spigraphhierarchy
POST/GET - /api/spigraphhierarchy

Builds an elasticsearch session query. Gets a list of values for each field with counts and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| exp | <code>string</code> |  | Comma separated list of db fields to populate the graph/table. |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| hierarchicalResults | <code>object</code> | The nested data to populate the treemap or pie |
| tableResults | <code>array</code> | The list data to populate the table |

<a name="unique"></a>

## unique
POST/GET - /api/unique

Builds an elasticsearch session query. Gets a list of unique field values (with or without counts) and sends them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with he list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| exp | <code>string</code> |  | Comma separated list of expression field names to return. |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:     'first' - First Packet: the timestamp of the first packet received for the session.     'last' - Last Packet: The timestamp of the last packet received for the session.     'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.     'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.     'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> | The list of unique fields (with counts if requested) |

<a name="multiunique"></a>

## multiunique
POST/GET - /api/multiunique

Builds an elasticsearch session query. Gets an intersection of unique field values (with or without counts) and sends them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with he list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| exp | <code>string</code> |  | The expression field to return unique data for. Either exp or field is required, field is given priority if both are present. |
| field | <code>string</code> |  | The database field to return unique data for. Either exp or field is required, field is given priority if both are present. |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> | The list of an intersection of unique fields (with counts if requested) |

<a name="_nodeName/session/_id/detail"></a>

## :nodeName/session/:id/detail
GET - /api/:nodeName/session/:id/detail

Gets SPI data for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>html</code> | The html to display as session detail |

<a name="_nodeName/session/_id/packets"></a>

## :nodeName/session/:id/packets
GET - /api/:nodeName/session/:id/packets

Gets packets for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>html</code> | The html to display as session packets |

<a name="sessions/addTags"></a>

## sessions/addTags
POST - /api/sessions/addTags

Add tag(s) to individual session(s) by id or by query.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tags | <code>string</code> |  | Comma separated list of tags to add to session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to add tag(s) to |
| segments | <code>string</code> | <code>&quot;no&quot;</code> | Whether to add tags to linked session segments. Default is no. Options include:      no - Don't add tags to linked segments      all - Add tags to all linked segments      time - Add tags to segments occurring in the same time period |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code> | Whether the add tags operation was successful |
| text | <code>string</code> | The success/error message to (optionally) display to the user |

<a name="sessions/removeTags"></a>

## sessions/removeTags
POST - /api/sessions/removeTags

Removes tag(s) from individual session(s) by id or by query.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tags | <code>string</code> |  | Comma separated list of tags to remove from session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to remove tag(s) from |
| segments | <code>string</code> | <code>&quot;no&quot;</code> | Whether to remove tags from linked session segments. Default is no. Options include:      no - Don't remove tags from linked segments      all - Remove tags from all linked segments      time - Remove tags from segments occurring in the same time period |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code> | Whether the remove tags operation was successful |
| text | <code>string</code> | The success/error message to (optionally) display to the user |

<a name="connections"></a>

## connections
POST/GET - /api/connections

Builds an elasticsearch connections query. Gets a list of nodes and links and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| srcField | <code>string</code> | <code>&quot;ip.src&quot;</code> | The source database field name |
| dstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The destination database field name |
| expression | <code>string</code> |  | The search expression string |
| length | <code>number</code> | <code>5000</code> | The number of items to return. Defaults to 5000, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is totBytes,totDataBytes,totPackets,node |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |
| baselineDate | <code>number</code> | <code>0</code> | The baseline date range to compare connections against. Default is 0, disabled. Options include:      1x - 1 times query range.      2x - 2 times query range.      4x - 4 times query range.      6x - 6 times query range.      8x - 8 times query range.      10x - 10 times query range.      1 - 1 hour.      6 - 6 hours.      24 - 1 day.      48 - 2 days.      72 - 3 days.      168 - 1 week.      336 - 2 weeks.      720 - 1 month.      1440 - 2 months.      4380 - 6 months.      8760 - 1 year. |
| baselineVis | <code>string</code> | <code>&quot;all&quot;</code> | Which connections to display when a baseline date range is applied. Default is all. Options include:      'all' - All Nodes: all nodes are visible.      'actual' - Actual Nodes: nodes present in the "current" timeframe query results are visible.      'actualold' - Baseline Nodes: nodes present in the "baseline" timeframe query results are visible.      'new' - New Nodes Only: nodes present in the "current" but NOT the "baseline" timeframe are visible.      'old' - Baseline Nodes Only: nodes present in the "baseline" but NOT the "current" timeframe are visible. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| links | <code>array</code> | The list of links |
| links | <code>array</code> | The list of nodes |
| health | <code>object</code> | The elasticsearch cluster health status and info |

<a name="connections/csv"></a>

## connections/csv
POST/GET - /api/connections/csv

Builds an elasticsearch connections query. Gets a list of nodes and links in csv format and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| srcField | <code>string</code> | <code>&quot;ip.src&quot;</code> | The source database field name |
| dstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The destination database field name |
| expression | <code>string</code> |  | The search expression string |
| length | <code>number</code> | <code>5000</code> | The number of items to return. Defaults to 5000, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> | The csv with the connections requested |

<a name="fields"></a>

## fields
GET - /api/fields

Gets available database field objects pertaining to sessions.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>boolean</code> | <code>false</code> | Whether to return an array of fields, otherwise returns a map |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>array/map</code> | The map or list of database fields |

<a name="files"></a>

## files
GET - /api/files

Gets a list of PCAP files that Arkime knows about.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 500, Max is 10,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | The list of files |
| recordsTotal | <code>number</code> | The total number of files Arkime knows about |
| recordsFiltered | <code>number</code> | The number of files returned in this result |

<a name="eshealth"></a>

## eshealth
GET - /api/eshealth

Retrive Elasticsearch health and stats

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| active_primary_shards | <code>number</code> |  |
| active_shards | <code>number</code> |  |
| active_shards_percent_as_number | <code>number</code> |  |
| cluster_name | <code>string</code> | The name of the arkime cluster |
| delayed_unassigned_shards | <code>number</code> |  |
| initializing_shards | <code>number</code> |  |
| molochDbVersion | <code>number</code> | The arkime database version |
| number_of_data_nodes | <code>number</code> |  |
| number_of_in_flight_fetch | <code>number</code> |  |
| number_of_nodes | <code>number</code> |  |
| number_of_pending_tasks | <code>number</code> |  |
| relocating_shards | <code>number</code> |  |
| status | <code>string</code> |  |
| task_max_waiting_in_queue_millis | <code>number</code> |  |
| timed_out | <code>boolean</code> |  |
| unassigned_shards | <code>number</code> |  |
| version | <code>string</code> | the elasticsearch version number |
| _timeStamp | <code>number</code> | timestamps in ms from unix epoc |

<a name="sessions/pcap"></a>

## sessions/pcap
GET - /api/sessions/pcap

Retrieve the raw session data in pcap format


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ids | <code>string</code> |  | The list of ids to return |
| segments | <code>boolean</code> | <code>false</code> | When set return linked segments |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1 |
| expression | <code>string</code> |  | The search expression string |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. Defaults to 0 |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 100, Max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| view | <code>string</code> |  | The view name to apply before the expression. |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:    'first' - First Packet: the timestamp of the first packet received for the session.    'last' - Last Packet: The timestamp of the last packet received for the session.    'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.    'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.    'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code> | A PCAP file with the sessions requested |


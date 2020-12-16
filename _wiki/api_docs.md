<a name="/connections"></a>

## /connections API

POST/GET - /api/connections

Builds an elasticsearch connections query. Gets a list of nodes and links and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| srcField | <code>string</code> | <code>&quot;ip.src&quot;</code> | The source database field name |
| dstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The destination database field name |
| baselineDate | <code>number</code> | <code>0</code> | The baseline date range to compare connections against. Default is 0, disabled. Options include:      1x - 1 times query range.      2x - 2 times query range.      4x - 4 times query range.      6x - 6 times query range.      8x - 8 times query range.      10x - 10 times query range.      1 - 1 hour.      6 - 6 hours.      24 - 1 day.      48 - 2 days.      72 - 3 days.      168 - 1 week.      336 - 2 weeks.      720 - 1 month.      1440 - 2 months.      4380 - 6 months.      8760 - 1 year. |
| baselineVis | <code>string</code> | <code>&quot;all&quot;</code> | Which connections to display when a baseline date range is applied. Default is all. Options include:      'all' - All Nodes: all nodes are visible.      'actual' - Actual Nodes: nodes present in the "current" timeframe query results are visible.      'actualold' - Baseline Nodes: nodes present in the "baseline" timeframe query results are visible.      'new' - New Nodes Only: nodes present in the "current" but NOT the "baseline" timeframe are visible.      'old' - Baseline Nodes Only: nodes present in the "baseline" but NOT the "current" timeframe are visible. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| links | <code>array</code>| The list of links |
| nodes | <code>array</code>| The list of nodes |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

<a name="/connections/csv"></a>

## /connections/csv API

POST/GET - /api/connections/csv OR /api/connections.csv

Builds an elasticsearch connections query. Gets a list of nodes and links in csv format and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| srcField | <code>string</code> | <code>&quot;ip.src&quot;</code> | The source database field name |
| dstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The destination database field name |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| csv | <code>csv</code>| The csv with the connections requested |

<a name="/buildquery"></a>

## /buildquery API

POST/GET - /api/buildquery

Builds an elasticsearch session query and returns the query and the elasticsearch indices to the client.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code>| The elasticsearch query |
| indices | <code>object</code>| The elasticsearch indices that contain sessions in this query |

<a name="/sessions"></a>

## /sessions API

POST/GET - /api/sessions

Builds an elasticsearch session query. Gets a list of sessions and returns them to the client.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the sessions map |
| graph | <code>object</code>| The data to populate the sessions timeline graph |
| data | <code>array</code>| The list of sessions with the requested fields |
| recordsTotal | <code>number</code>| The total number of files Arkime knows about |
| recordsFiltered | <code>number</code>| The number of files returned in this result |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

<a name="/sessions/csv"></a>

## /sessions/csv API

POST/GET - /api/sessions/csv OR /api/sessions.csv

Builds an elasticsearch session query. Gets a list of sessions and returns them as CSV to the client.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| csv | <code>csv</code>| The csv with the sessions requested |

<a name="/spiview"></a>

## /spiview API

POST/GET - /api/spiview

Builds an elasticsearch session query. Gets a list of field values with counts and returns them to the client.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |
| spi | <code>string</code> | Comma separated list of db fields to return. Optionally can be followed by :{count} to specify the number of values returned for the field (defaults to 100). |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the sessions map |
| graph | <code>object</code>| The data to populate the sessions timeline graph |
| spi | <code>object</code>| The list of spi fields with values and counts |
| protocols | <code>object</code>| The list of protocols with counts |
| recordsTotal | <code>number</code>| The total number of files Arkime knows about |
| recordsFiltered | <code>number</code>| The number of files returned in this result |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

<a name="/spigraph"></a>

## /spigraph API

POST/GET - /api/spigraph

Builds an elasticsearch session query. Gets a list of values for a field with counts and graph data and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| field | <code>string</code> | <code>&quot;node&quot;</code> | The database field to get data for. Defaults to "node". |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the main/aggregate spigraph sessions map |
| graph | <code>object</code>| The data to populate the main/aggregate spigraph sessions timeline graph |
| items | <code>array</code>| The list of field values with their corresponding timeline graph and map data |
| recordsTotal | <code>number</code>| The total number of files Arkime knows about |
| recordsFiltered | <code>number</code>| The number of files returned in this result |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

<a name="/spigraphhierarchy"></a>

## /spigraphhierarchy API

POST/GET - /api/spigraphhierarchy

Builds an elasticsearch session query. Gets a list of values for each field with counts and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| exp | <code>string</code> |  | Comma separated list of db fields to populate the graph/table. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| hierarchicalResults | <code>object</code>| The nested data to populate the treemap or pie |
| tableResults | <code>array</code>| The list data to populate the table |

<a name="/unique"></a>

## /unique API

POST/GET - /api/unique

Builds an elasticsearch session query. Gets a list of unique field values (with or without counts) and sends them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with he list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| exp | <code>string</code> |  | Comma separated list of expression field names to return. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The list of unique fields (with counts if requested) |

<a name="/multiunique"></a>

## /multiunique API

POST/GET - /api/multiunique

Builds an elasticsearch session query. Gets an intersection of unique field values (with or without counts) and sends them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with he list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| exp | <code>string</code> |  | The expression field to return unique data for. Either exp or field is required, field is given priority if both are present. |
| field | <code>string</code> |  | The database field to return unique data for. Either exp or field is required, field is given priority if both are present. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The list of an intersection of unique fields (with counts if requested) |

<a name="/session/_nodeName/_id/detail"></a>

## /session/:nodeName/:id/detail API

GET - /api/session/:nodeName/:id/detail

Gets SPI data for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>html</code>| The html to display as session detail |

<a name="/session/_nodeName/_id/packets"></a>

## /session/:nodeName/:id/packets API

GET - /api/session/:nodeName/:id/packets

Gets packets for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>html</code>| The html to display as session packets |

<a name="/sessions/addtags"></a>

## /sessions/addtags API

POST - /api/sessions/addtags

Add tag(s) to individual session(s) by id or by query.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| tags | <code>string</code> |  | Comma separated list of tags to add to session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to add tag(s) to |
| segments | <code>string</code> | <code>&quot;no&quot;</code> | Whether to add tags to linked session segments. Default is no. Options include:      no - Don't add tags to linked segments      all - Add tags to all linked segments      time - Add tags to segments occurring in the same time period |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the add tags operation was successful |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/sessions/removetags"></a>

## /sessions/removetags API

POST - /api/sessions/removetags

Removes tag(s) from individual session(s) by id or by query.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| tags | <code>string</code> |  | Comma separated list of tags to remove from session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to remove tag(s) from |
| segments | <code>string</code> | <code>&quot;no&quot;</code> | Whether to remove tags from linked session segments. Default is no. Options include:      no - Don't remove tags from linked segments      all - Remove tags from all linked segments      time - Remove tags from segments occurring in the same time period |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the remove tags operation was successful |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/session/_nodeName/_id/body/_bodyType/_bodyNum/_bodyName"></a>

## /session/:nodeName/:id/body/:bodyType/:bodyNum/:bodyName API

GET - /api/session/:nodeName/:id/body/:bodyType/:bodyNum/:bodyName

Retrieves a file that was transferred in a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| file | <code>file</code>| The file in the session |

<a name="/session/_nodeName/_id/bodypng/_bodyType/_bodyNum/_bodyName"></a>

## /session/:nodeName/:id/bodypng/:bodyType/:bodyNum/:bodyName API

GET - /api/session/:nodeName/:id/bodypng/:bodyType/:bodyNum/:bodyName

Retrieves a bitmap image representation of the bytes in a file.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| image | <code>image/png</code>| The bitmap image. |

<a name="/sessions/pcap"></a>

## /sessions/pcap API

GET - /api/sessions/pcap OR /api/sessions.pcap

Retrieve the raw session data in pcap format.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| ids | <code>string</code> |  | The list of ids to return |
| segments | <code>boolean</code> | <code>false</code> | When set return linked segments |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAP file with the sessions requested |

<a name="/sessions/pcapng"></a>

## /sessions/pcapng API

GET - /api/sessions/pcapng OR /api/sessions.pcapng

Retrieve the raw session data in pcapng format.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) |  | The request query to filter sessions |
| ids | <code>string</code> |  | The list of ids to return |
| segments | <code>boolean</code> | <code>false</code> | When set return linked segments |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAPNG file with the sessions requested |

<a name="/session/_nodeName/_id/pcap"></a>

## /session/:nodeName/:id/pcap API

GET - /api/session/:nodeName/:id/pcap OR /api/session/:nodeName/:id.pcap

Retrieve the raw session data in pcap format from a specific node.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAP file with the session requested |

<a name="/session/_nodeName/_id/pcapng"></a>

## /session/:nodeName/:id/pcapng API

GET - /api/session/:nodeName/:id/pcapng OR /api/session/:nodeName/:id.pcapng

Retrieve the raw session data in pcapng format from a specific node.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAPNG file with the session requested |

<a name="/session/entire/_nodeName/_id/pcap"></a>

## /session/entire/:nodeName/:id/pcap API

GET - /api/session/entire/:nodeName/:id/pcap OR /api/session/entire/:nodeName/:id.pcap

Retrieve the entire pcap for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAP file with the session requested |

<a name="/session/raw/_nodeName/_id/png"></a>

## /session/raw/:nodeName/:id/png API

GET - /api/session/raw/:nodeName/:id/png OR /api/session/raw/:nodeName/:id.png

Retrieve a bitmap image representation of packets in a session.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;src&quot;</code> | Whether to retrieve the src (source) or dst (desintation) packets bitmap image. Defaults to src. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| image | <code>image/png</code>| The bitmap image. |

<a name="/session/raw/_nodeName/_id"></a>

## /session/raw/:nodeName/:id API

GET - /api/session/raw/:nodeName/:id

Retrieve raw packets for a session.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;src&quot;</code> | Whether to retrieve the src (source) or dst (desintation) raw packets. Defaults to src. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The source or destination packet text. |

<a name="/sessions/bodyhash/_hash"></a>

## /sessions/bodyhash/:hash API

GET - /api/sessions/bodyhash/:hash

Retrieve a file given a hash of that file.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| file | <code>file</code>| The file that matches the hash |

<a name="/session/_nodeName/_id/bodyhash/_hash"></a>

## /session/:nodeName/:id/bodyhash/:hash API

GET - /api/session/:nodeName/:id/bodyhash/:hash

Retrieve a file from a specific node given a hash of that file.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| file | <code>file</code>| The file that matches the hash |

<a name="/stats"></a>

## /stats API

GET - /api/stats

Fetches a list of stats for each node in the cluster.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of nodes by. |
| length | <code>number</code> | <code>500</code> | The number of nodes to return. Defaults to 500. |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0. |
| sortField | <code>string</code> | <code>&quot;nodeName&quot;</code> | The field to sort the node list by. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |
| hide | <code>string</code> |  | Which nodes to exclude from the results. Options include:      none - show all nodes.      old - hide out of date nodes (nodes whose current time is behind by at least 5 minutes).      nosession - hide nodes without sessions.      both - hide out of date nodes and nodes without sessions. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of nodes with their corresponding stats. |
| recordsTotal | <code>number</code>| The total number of nodes. |
| recordsFiltered | <code>number</code>| The number of nodes returned in this result. |

<a name="/dstats"></a>

## /dstats API

GET - /api/dstats

Fetches a list of detailed stats for different fields pertaining to a node to populate a cubism graph.
<a href="https://github.com/square/cubism">Cubism GitHub</a>


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nodeName | <code>string</code> |  | The name of the node to get the detailed stats for. |
| name | <code>string</code> |  | The name of the field to get the detailed stats for. |
| start | <code>number</code> |  | The start time of data to return. Format is seconds since Unix EPOC. |
| stop | <code>number</code> |  | The stop time of data to return. Format is seconds since Unix EPOC. |
| step | <code>number</code> |  | The context step of the cubism graph in milliseconds. |
| interval | <code>number</code> | <code>60</code> | The time interval to search for. |
| size | <code>number</code> | <code>1440</code> | The size of the cubism graph. Defaults to 1440. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>array</code>| List of values to populate the cubism graph. |

<a name="/esstats"></a>

## /esstats API

GET - /api/esstats

Fetches a list of stats for each Elasticsearch cluster.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of Elasticsearch clusters by. |
| sortField | <code>string</code> | <code>&quot;nodeName&quot;</code> | The field to sort the Elasticsearch clusters list by. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of ES clusters with their corresponding stats. |
| recordsTotal | <code>number</code>| The total number of ES clusters. |
| recordsFiltered | <code>number</code>| The number of ES clusters returned in this result. |
| health | [<code>ESHealth</code>](#ESHealth)| The Elasticsearch cluster health status and info. |

<a name="/esindices"></a>

## /esindices API

GET - /api/esindices

Fetches a list of Elasticsearch indices.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of Elasticsearch indices by. |
| sortField | <code>string</code> | <code>&quot;index&quot;</code> | The field to sort the Elasticsearch indices list by. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of ES indices with their corresponding stats. |
| recordsTotal | <code>number</code>| The total number of ES indices. |
| recordsFiltered | <code>number</code>| The number of ES indices returned in this result. |

<a name="/esindices/_index"></a>

## /esindices/:index API

DELETE - /api/esindices/:index

Deletes an Elasticsearch index (admin and remove access only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete index operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esindices/_index/optimize"></a>

## /esindices/:index/optimize API

POST - /api/esindices/:index/optimize

Optimizes an Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true, the optimizeIndex function might block. Check the logs for errors. |

<a name="/esindices/_index/close"></a>

## /esindices/:index/close API

POST - /api/esindices/:index/close

Closes an Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the close index operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esindices/_index/open"></a>

## /esindices/:index/open API

POST - /api/esindices/:index/open

Opens an Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true, the openIndex function might block. Check the logs for errors. |

<a name="/esindices/_index/shrink"></a>

## /esindices/:index/shrink API

POST - /api/esindices/:index/shrink

Shrinks an Elasticsearch index (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | The index name to shrink the index to. |
| numShards | <code>number</code> | The number of shards to shrink the index to. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the close shrink operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks"></a>

## /estasks API

GET - /api/estasks

Fetches Elasticsearch tasks.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of ES tasks by. |
| cancellable | <code>string</code> | <code>false</code> | Whether to return only cancellable tasks. Default is "false". |
| sortField | <code>string</code> | <code>&quot;action&quot;</code> | The field to sort the ES task list by. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |
| size | <code>number</code> | <code>1000</code> | The number of ES tasks to return. Defaults to 1000. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of ES tasks with their corresponding stats. |
| recordsTotal | <code>number</code>| The total number of ES tasks. |
| recordsFiltered | <code>number</code>| The number of ES tasks returned in this result. |

<a name="/estasks/_id/cancel"></a>

## /estasks/:id/cancel API

POST - /api/estasks/:id/cancel

Cancels an Elasticsearch task (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel task operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks/_id/cancelwith"></a>

## /estasks/:id/cancelwith API

POST - /api/estasks/:id/cancelwith

Cancels an Elasticsearch task by opaque id. Used to cancel running tasks
that a user has created allowing a user to cancel their own tasks.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel task operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks/cancelall"></a>

## /estasks/cancelall API

POST - /api/estasks/cancelall

Cancels all running Elasticsearch tasks (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel all tasks operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin"></a>

## /esadmin API

GET - /api/esadmin

Fetches all Elasticsearch settings that a user can change (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| settings | <code>array</code>| List of ES settings that a user can change |

<a name="/esadmin/set"></a>

## /esadmin/set API

POST - /api/esadmin/set

Sets Elasticsearch settings (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether saving the settings was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin/reroute"></a>

## /esadmin/reroute API

POST - /api/esadmin/reroute

Try to restart any shard migrations that have failed or paused (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the reroute was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin/flush"></a>

## /esadmin/flush API

POST - /api/esadmin/flush

Flush and refresh any data waiting in Elasticsearch to disk (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true |
| text | <code>string</code>| The success message to (optionally) display to the user. |

<a name="/esadmin/unflood"></a>

## /esadmin/unflood API

POST - /api/esadmin/unflood

Try and clear any indices marked as flooded (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true |
| text | <code>string</code>| The success message to (optionally) display to the user. |

<a name="/esadmin/clearcache"></a>

## /esadmin/clearcache API

POST - /api/esadmin/clearcache

Try and clear the cache for all indices (es admin only - set in config with <a href="settings#esadminusers">esAdminUsers</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether clearing the cache was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esshards"></a>

## /esshards API

GET - /api/esshards

Fetches all Elasticsearch shards


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of Elasticsearch shards by. |
| show | <code>string</code> | <code>&quot;all&quot;</code> | Which types of shard to show. Options include:      all - show all shards.      notstarted - show unstarted shards.      INITIALIZING - show initializing shards.      RELOCATING - show relocating shards.      UNASSIGNED - show unassigned shards. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| nodes | <code>array</code>| List of ES data nodes. |
| indices | <code>array</code>| List of ES indices. |
| nodeExcludes | <code>array</code>| List of node names that disallow the allocation of shards. |
| ipExcludes | <code>array</code>| List of node ips that disallow the allocation of shards. |

<a name="/esshards/_type/_value/exclude"></a>

## /esshards/:type/:value/exclude API

POST - /api/esshards/:type/:value/exclude

Exclude Elasticsearch node by ip or name (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether exclude node operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esshards/_type/_value/include"></a>

## /esshards/:type/:value/include API

POST - /api/esshards/:type/:value/include

Include Elasticsearch node by ip or name (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether include node operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esrecovery"></a>

## /esrecovery API

GET - /api/esrecovery

Returns information about ongoing and completed shard recoveries for indices.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of indices by. |
| sortField | <code>string</code> | <code>&quot;index&quot;</code> | The field to sort the indices by. |
| desc | <code>string</code> | <code>false</code> | Whether to return the results in descending order. Defaults to "false". |
| show | <code>string</code> | <code>&quot;active&quot;</code> | Whether to show "all" or "active" recovering indices. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of indices with their corresponding stats. |
| recordsTotal | <code>number</code>| The total number of indices. |
| recordsFiltered | <code>number</code>| The number of indices returned in this result. |

<a name="/fields"></a>

## /fields API

GET - /api/fields

Gets available database field objects pertaining to sessions.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>boolean</code> | <code>false</code> | Whether to return an array of fields, otherwise returns a map |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>array/map</code>| The map or list of database fields |

<a name="/files"></a>

## /files API

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
| data | <code>Array</code>| The list of files |
| recordsTotal | <code>number</code>| The total number of files Arkime knows about |
| recordsFiltered | <code>number</code>| The number of files returned in this result |

<a name="/eshealth"></a>

## /eshealth API

GET - /api/eshealth

Retrive Elasticsearch health and stats
There is no auth necessary to retrieve eshealth

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

<a name="SessionsQuery"></a>

## SessionsQuery Type

The query params to build an Elasticsearch sessions query.

For long expressions use POST for client requests to the server.
When using POST the request body and request query are merged. Any duplicate parameters use the request body parameter.


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

<a name="ESHealth"></a>

## ESHealth Type

The Elasticsearch cluster health status and information.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| active_primary_shards | <code>number</code> | The number of active primary shards. |
| active_shards | <code>number</code> | The total number of active primary and replica shards. |
| active_shards_percent_as_number | <code>number</code> | The ratio of active shards in the cluster expressed as a percentage. |
| cluster_name | <code>string</code> | The name of the arkime cluster |
| delayed_unassigned_shards | <code>number</code> | The number of shards whose allocation has been delayed by the timeout settings. |
| initializing_shards | <code>number</code> | The number of shards that are under initialization. |
| molochDbVersion | <code>number</code> | The arkime database version |
| number_of_data_nodes | <code>number</code> | The number of nodes that are dedicated data nodes. |
| number_of_in_flight_fetch | <code>number</code> | The number of unfinished fetches. |
| number_of_nodes | <code>number</code> | The number of nodes within the cluster. |
| number_of_pending_tasks | <code>number</code> | The number of cluster-level changes that have not yet been executed. |
| relocating_shards | <code>number</code> | The number of shards that are under relocation. |
| status | <code>string</code> | Health status of the cluster, based on the state of its primary and replica shards. Statuses are:     "green" - All shards are assigned.     "yellow" - All primary shards are assigned, but one or more replica shards are unassigned. If a node in the cluster fails, some data could be unavailable until that node is repaired.     "red" - One or more primary shards are unassigned, so some data is unavailable. This can occur briefly during cluster startup as primary shards are assigned. |
| task_max_waiting_in_queue_millis | <code>number</code> | The time expressed in milliseconds since the earliest initiated task is waiting for being performed. |
| timed_out | <code>boolean</code> | If false the response returned within the period of time that is specified by the timeout parameter (30s by default). |
| unassigned_shards | <code>number</code> | The number of shards that are not allocated. |
| version | <code>string</code> | the elasticsearch version number |
| _timeStamp | <code>number</code> | timestamps in ms from unix epoc |


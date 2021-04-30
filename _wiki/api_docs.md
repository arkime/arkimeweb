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

<a name="/histories"></a>

## /histories API

GET - /api/histories

Retrieves a list of histories, or user client requests to the APIs.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1. |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOC. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOC. |
| searchTerm | <code>string</code> |  | The search text to filter the history list by. |
| length | <code>number</code> | <code>100</code> | The number of items to return. Defaults to 1,000. |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0. |
| sortField | <code>string</code> | <code>&quot;timestamp&quot;</code> | The field to sort the results by. |
| desc | <code>string</code> | <code>true</code> | Whether to sort the results descending or ascending. Default is descending. |
| userId | <code>string</code> |  | The ID of a user to request history results for. Admin can retrieve all users. Normal users can only retrieve their own. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;History&gt;</code>](#History)| The list of history results. |
| recordsTotal | <code>number</code>| The total number of history results stored. |
| recordsFiltered | <code>number</code>| The number of history items returned in this result. |

<a name="/history/_id"></a>

## /history/:id API

DELETE - /api/history/:id

Deletes a history entry (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| index | <code>string</code> | The Elasticsearch index that the history item was stored in. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete history operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/hunt"></a>

## /hunt API

POST - /api/hunt

Creates a new hunt.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions. |
| totalSessions | <code>number</code> | The number of sessions to search. |
| name | <code>string</code> | The name of the hunt (not unique). |
| size | <code>number</code> | The number of packets to search within each session. |
| src | <code>boolean</code> | Whether to search the source packets. Must search src or dst or both. |
| dst | <code>boolean</code> | Whether to search the destination packets. Must search src or dst or both. |
| type | <code>string</code> | Whether to search raw or reassembled packets. |
| search | <code>string</code> | The search text to search for within packets. |
| searchType | <code>string</code> | What type of search the text is. Options include:      ascii - search for case insensitive ascii text.      asciicase - search for case sensitive ascii text.      hex - search for hex text.      regex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe regex</a>.      hexregex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe hex regex</a>. |
| notifier | <code>string</code> | The otional notifier name to fire when there is an error, or there are matches (every 10 minutes), or when the hunt is complete. |
| users | <code>string</code> | The comma separated list of users to be added to the hunt so they can view the results. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the creation of the hunt was successful. |
| hunt | [<code>Hunt</code>](#Hunt)| The newly created hunt object. |
| invalidUsers | <code>array</code>| The list of users that could not be added to the hunt because they were invalid or nonexitent. |

<a name="/hunts"></a>

## /hunts API

GET - /api/hunts

Retrieves a list of hunts.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| searchTerm | <code>string</code> |  | The search text to search hunt results for. |
| length | <code>number</code> | <code>10000</code> | The number of items to return. Defaults to 10000. |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |
| sortField | <code>string</code> | <code>&quot;created&quot;</code> | The field to sort the hunt results by. Defaults to "created". |
| desc | <code>string</code> | <code>false</code> | Whether to sort the results in descending order. Default is ascending. |
| history | <code>string</code> | <code>false</code> | Whether to return only finished hunts. Default is to return queued, paused, and running hunts. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| runningJob | [<code>Hunt</code>](#Hunt)| If there is a hunt running, returns the currently running hunt object. |
| data | [<code>Array.&lt;Hunt&gt;</code>](#Hunt)| The list of hunts (either finished or queued/paused/running). |
| recordsTotal | <code>number</code>| The total number of hunts Arkime has. |
| recordsFiltered | <code>number</code>| The number of hunts returned in this result. |

<a name="/hunt/_id"></a>

## /hunt/:id API

DELETE - /api/hunt/:id

Delete a hunt.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete hunt operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/hunt/_id/pause"></a>

## /hunt/:id/pause API

PUT - /api/hunt/:id/pause

Pause a hunt.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the pause hunt operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/hunt/_id/play"></a>

## /hunt/:id/play API

PUT - /api/hunt/:id/play

Play a hunt.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the play hunt operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/hunt/_id/users"></a>

## /hunt/:id/users API

POST - /api/hunt/:id/users

Add user(s) to a hunt.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| users | <code>string</code> | Comma separated list of user ids to add to the hunt. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the add users operation was successful. |
| users | <code>array</code>| The list of users that were added to the hunt. |
| invalidUsers | <code>array</code>| The list of users that could not be added to the hunt because they were invalid or nonexitent. |

<a name="/hunt/_id/user/_user"></a>

## /hunt/:id/user/:user API

DELETE - /api/hunt/:id/user/:user

Remove user(s) from a hunt.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the remove users operation was successful. |
| users | <code>array</code>| The list of users who have access to the hunt. |
| invalidUsers | <code>array</code>| The list of users that could not be removed from the hunt because they were invalid or nonexitent. |

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

<a name="/_nodeName/_fileNum/filesize"></a>

## /:nodeName/:fileNum/filesize API

GET - /api/:nodeName/:fileNum/filesize

Retrieves the filesize of a PCAP file.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| filesize | <code>number</code>| The size of the file ( |

<a name="/title"></a>

## /title API

GET - /api/title

Retrieves the browser page title for the Arkime app.
Configure it using <a href="https://arkime.com/settings#titletemplate">the titleTemplate setting</a>

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code>| The title of the app based on the configured setting. |

<a name="/valueactions"></a>

## /valueactions API

GET - /api/valueactions

Retrives the actions that can be preformed on meta data values.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| The list of actions that can be preformed on data values. |

<a name="/reversedns"></a>

## /reversedns API

GET - /api/reversedns

Retrives the domain names associated with an IP address.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | The IP to search domain names for. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| domains | <code>string</code>| A comma separated string list of all the matching domain names. |

<a name="/upload"></a>

## /upload API

POST - /api/upload

Uploads PCAP files.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| tags | <code>string</code> | A comma separated list of tags to add to each session created. |

<a name="/clusters"></a>

## /clusters API

GET - /api/clusters

Retrieves a list of known configured Arkime clusters (if in
<a href="https://arkime.com/settings#multi-viewer-settings">Mulit Viewer mode</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| active | <code>Array</code>| The active Arkime clusters. |
| inactive | <code>Array</code>| The inactive Arkime clusters. |

<a name="/notifiertypes"></a>

## /notifiertypes API

GET - /api/notifiertypes

Retrieves notifier types (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| notifiers | <code>object</code>| The notifiers that Arkime knows about. |

<a name="/notifiers"></a>

## /notifiers API

GET - /api/notifiers

Retrieves notifiers that have been configured.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| notifiers | [<code>Array.&lt;Notifier&gt;</code>](#Notifier)| The notifiers that have been created. |

<a name="/notifier"></a>

## /notifier API

POST - /api/notifier

Creates a new notifier (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the new notifier (must be unique). |
| type | <code>type</code> | The type of notifier. |
| fields | <code>array</code> | The fields to configure the notifier. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| notifier | [<code>Notifier</code>](#Notifier)| If successful, the notifier with name sanitized and created/user fields added. |

<a name="/notifier/_name"></a>

## /notifier/:name API

PUT - /api/notifier/:name

Updates an existing notifier (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The new name of the notifier (must be unique). |
| type | <code>type</code> | The new type of notifier. |
| fields | <code>array</code> | The new field values to configure the notifier. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| notifier | [<code>Notifier</code>](#Notifier)| If successful, the updated notifier with name sanitized and updated field added/updated. |

<a name="/notifier/_name"></a>

## /notifier/:name API

DELETE - /api/notifier/:name

Deletes an existing notifier (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| name | <code>string</code>| If successful, the name of the deleted notifier. |

<a name="/notifier/_name/test"></a>

## /notifier/:name/test API

POST - /api/notifier/:name/test

Tests an existing notifier (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the test notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

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

<a name="/delete"></a>

## /delete API

GET - /api/delete

Delete SPI and/or scrub PCAP data (remove persmission required).


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| removeSpi | <code>string</code> | <code>false</code> | Whether to remove the SPI data. |
| removePcap | <code>string</code> | <code>true</code> | Whether to remove the PCAP data. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/shortcuts"></a>

## /shortcuts API

GET - /api/shortcuts

Retrieves a list of shortcuts.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| map | <code>string</code> | <code>false</code> | Whether to return a list or a map. Default is list. |
| sort | <code>string</code> | <code>&quot;name&quot;</code> | The field to sort the results by. |
| desc | <code>string</code> | <code>true</code> | Whether to sort the results descending or ascending. Default is descending. |
| searchTerm | <code>string</code> |  | The search text to filter the shortcut list by. |
| length | <code>number</code> | <code>50</code> | The number of items to return. Defaults to 50. |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0. |
| fieldType | <code>string</code> |  | Filter the results by type (number, ip, or string). |
| fieldFormat | <code>string</code> | <code>false</code> | Sends a help field with the shortcut with the description + the values of the shortcut. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;Shortcut&gt;</code>](#Shortcut)| The list of shortcut results. |
| recordsTotal | <code>number</code>| The total number of shortcut results stored. |
| recordsFiltered | <code>number</code>| The number of shortcut items returned in this result. |

<a name="/shortcut"></a>

## /shortcut API

POST - /api/shortcut

Creates a new shortcut.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the new shortcut. |
| type | <code>string</code> | The type of the shortcut (number, ip, or string). |
| value | <code>string</code> | The shortcut value. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| shortcut | [<code>Shortcut</code>](#Shortcut)| The new shortcut object. |
| success | <code>boolean</code>| Whether the create shortcut operation was successful. |

<a name="/shortcut/_id"></a>

## /shortcut/:id API

PUT - /api/shortcut/:id

Updates a shortcut.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the shortcut. |
| type | <code>string</code> | The type of the shortcut (number, ip, or string). |
| value | <code>string</code> | The shortcut value. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| shortcut | [<code>Shortcut</code>](#Shortcut)| The updated shortcut object. |
| success | <code>boolean</code>| Whether the upate shortcut operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/shortcut/_id"></a>

## /shortcut/:id API

DELETE - /api/shortcut/:id

Deletes a shortcut.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete shortcut operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/eshealth"></a>

## /eshealth API

GET - /api/eshealth

Retrive Elasticsearch health and stats
There is no auth necessary to retrieve eshealth

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| health | [<code>ESHealth</code>](#ESHealth)| The elasticsearch cluster health status and info |

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

<a name="/parliament"></a>

## /parliament API

GET - /api/parliament

Returns information all the Arkime clusters configured in your Parliament.
See the parliament definition <a href="https://github.com/arkime/arkime/tree/main/parliament#parliament-definition">here</a> (subject to change).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| List of fields that describe the cluster stats. |
| recordsTotal | <code>number</code>| The total number of stats. |
| recordsFiltered | <code>number</code>| The number of stats returned in this result. |

<a name="/user"></a>

## /user API

GET - /api/user

Retrieves the currently logged in user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| user | [<code>ArkimeUser</code>](#ArkimeUser)| The currently logged in user. |

<a name="/user"></a>

## /user API

POST - /api/user

Creates a new Arkime user (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the add user operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/_id"></a>

## /user/:id API

DELETE - /api/user/:id

Deletes an Arkime user (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete user operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/_id"></a>

## /user/:id API

POST - /api/user/:id

Updates an Arkime user (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update user operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/password"></a>

## /user/password API

POST - /api/user/password

Update user password.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update password operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/css"></a>

## /user/css API

GET - /api/user/css OR /api/user.css

Retrieves custom user css for the user's custom theme.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| css | <code>css</code>| The css file that includes user configured styles. |

<a name="/users"></a>

## /users API

POST - /api/users

Retrieves a list of Arkime users (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;ArkimeUser&gt;</code>](#ArkimeUser)| The list of users configured to access this Arkime cluster. |
| recordsTotal | <code>number</code>| The total number of users Arkime knows about. |
| recordsFiltered | <code>number</code>| The number of users returned in this result. |

<a name="/user/settings"></a>

## /user/settings API

GET - /api/user/settings

Retrieves an Arkime user's settings.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| settings | [<code>ArkimeSettings</code>](#ArkimeSettings)| The user's configured settings |

<a name="/user/settings"></a>

## /user/settings API

POST - /api/user/settings

Updates an Arkime user's settings.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update user settings operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/views"></a>

## /user/views API

GET - /api/user/views

Retrieves an Arkime user's views.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| views | [<code>Array.&lt;ArkimeView&gt;</code>](#ArkimeView)| A list of views a user has configured or has been shared. |

<a name="/user/view"></a>

## /user/view API

POST - /api/user/view

Creates an Arkime view for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| viewName | <code>string</code>| The name of the new view. |
| view | [<code>ArkimeView</code>](#ArkimeView)| The new view data. |

<a name="/user/view/_name"></a>

## /user/view/:name API

DELETE - /api/user/view/:name

Deletes an Arkime view for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/view/_name/toggleshare"></a>

## /user/view/:name/toggleshare API

POST - /api/user/view/:name/toggleshare

Toggles sharing an Arkime view for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the share view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/view/_key"></a>

## /user/view/:key API

PUT - /api/user/view/:key

Updates an Arkime view for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/crons"></a>

## /user/crons API

GET - /api/user/crons

Retrieves cron queries for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| queries | <code>object</code>| A list of cron query objects. |

<a name="/user/cron"></a>

## /user/cron API

POST - /api/user/cron

Create a new cron query for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create cron operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| key | <code>string</code>| The cron query id |

<a name="/user/cron/_key"></a>

## /user/cron/:key API

DELETE - /api/user/cron/:key

Delete a cron query for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete cron operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/cron/_key"></a>

## /user/cron/:key API

POST - /api/user/cron/:key

Update a cron query for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update cron operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/columns"></a>

## /user/columns API

GET - /api/user/columns

Retrieves user configured custom Sessions column configurations.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| columnConfigs | [<code>Array.&lt;ArkimeColumnConfig&gt;</code>](#ArkimeColumnConfig)| The custom Sessions column configurations. |

<a name="/user/column"></a>

## /user/column API

POST - /api/user/column

Creates a new user configured custom Sessions column configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create column configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| name | <code>string</code>| The name of the new custom Sessions column configuration. |

<a name="/user/column/_name"></a>

## /user/column/:name API

PUT - /api/user/column/:name

Updates a user configured custom Sessions column configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update column configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| colConfig | [<code>ArkimeColumnConfig</code>](#ArkimeColumnConfig)| The udpated custom Sessions column configuration. |

<a name="/user/column/_name"></a>

## /user/column/:name API

DELETE - /api/user/column/:name

Deletes a user configured custom Sessions column configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete Sessions column configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/spiview"></a>

## /user/spiview API

GET - /api/user/spiview

Retrieves a user configured SPI View fields configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| spiviewFieldConfigs | <code>Array</code>| User configured SPI View field configuration. |

<a name="/user/spiview"></a>

## /user/spiview API

POST - /api/user/spiview

Create a user configured SPI View fields configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update SPI View fields configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| name | <code>string</code>| The name of the new SPI View fields configuration. |

<a name="/user/spiview/_name"></a>

## /user/spiview/:name API

PUT - /api/user/spiview/:name

Updates a user configured SPI View fields configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update SPI View fields configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| colConfig | <code>object</code>| The udpated SPI View fields configuration. |

<a name="/user/spiview/_name"></a>

## /user/spiview/:name API

DELETE - /api/user/spiview/:name

Deletes a user configured SPI View fields configuration.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete SPI View fields configuration operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/_userId/acknowledge"></a>

## /user/:userId/acknowledge API

PUT - /api/user/:userId/acknowledge

Acknowledges a UI message for a user. Used to display help popups.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/state/_name"></a>

## /user/state/:name API

GET - /api/user/state/:name

Retrieves a user table state object. These are used to save the states of tables within the UI (sessions, files, stats, etc).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| tableState | <code>object</code>| The table state requested. |

<a name="/user/state/_name"></a>

## /user/state/:name API

POST - /api/user/state/:name

Updates or creates a user table state object. These are used to save the states of tables within the UI (sessions, files, stats, etc).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="History"></a>

## History Type

The history object to describe user client requests.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| uiPage | <code>string</code> | The client application page that the user accessed to make the request. |
| userId | <code>string</code> | The ID of the user that made the request. |
| method | <code>string</code> | The HTTP method that the request used. |
| api | <code>string</code> | The API endpoint of the request. |
| expression | <code>string</code> | The sessions search expression used in the request. |
| view | [<code>ArkimeView</code>](#ArkimeView) | The view applied to the request. |
| timestamp | <code>number</code> | The time that the request was made. Format is seconds since Unix EPOC. |
| range | <code>number</code> | The date range of the request. Range is described in hours, -1 means all. |
| query | <code>string</code> | The query parameters of the request. |
| queryTime | <code>number</code> | The time it took for the response to be returned after the request was issued. |
| recordsTotal | <code>number</code> | The total number of items in the data set. |
| recordsFiltered | <code>number</code> | The number of items returned from searching the dataset (before paging). |
| recordsReturned | <code>number</code> | The number of items returned in the response (after paging). |
| body | <code>object</code> | The request body. |
| forcedExpression | <code>string</code> | The expression applied to the search as a result of a users forced expression. Only visible to admins, normal users cannot see their forced expressions. |

<a name="Hunt"></a>

## Hunt Type

A packet search job that allows users to search within session packets for text.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user that created the hunt. |
| status | <code>string</code> | The status of the hunt. Options include:      queued - The hunt is queued to search packets once the currently running hunt has finished.      running - The hunt is currently searching packets.      paused - The hunt is paused, either by a user or by error.      finished - The hunt has searched all requested sessions. |
| name | <code>string</code> | The name of the hunt (not unique). |
| size | <code>number</code> | The number of packets to search within each session. |
| search | <code>string</code> | The search text to search for within packets. |
| searchType | <code>string</code> | What type of search the text is. Options include:      ascii - search for case insensitive ascii text.      asciicase - search for case sensitive ascii text.      hex - search for hex text.      regex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe regex</a>.      hexregex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe hex regex</a>. |
| src | <code>boolean</code> | Whether to search the source packets. Must search src or dst or both. |
| dst | <code>boolean</code> | Whether to search the destination packets. Must search src or dst or both. |
| type | <code>string</code> | Whether to search raw or reassembled packets. |
| matchedSessions | <code>number</code> | How many sessions contain packets that match the search text. |
| searchedSessions | <code>number</code> | How many sessions have had their packets searched. |
| totalSessions | <code>number</code> | The number of sessions to search. |
| lastPacketTime | <code>number</code> | The date of the first packet of the last searched session. Used to query for the next chunk of sessions to search. Format is seconds since Unix EPOC. |
| created | <code>number</code> | The time that the hunt was created. Format is seconds since Unix EPOC. |
| lastUpdated | <code>number</code> | The time that the hunt was last updated in the DB. Used to only update every 2 seconds. Format is seconds since Unix EPOC. |
| started | <code>number</code> | The time that the hunt was started (put into running state). Format is seconds since Unix EPOC. |
| query | [<code>SessionsQuery</code>](#SessionsQuery) | The request query to filter sessions. |
| errors | <code>array</code> | The list of errors that a hunt encountered. A hunt error includes:      value - The error text to display to the user.      time - The time the error was encountered.      node - The Arkime node that the hunt was searching sessions for when the error occurred. |
| notifier | <code>string</code> | The otional notifier name to fire when there is an error, or there are matches (every 10 minutes), or when the hunt is complete. |
| unrunnable | <code>boolean</code> | Whether an error has rendered the hunt unrunnable. |
| failedSessionIds | <code>array</code> | The list of sessions that have failed to be searched. Used to run the search against them again once the rest of the hunt is complete. |
| users | <code>array</code> | The list of users to be added to the hunt so they can view the results. |

<a name="Notifier"></a>

## Notifier Type

A service that can be sent a notification.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The human readable name of the notifier. Must be unique. |
| type | <code>string</code> | The type of notifier (e.g. email, slack, twilio). |
| fields | <code>array</code> | The list of fields that need to be configured to use the notifier. |
| created | <code>number</code> | The time the notifier was created. Format is seconds since Unix EPOC. |
| updated | <code>number</code> | The time the notifier was last updated. Format is seconds since Unix EPOC. |
| user | <code>string</code> | The ID of the user that created the notifier. |

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
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, srcDataBytes, dstDataBytes, firstPacket, lastPacket, srcIp, srcPort, dstIp, dstPort, totPackets, srcPackets, dstPackets, totBytes, srcBytes, dstBytes, node, http.uri, srcGEO, dstGEO, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel, http.xffGEO |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bonding to 'both' |

<a name="Shortcut"></a>

## Shortcut Type

The shortcut object to store lists of values that can be used in search queries.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user that created the shortcut. |
| name | <code>string</code> |  | The name of the shortcut. |
| shared | <code>boolean</code> | <code>false</code> | Whether the shortcut is shared with the other users in the cluster. |
| description | <code>string</code> |  | The description of the shortcut to display to users. |
| number | <code>Array.&lt;number&gt;</code> |  | A list of number values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| ip | <code>Array.&lt;string&gt;</code> |  | A list of ip values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| string | <code>Array.&lt;string&gt;</code> |  | A list of string values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| locked | <code>boolean</code> | <code>false</code> | Whether the shortcut is locked and must be updated using the db.pl script (can't be updated in the web application user interface). |

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
| status | <code>string</code> | Health status of the cluster, based on the state of its primary and replica shards. Statuses are:       "green" - All shards are assigned.       "yellow" - All primary shards are assigned, but one or more replica shards are unassigned. If a node in the cluster fails, some data could be unavailable until that node is repaired.       "red" - One or more primary shards are unassigned, so some data is unavailable. This can occur briefly during cluster startup as primary shards are assigned. |
| task_max_waiting_in_queue_millis | <code>number</code> | The time expressed in milliseconds since the earliest initiated task is waiting for being performed. |
| timed_out | <code>boolean</code> | If false the response returned within the period of time that is specified by the timeout parameter (30s by default). |
| unassigned_shards | <code>number</code> | The number of shards that are not allocated. |
| version | <code>string</code> | the elasticsearch version number |
| _timeStamp | <code>number</code> | timestamps in ms from unix epoc |

<a name="ArkimeUser"></a>

## ArkimeUser Type

The user object.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user. |
| userName | <code>string</code> |  | The name of the user (to be displayed in the UI). |
| enabled | <code>boolean</code> | <code>true</code> | Whether the user is enabled (or disabled). Disabled users cannot access the UI or APIs. |
| createEnabled | <code>boolean</code> | <code>false</code> | Can create new accounts and change the settings for other accounts and other administrative tasks. |
| webEnabled | <code>boolean</code> | <code>true</code> | Can access the web interface. When off only APIs can be used. |
| headerAuthEnabled | <code>boolean</code> | <code>false</code> | Can login using the web auth header. This setting doesn't disable the password so it should be scrambled. |
| emailSearch | <code>boolean</code> | <code>false</code> | Can perform searches for fields relating to email. |
| removeEnabled | <code>boolean</code> | <code>false</code> | Can delete tags or delete/scrub pcap data and other deletion operations. |
| packetSearch | <code>boolean</code> | <code>true</code> | Can create a packet search job (hunt). |
| hideStats | <code>boolean</code> | <code>false</code> | Hide the Stats page from this user. |
| hideFiles | <code>boolean</code> | <code>false</code> | Hide the Files page from this user. |
| hidePcap | <code>boolean</code> | <code>false</code> | Hide PCAP (and only show metadata/session detail) for this user when they open a Session. |
| disablePcapDownload | <code>boolean</code> | <code>false</code> | Do not allow this user to download PCAP files. |
| expression | <code>string</code> |  | An Arkime search expression that is silently added to all queries. Useful to limit what data a user can access (e.g. which nodes or IPs). |
| settings | [<code>ArkimeSettings</code>](#ArkimeSettings) |  | The Arkime app settings. |
| views | <code>object</code> |  | A list of views that the user can apply to their search. |
| notifiers | <code>object</code> |  | A list of notifiers taht the user can use. |
| columnConfigs | <code>object</code> |  | A list of sessions table column configurations that a user has created. |
| spiviewFieldConfigs | <code>object</code> |  | A list of SPIView page field configurations that a user has created. |
| tableStates | <code>object</code> |  | A list of table states used to render Arkime tables as the user has configured them. |
| welcomeMsgNum | <code>number</code> | <code>0</code> | The message number that a user is on. Gets incremented when a user dismisses a message. |
| lastUsed | <code>number</code> |  | The date that the user last used Arkime. Format is milliseconds since Unix EPOC. |
| timeLimit | <code>number</code> |  | Limits the time range a user can query for. |

<a name="ArkimeSettings"></a>

## ArkimeSettings Type

The settings object.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| timezone | <code>string</code> | <code>&quot;local&quot;</code> | The timezone applied to timestamps within the UI. |
| detailFormat | <code>string</code> | <code>&quot;last&quot;</code> | The format to display the session packets. Options include: last used, natural, ascii, utf-8, hex. |
| showTimestamps | <code>string</code> | <code>&quot;last&quot;</code> | Whether to display timestamps at the top of each packet. |
| sortColumn | <code>string</code> | <code>&quot;firstPacket&quot;</code> | Which column to sort the sesssions table by default. Default is start time. |
| sortDirection | <code>string</code> | <code>&quot;desc&quot;</code> | Whether to sort the sessions table ascending or descending. |
| spiGraph | <code>string</code> | <code>&quot;node&quot;</code> | The default field to show spigraph data for. |
| connSrcField | <code>string</code> | <code>&quot;srcIp&quot;</code> | The default connections graph source node field. |
| connDstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The default connections graph destination node field. |
| numPackets | <code>string</code> | <code>&quot;last&quot;</code> | The number of packets to show in the session packet area. |
| theme | <code>string</code> | <code>&quot;default-theme&quot;</code> | The color theme to apply to the UI. Can be a name of a predefined field or a list of color codes if using a custom theme. |
| manualQuery | <code>boolean</code> | <code>false</code> | Whether to load the sessions data by default or wait for a user to hit search manually. |
| timelineDataFilters | <code>array</code> | <code>[&#x27;totPackets&#x27;,&#x27;totBytes&#x27;,&#x27;totDataBytes&#x27;</code> | The filters to display on the sessions timeline graph to change the graphs data. |
| logo | <code>string</code> |  | The optionally configurable logo to show in the top navbar. |

<a name="ArkimeView"></a>

## ArkimeView Type

A database view that can be applied to any search.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>string</code> | The search expression to filter sessions. |
| sessionsColConfig | [<code>ArkimeColumnConfig</code>](#ArkimeColumnConfig) | The Sessions column configuration to apply to the Sessions table when applying the view. |
| shared | <code>boolean</code> | Whether the view is shared with other users in the Arkime cluster. |
| user | <code>string</code> | The user ID of the user who created the view. |

<a name="ArkimeColumnConfig"></a>

## ArkimeColumnConfig Type

A database view that can be applied to any search.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>Array.&lt;Array&gt;</code> | <code>[[&quot;firstPacket&quot;,&quot;desc&quot;]</code> | What to sort the Sessions table by. The table is sorted by the first item in the array first, then the second, and so on. Each element in the array includes first the sort field followed by whether to sort descending (["firstPacket", "desc"]). |
| visibleHeaders | <code>Array</code> | <code>[&quot;firstPacket&quot;,&quot;lastPacket&quot;,&quot;src&quot;,&quot;srcPort&quot;,&quot;dst&quot;,&quot;dstPort&quot;,&quot;totPackets&quot;,&quot;dbby&quot;,&quot;node&quot;</code> | The list of Sessions table columns. |


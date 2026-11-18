<a name="/connections"></a>

## /connections API

POST/GET - /api/connections

Builds an Elasticsearch connections query. Gets a list of nodes and links and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
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

Builds an Elasticsearch connections query. Gets a list of nodes and links in csv format and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| srcField | <code>string</code> | <code>&quot;ip.src&quot;</code> | The source database field name |
| dstField | <code>string</code> | <code>&quot;ip.dst:port&quot;</code> | The destination database field name |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| csv | <code>csv</code>| The csv with the connections requested |

<a name="/crons"></a>

## /crons API

GET - /api/crons

Retrieves periodic queries a user can view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| queries | [<code>Array.&lt;ArkimeQuery&gt;</code>](#ArkimeQuery)| A list of query objects. |

<a name="/cron"></a>

## /cron API

POST - /api/cron

Create a new periodic query.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| query | [<code>ArkimeQuery</code>](#ArkimeQuery)| The new query |

<a name="/cron/_key"></a>

## /cron/:key API

POST - /api/cron/:key

Update a periodic query.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| query | [<code>ArkimeQuery</code>](#ArkimeQuery)| The updated query object |

<a name="/cron/_key"></a>

## /cron/:key API

DELETE - /api/cron/:key

Delete a periodic query.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/featherprint/ip/_ip"></a>

## /featherprint/ip/:ip API

GET - /api/featherprint/ip/:ip

Fetch the persisted featherprint device record for a single IP.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| :ip | <code>string</code> | The IPv4 / IPv6 address whose device record to fetch. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True on hit, false on miss. |
| device | <code>object</code>| The persisted device record (mac, names, services, classification, ...). |

<a name="/featherprint/search"></a>

## /featherprint/search API

GET - /api/featherprint/search

Search persisted featherprint device records by IP / MAC / name. All
filters are optional and combine as AND. MAC and name are substring
matches; ip must be an exact IP or CIDR (ES ip fields don't support
wildcards).


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ip | <code>string</code> |  | Exact IP or CIDR. |
| mac | <code>string</code> |  | Substring of a MAC address (case insensitive). |
| name | <code>string</code> |  | Substring of a discovered name (DNS/NBNS/DHCP/SSDP). |
| limit | <code>number</code> | <code>200</code> | Max records to return. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the search succeeded. |
| devices | <code>array</code>| Matching device records, sorted by lastSeen desc. |
| total | <code>number</code>| How many records match, which is more than devices holds when limit cut it short. |

<a name="/featherprint/history/_ip"></a>

## /featherprint/history/:ip API

GET - /api/featherprint/history/:ip

Return the recent change history for one IP (newIp, newMac, changeMac,
changeIp, newName, newService, ...). Sorted by ts desc.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| :ip | <code>string</code> |  | The IP whose history to fetch. |
| limit | <code>number</code> | <code>50</code> | Max history entries to return. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the lookup succeeded. |
| history | <code>array</code>| Event log entries. |

<a name="/featherprint/alerts"></a>

## /featherprint/alerts API

GET - /api/featherprint/alerts

Return featherprint alerts (one per event that matched an `alertOn*`
policy flag), sorted by ts desc. Includes both open and acked alerts;
callers filter client-side on `acked`.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| limit | <code>number</code> | <code>500</code> | Max alerts to return. |
| acked | <code>string</code> |  | Optional server-side filter: "true" or "false". |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the lookup succeeded. |
| alerts | <code>array</code>| Alert documents, newest first. |
| total | <code>number</code>| How many alerts match, which is more than alerts holds when limit cut it short. |
| openCount | <code>number</code>| How many alerts are open (not acked), whatever the acked filter and limit. |

<a name="/featherprint/ack/_id"></a>

## /featherprint/ack/:id API

POST - /api/featherprint/ack/:id

Acknowledge a single featherprint alert, or un-acknowledge it with
acked=false. Ack state is shared by everyone, so this requires one of
the featherprintAckRoles (default arkimeAdmin). The alert stays in the
index either way; acking just stamps it with the user and timestamp.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| :id | <code>string</code> |  | The alert document id to ack. |
| acked | <code>boolean</code> | <code>true</code> | false to un-acknowledge instead. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the ack persisted. |
| acked | <code>boolean</code>| The ack state now stored on the alert. |

<a name="/featherprint/ackall"></a>

## /featherprint/ackall API

POST - /api/featherprint/ackall

Acknowledge many featherprint alerts at once, or un-acknowledge them
with acked=false. Takes the explicit id list the client is showing
rather than acking by query, so what the operator sees on the page is
exactly what changes. Requires one of the featherprintAckRoles.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ids | <code>array</code> |  | The alert document ids to ack. |
| acked | <code>boolean</code> | <code>true</code> | false to un-acknowledge instead. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the acks persisted. |
| acked | <code>number</code>| How many alerts were changed. |
| failed | <code>number</code>| How many could not be changed. |

<a name="/featherprint/lookup"></a>

## /featherprint/lookup API

GET - /api/featherprint/lookup

Transient on-demand fingerprint for an IP. Reads sessions ES directly,
never persists, never fires notifiers, and works on any viewer node
(no cron-leader requirement). Subnet policy is bypassed -- the operator
typed the IP explicitly.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | The IP to fingerprint (also accepted as :ip route param). |
| start | <code>number</code> | Window start (seconds since epoch). Default: now - 24h. |
| stop | <code>number</code> | Window end (seconds since epoch). Default: now. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the lookup succeeded. |
| device | <code>object</code>| The transient device record (or {ip, notFound:true}). |

<a name="/featherprint/state"></a>

## /featherprint/state API

GET - /api/featherprint/state

Return the persisted monitor cursor (lpValue, lastProcessedTs, ...) plus
the schema-version gate. Used by the UI status row to show how far the
monitor has caught up, and to hide the monitor-backed tabs on an old
database (lookup still works -- it never reads these indices).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the state lookup succeeded. |
| state | <code>object</code>| The persisted monitor state (or null if uninitialized). |
| dbUpgradeNeeded | <code>boolean</code>| True if the database predates the featherprint indices. |
| dbVersion | <code>number</code>| The current database version (undefined if unknown). |
| requiredDbVersion | <code>number</code>| The version that adds the featherprint indices. |

<a name="/featherprint/config"></a>

## /featherprint/config API

GET - /api/featherprint/config

Admin: snapshot of the resolved policy (settings + defaults + per-subnet
flag bags). Reflects [featherprint-defaults] and [featherprint-subnet]
as parsed at viewer start.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true. |
| config | <code>object</code>| {settings, defaults, subnets:[{cidr, flags}]}. |

<a name="/featherprint/tick"></a>

## /featherprint/tick API

POST - /api/featherprint/tick

Admin: force an immediate monitor tick. If a tick is already running, the
existing run owns the work; the re-entrancy guard in tick() prevents a
duplicate scan. Returns status flags so the UI can show why the tick
was skipped (notPrimary, alreadyRunning, monitorDisabled).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the request was processed. |
| triggered | <code>boolean</code>| Whether a new tick actually started. |
| alreadyRunning | <code>boolean</code>| True if a tick was already in flight. |
| notPrimary | <code>boolean</code>| True if this node is not the cron leader. |
| monitorDisabled | <code>boolean</code>| True if featherprintMonitorEnabled=false. |
| dbUpgradeNeeded | <code>boolean</code>| True if the database predates the featherprint indices. |

<a name="/histories"></a>

## /histories API

GET - /api/histories

Retrieves a list of histories, or user client requests to the APIs.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | The number of hours of data to return (-1 means all data). Defaults to 1. |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOCH. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOCH. |
| searchTerm | <code>string</code> |  | The search text to filter the history list by. |
| length | <code>number</code> | <code>1000</code> | The number of items to return. Defaults to 1,000. |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0. |
| sortField | <code>string</code> | <code>&quot;timestamp&quot;</code> | The field to sort the results by. |
| desc | <code>string</code> | <code>true</code> | Whether to sort the results descending or ascending. Default is descending. |
| userId | <code>string</code> |  | The ID of a user to request history results for. Admin can retrieve all users. Normal users can only retrieve their own. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;History&gt;</code>](#History)| The list of history results. |
| recordsTotal | <code>number</code>| The total number of history results stored. |
| recordsFiltered | <code>number</code>| The number of history items matching query. |

<a name="/history/_id"></a>

## /history/:id API

DELETE - /api/history/:id

Deletes a history entry (admin only).

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
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |
| totalSessions | <code>number</code> | The number of sessions to search. |
| name | <code>string</code> | The name of the hunt (not unique). |
| size | <code>number</code> | The number of packets to search within each session. |
| src | <code>boolean</code> | Whether to search the source packets. Must search src or dst or both. |
| dst | <code>boolean</code> | Whether to search the destination packets. Must search src or dst or both. |
| type | <code>string</code> | Whether to search raw or reassembled packets. |
| search | <code>string</code> | The search text to search for within packets. |
| searchType | <code>string</code> | What type of search the text is. Options include:      ascii - search for case insensitive ascii text.      asciicase - search for case sensitive ascii text.      hex - search for hex text.      regex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe regex</a>.      hexregex - search for text using <a href="https://github.com/google/re2/wiki/Syntax">safe hex regex</a>. |
| notifier | <code>Array.&lt;string&gt;</code> | An array of notifier IDs to alert when there is an error or when the hunt is complete. |
| users | <code>string</code> | The comma separated list of users to be added to the hunt so they can view the results. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the creation of the hunt was successful. |
| hunt | [<code>Hunt</code>](#Hunt)| The newly created hunt object. |
| invalidUsers | <code>array</code>| The list of users that could not be added to the hunt because they were invalid or nonexistent. |

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

<a name="/hunt/_id/cancel"></a>

## /hunt/:id/cancel API

PUT - /api/hunt/:id/cancel

Cancel a hunt. Finishes the hunt and puts it into the hunt history.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel hunt operation was successful. |
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

<a name="/hunt/_id/removefromsessions"></a>

## /hunt/:id/removefromsessions API

PUT - /api/hunt/:id/removefromsessions

Remove the hunt ID and name from matched sessions.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/hunt/_id"></a>

## /hunt/:id API

PUT - /api/hunt/:id

Update a hunt - can only update description & roles


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| hunt | [<code>Hunt</code>](#Hunt) | The new hunt data |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful. |
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
| invalidUsers | <code>array</code>| The list of users that could not be added to the hunt because they were invalid or nonexistent. |

<a name="/hunt/_id/user/_user"></a>

## /hunt/:id/user/:user API

DELETE - /api/hunt/:id/user/:user

Remove user(s) from a hunt.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the remove users operation was successful. |
| users | <code>array</code>| The list of users who have access to the hunt. |
| invalidUsers | <code>array</code>| The list of users that could not be removed from the hunt because they were invalid or nonexistent. |

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
| length | <code>number</code> | <code>10</code> | The number of items to return. Defaults to 10, Max is 10,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at. Defaults to 0 |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array</code>| The list of files |
| recordsTotal | <code>number</code>| The total number of files Arkime knows about |
| recordsFiltered | <code>number</code>| The number of files returned in this result |

<a name="/valueactions"></a>

## /valueactions API

GET - /api/valueactions

Retrieves the actions that can be performed on meta data values.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| The list of actions that can be performed on data values. |

<a name="/fieldactions"></a>

## /fieldactions API

GET - /api/fieldactions

Retrieves the actions that can be performed on fields.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| The list of actions that can be performed on fields. |

<a name="/reversedns"></a>

## /reversedns API

GET - /api/reversedns

Retrieves the domain names associated with an IP address.


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

Uploads PCAP files to Arkime. This API is really only useful for demo sites and very special cases.
Instead you almost always should just run capture locally, which will be much more
efficient and not duplicate the PCAP. See https://arkime.com/faq#how-do-i-import-existing-pcaps


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| tags | <code>string</code> | A comma separated list of tags to add to each session created. |

<a name="/clusters"></a>

## /clusters API

GET - /api/clusters

Retrieves a list of known configured Arkime clusters (if in
<a href="https://arkime.com/settings#multi-viewer-settings">Multi Viewer mode</a>).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| active | <code>Array</code>| The active Arkime clusters. |
| inactive | <code>Array</code>| The inactive Arkime clusters. |

<a name="/remoteclusters"></a>

## /remoteclusters API

GET - /api/remoteclusters

Retrieves a list of known configured remote Arkime clusters.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| remoteclusters | <code>Object</code>| Key/value pairs of remote Arkime clusters, the key being the name of the cluster |

<a name="/appinfo"></a>

## /appinfo API

GET - /api/appinfo

Retrieves information that the app uses on every page:
eshealth, currentuser, views, remoteclusters, clusters, fields, fieldsmap, fieldhistory

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| eshealth | [<code>ESHealth</code>](#ESHealth)| The OpenSearch/Elasticsearch cluster health status and information. |
| currentuser | <code>ArkimeUser</code>| The currently logged in user |
| views | [<code>Array.&lt;ArkimeView&gt;</code>](#ArkimeView)| A list of views accessible to the logged in user |
| remoteclusters | <code>Object</code>| A list of known remote Arkime clusters |
| clusters | <code>Array</code>| A list of known configured Arkime clusters (if in Multi Viewer mode) |
| fields | <code>Array</code>| Available database field objects pertaining to sessions |
| fieldsmap | <code>Array</code>| Available database field objects pertaining to sessions |
| fieldhistory | <code>Object</code>| The user's field history for the search expression input |

<a name="/buildquery"></a>

## /buildquery API

POST/GET - /api/buildquery

This API allows you to build the query that Arkime viewer would use so you can use yourself against OpenSearch/Elasticsearch.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| query | <code>object</code>| The elasticsearch query |
| indices | <code>object</code>| The elasticsearch indices that contain sessions in this query |

**Example**  
```js
Returns the OpenSearch/Elasticsearch query for all the sessions with the source IP of 1.2.3.4
  curl -v 'http://localhost:8005/api/buildquery?date=-1&expression=ip.src%3D%3D1.2.3.4'
```
<a name="/sessions"></a>

## /sessions API

POST/GET - /api/sessions OR /sessions.json

Return all the JSON formatted session data based on the query parameters.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the sessions map |
| graph | <code>object</code>| The data to populate the sessions timeline graph |
| data | <code>array</code>| The list of sessions with the requested fields |
| recordsTotal | <code>number</code>| The total number of sessions Arkime knows about |
| recordsFiltered | <code>number</code>| The number of sessions matching query |

**Example**  
```js
Returns all the sessions with the source IP of 1.2.3.4
  curl -v 'http://localhost:8005/api/sessions?date=-1&expression=ip.src%3D%3D1.2.3.4'
```
<a name="/sessions/csv"></a>

## /sessions/csv API

POST/GET - /api/sessions/csv OR /sessions.csv

Return all the CSV formatted session data based on the query parameters.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>string</code> | Comma separated list of sessions to retrieve |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| csv | <code>csv</code>| The csv with the sessions requested |

**Example**  
```js
Returns all the sessions with the source IP of 1.2.3.4
  curl -v 'http://localhost:8005/api/sessions/csv?date=-1&expression=ip.src%3D%3D1.2.3.4'
```
<a name="/spiview"></a>

## /spiview API

POST/GET - /api/spiview

Builds an elasticsearch session query. Gets a list of field values with counts and returns them to the client.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |
| spi | <code>string</code> | Comma separated list of db fields to return. Optionally can be followed by :{count} to specify the number of values returned for the field (defaults to 100). |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the sessions map |
| graph | <code>object</code>| The data to populate the sessions timeline graph |
| spi | <code>object</code>| The list of spi fields with values and counts |
| protocols | <code>object</code>| The list of protocols with counts |
| recordsTotal | <code>number</code>| The total number of sessions Arkime knows about |
| recordsFiltered | <code>number</code>| The number of sessions matching query |

**Example**  
```js
Returns first 100 unique values for the destination.ip field for last 10 hours
  curl -v 'http://localhost:8005/api/spiview?spi=destination.ip:200&date=10
```
<a name="/spigraph"></a>

## /spigraph API

POST/GET - /api/spigraph

Builds an elasticsearch session query. Gets a list of values for a field with counts and graph data and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| exp | <code>string</code> |  | The expression field to return data for. Either exp or field is required, field is given priority if both are present. |
| field | <code>string</code> | <code>&quot;node&quot;</code> | The database field to return data for. Either exp or field is required, field is given priority if both are present. |
| metric | <code>string</code> |  | Optional numeric (integer) field exp (dashboard widgets). When set, its per-value sum is added as a <dbField>Histo timeline series and per-item total (drives heatmap intensity / treemap size). 'sessions' and non-numeric fields are ignored (doc_count is used). |
| metricAgg | <code>string</code> |  | Optional percentile of the metric instead of its sum: 'p50' (the median), 'p90', 'p95' or 'p99'. The graph and each item then carry a <dbField>:p<N>Histo series, the percentile of each time bucket, and the item's <dbField>:p<N>Histo total is the percentile over the whole time range (sort by it to rank the values). Not with interval=hourOfWeek, and refused by a multi viewer. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| map | <code>object</code>| The data to populate the main/aggregate spigraph sessions map |
| graph | <code>object</code>| The data to populate the main/aggregate spigraph sessions timeline graph |
| items | <code>array</code>| The list of field values with their corresponding timeline graph and map data |
| recordsTotal | <code>number</code>| The total number of sessions Arkime knows about |
| recordsFiltered | <code>number</code>| The number of sessions matching query |

<a name="/spigraphhierarchy"></a>

## /spigraphhierarchy API

POST/GET - /api/spigraphhierarchy

Builds an elasticsearch session query. Gets a list of values for each field with counts and returns them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| exp | <code>string</code> |  | Comma separated list of db fields to populate the graph/table. |
| size | <code>number</code> | <code>20</code> | The number of values to return for each field |
| sizes | <code>string</code> |  | Comma separated per-field sizes, overriding size for the fields they line up with |
| other | <code>boolean</code> | <code>false</code> | When set each level gets an "Other" child holding the sessions outside its top values |
| mode | <code>string</code> |  | 'unique' returns each field's own top values (independent lists, like /unique per field, not combinations like /multiunique) in columns instead of the nested results |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bounding to 'both' |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| hierarchicalResults | <code>object</code>| The nested data to populate the treemap or pie (an "Other" child carries other: true) |
| tableResults | <code>array</code>| The list data to populate the table |
| columns | <code>array</code>| With mode=unique only (and instead of the two above): one { exp, values: [{ name, size, srcips, dstips }] } per field, in exp order |

<a name="/unique"></a>

## /unique API

POST/GET - /api/unique

Builds an elasticsearch session query. Gets a list of unique field values (with or without counts) and sends them to the client.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with the list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| exp | <code>string</code> |  | The expression field to return unique data for. Either exp or field is required, field is given priority if both are present. |
| field | <code>string</code> |  | The database field to return unique data for. Either exp or field is required, field is given priority if both are present. |

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
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| counts | <code>number</code> | <code>0</code> | Whether to return counts with the list of unique field values. Defaults to 0. 0 = no counts, 1 - counts. |
| exp | <code>string</code> |  | Comma separated list of expression fields to return unique data for. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The list of an intersection of unique fields (with counts if requested) |

<a name="/session/_id"></a>

## /session/:id API

GET - /api/session/:id

Gets all the fields for a session as JSON.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the session to retrieve |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| The session fields as a JSON object |

<a name="/session/_nodeName/_id/detail"></a>

## /session/:nodeName/:id/detail API

GET - /api/session/:nodeName/:id/detail

Gets SPI data for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| { html, info } | <code>object</code>| the detail html plus the session
fields the client row may not carry (rootId, communityId, packets, etc.) |

<a name="/session/_nodeName/_id/packets"></a>

## /session/:nodeName/:id/packets API

GET - /api/session/:nodeName/:id/packets

Gets packets for a session.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>html</code>| The html to display as session packets |

<a name="/session/_nodeName/_id/tshark"></a>

## /session/:nodeName/:id/tshark API

GET - /api/session/:nodeName/:id/tshark

Runs tshark against the session's pcap and streams a converted PDML
dissection as NDJSON (one JSON object per packet per line). Always
dispatched on the *central* viewer that received the request; the pcap is
fetched from the owning node when needed.

Each emitted line looks like:
  {"layers":[
    {"name":"frame","label":"Frame 1: ...","fields":[
      {"name":"frame.len","label":"Frame Length: 197","show":"197","pos":0,"size":0},
      ...]
    },
    {"name":"eth","label":"Ethernet II, ...","fields":[
      {"name":"eth.dst","label":"Destination: ...","show":"...","value":"<hex>","pos":0,"size":6,
       "fields":[...]}
    ]},
    ...
  ],
   "bytes":"<hex of the raw frame>"}


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hidden | <code>string</code> | <code>false</code> | "true" to include fields tshark marks hide="yes" |
| payload | <code>string</code> | <code>false</code> | "true" to include the raw "data" proto layer   for unparsed payload bytes (otherwise passes `--disable-protocol data`   to tshark) |
| bytes | <code>string</code> | <code>true</code> | "false" to omit the "bytes" hex of each frame   ("bytes" carries at most the first 16KB of a frame; frame.cap_len has the   real captured length) |
| length | <code>number</code> |  | number of packets to dissect, capped at the   `tsharkMaxPackets` config value (which is also the default) |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| One JSON | <code>ndjson</code>| encoded packet per line |

<a name="/sessions/addtags"></a>

## /sessions/addtags API

POST - /api/sessions/addtags

Add tag(s) to individual session(s) by id or by query.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tags | <code>string</code> |  | Comma separated list of tags to add to session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to add tag(s) to |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
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
| tags | <code>string</code> |  | Comma separated list of tags to remove from session(s) |
| ids | <code>string</code> |  | Comma separated list of sessions to remove tag(s) from |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| segments | <code>string</code> | <code>&quot;no&quot;</code> | Whether to remove tags from linked session segments. Default is no. Options include:      no - Don't remove tags from linked segments      all - Remove tags from all linked segments      time - Remove tags from segments occurring in the same time period |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the remove tags operation was successful |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/sessions/summary"></a>

## /sessions/summary API

POST/GET - /api/sessions/summary

Backs the Arkime tab modular dashboard. Streams a JSON array whose first
element is the top-level stats/map/graph chunk (omitted when noStats is set),
followed by one chunk per requested widget, terminated by an empty object.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |
| widgets | <code>Array.&lt;object&gt;</code> | Per-widget aggregation specs. Each: { id (stable widget id), field (Arkime field exp; may be omitted with total:true), total (when true, aggregate the metrics over the whole result set instead of per field value — a single data item), length (top/bottom N, clamped 1-1000), order ('asc'|'desc'), orderBy ('value' default: the Top/Bottom N by the sort metric or session count; 'key': by the field's own value, so asc is the N smallest values or names), metricType ('sessions' or a numeric field exp aggregated per value), metrics (array of field exps, each aggregated per value — the multi-metric table's columns; falls back to [metricType]), metricAgg ('sum' default, 'avg', 'min', 'max', 'cardinality', or a percentile 'p50' (the median), 'p90', 'p95' or 'p99'; cardinality accepts any field, the others numeric fields only; in a multi viewer a cardinality is the largest cluster's count, a lower bound, and a percentile is refused), sortMetric (which of metrics orders the Top/Bottom N; 'sessions' or unset orders by session count), splitField (optional second field exp; each value's top splitLength sub-values are returned in data[].split for stacked/grouped bars), splitLength (sub-values per value, clamped 1-50, default 5), bucketInterval (numeric fields only: bucket the field's values into ranges of this width instead of one bucket per value; each data[] item is then a range, item '<start>-<end>' with range: [start, end]), other (when true and the metric is the session count or a sum, also return what falls outside the top N), box (when true, also return the spread of the first numeric metric over each value's sessions, for a box plot; refused by a multi viewer), expression (local filter ANDed with the global search) }. An empty array yields a stats-only response. At most 100 widgets. |
| fields | <code>string</code> | Legacy alternative to widgets: a comma-separated string of field exps (each becomes a default widget), at most 100. One of widgets or fields is required. |
| noStats | <code>boolean</code> | When true, skip the top-level stats/map/graph chunk (incremental single-widget fetches that don't change the dashboard totals). |
| length | <code>number</code> | Default top/bottom N for widgets that don't set their own. Default: 20 |
| order | <code>string</code> | Default sort order ('asc'|'desc') for widgets that don't set their own. Default: desc |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| summary | <code>array</code>| A streamed JSON array: [ {stats/map/graph}, {widget}, ..., {} ]. Each widget chunk carries { id, field, viewMode, metricType, metricAgg, length, order, orderBy, expression, data[] } or { id, field, error } on per |

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
| ids | <code>string</code> |  | The list of ids to return sessions for |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| segments | <code>boolean</code> | <code>false</code> | When set return linked segments |
| check | <code>boolean</code> | <code>false</code> | When set don't download anything, instead return JSON describing whether the sessions span more than one link type (needsPcapng) and so can only be downloaded as pcapng |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAP file with the sessions requested. A 400 JSON error with i18n api.sessions.pcapngRequired is returned instead when the sessions span more than one link type. |

**Example**  
```js
Returns pcap for sessions with the source IP of 1.2.3.4
  curl -v 'http://localhost:8005/api/sessions/pcap/anyfilename.pcap?date=-1&expression=ip.src%3D%3D1.2.3.4'
```
<a name="/sessions/pcapng"></a>

## /sessions/pcapng API

GET - /api/sessions/pcapng OR /api/sessions.pcapng

Retrieve the raw session data in pcapng format.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ids | <code>string</code> |  | The list of ids to return sessions for |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| segments | <code>boolean</code> | <code>false</code> | When set return linked segments |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAPNG file with the sessions requested |

<a name="/session/entire/_nodeName/_id/pcap"></a>

## /session/entire/:nodeName/:id/pcap API

GET - /api/session/entire/:nodeName/:id/pcap OR /api/session/entire/:nodeName/:id.pcap

Retrieve the pcap for a session given the session id and node name.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| check | <code>boolean</code> | <code>false</code> | When set don't download anything, instead return JSON describing whether the session spans more than one link type (needsPcapng) and so can only be downloaded as pcapng |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAP file with the session requested. A 400 JSON error with i18n api.sessions.pcapngRequired is returned instead when the session spans more than one link type. |

<a name="/session/entire/_nodeName/_id/pcapng"></a>

## /session/entire/:nodeName/:id/pcapng API

GET - /api/session/entire/:nodeName/:id/pcapng OR /api/session/entire/:nodeName/:id.pcapng

Retrieve the pcapng for a session given the session id and node name.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>pcap</code>| A PCAPNG file with the session requested |

<a name="/session/raw/_nodeName/_id/png"></a>

## /session/raw/:nodeName/:id/png API

GET - /api/session/raw/:nodeName/:id/png OR /api/session/raw/:nodeName/:id.png

Retrieve a bitmap image representation of packets in a session given the session id and node name.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;src&quot;</code> | Whether to retrieve the src (source) or dst (destination) packets bitmap image. Defaults to src. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| image | <code>image/png</code>| The bitmap image. |

<a name="/session/raw/_nodeName/_id"></a>

## /session/raw/:nodeName/:id API

GET - /api/session/raw/:nodeName/:id

Retrieve raw packets for a session given the session id and node name.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;src&quot;</code> | Whether to retrieve the src (source) or dst (destination) raw packets. Defaults to src. |

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
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

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
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| file | <code>file</code>| The file that matches the hash |

<a name="/delete"></a>

## /delete API

GET - /api/delete

Delete SPI and/or scrub PCAP data (remove permission required).


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ids | <code>string</code> |  | Comma separated list of sessions to delete |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) |  | This API supports a common set of parameters documented in the SessionsQuery section |
| removeSpi | <code>string</code> | <code>false</code> | Whether to remove the SPI data. |
| removePcap | <code>string</code> | <code>true</code> | Whether to remove the PCAP data. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the operation was successful |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/shareable"></a>

## /shareable API

POST - /api/shareable

Creates a shareable item.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create operation was successful. |
| text | <code>string</code>| The success/error message. |
| id | <code>string</code>| The ID of the new shareable item. |
| shareable | <code>object</code>| The new shareable item. |

<a name="/shareable/_id"></a>

## /shareable/:id API

GET - /api/shareable/:id

Gets a shareable item by ID. User must have view permission.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the get operation was successful. |
| shareable | <code>object</code>| The shareable item. |

<a name="/shareable/_id"></a>

## /shareable/:id API

PUT - /api/shareable/:id

Updates a shareable item. Only creator or editUsers/editRoles can update.
Creator and created date are not changed. Updated date is set to now.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update operation was successful. |
| text | <code>string</code>| The success/error message. |
| shareable | <code>object</code>| The updated shareable item. |

<a name="/shareable/_id"></a>

## /shareable/:id API

DELETE - /api/shareable/:id

Deletes a shareable item. Only creator or arkimeAdmin can delete.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete operation was successful. |
| text | <code>string</code>| The success/error message. |

<a name="/shareables"></a>

## /shareables API

GET - /api/shareables

Lists shareable items. Returns items user has permission to view/edit.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | Only list this type, omit to list every type |
| searchTerm | <code>string</code> |  | Substring match against name, description, type and creator |
| sort | <code>string</code> | <code>&quot;name&quot;</code> | Field to sort by: name, type, description, creator, created or updated |
| desc | <code>string</code> | <code>false</code> | "true" to sort descending |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| Array of shareable items with { id, type, name, description,
  data, creator, shared, viewUsers, viewRoles, editUsers, editRoles, canEdit, canDelete } |
| recordsTotal | <code>number</code>| Total records matching query |
| recordsFiltered | <code>number</code>| Total records after filtering |

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
| description | <code>string</code> | The optional description of this shortcut. |
| users | <code>string</code> | A comma separated list of users that can view this shortcut. |
| roles | <code>Array</code> | The roles that can view this shortcut. |

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
| description | <code>string</code> | The optional description of this shortcut. |
| users | <code>string</code> | A comma separated list of users that can view this shortcut. |
| roles | <code>Array</code> | The roles that can view this shortcut. |
| editRoles | <code>Array</code> | The roles that can edit this shortcut. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| shortcut | [<code>Shortcut</code>](#Shortcut)| The updated shortcut object. |
| success | <code>boolean</code>| Whether the update operation was successful. |
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

Retrieve OpenSearch/Elasticsearch health and stats
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
| start | <code>number</code> |  | The start time of data to return. Format is seconds since Unix EPOCH. |
| stop | <code>number</code> |  | The stop time of data to return. Format is seconds since Unix EPOCH. |
| step | <code>number</code> |  | The context step of the cubism graph in seconds. |
| interval | <code>number</code> | <code>60</code> | The time interval to search for. |
| size | <code>number</code> | <code>1440</code> | The size of the cubism graph. Defaults to 1440. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>array</code>| List of values to populate the cubism graph. |

<a name="/esstats"></a>

## /esstats API

GET - /api/esstats

Fetches a list of stats for each OpenSearch/Elasticsearch cluster.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of OpenSearch/Elasticsearch clusters by. |
| sortField | <code>string</code> | <code>&quot;nodeName&quot;</code> | The field to sort the OpenSearch/Elasticsearch clusters list by. |
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

Fetches a list of OpenSearch/Elasticsearch indices.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of OpenSearch/Elasticsearch indices by. |
| sortField | <code>string</code> | <code>&quot;index&quot;</code> | The field to sort the OpenSearch/Elasticsearch indices list by. |
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

Deletes an OpenSearch/Elasticsearch index (admin and remove access only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete index operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esindices/_index/optimize"></a>

## /esindices/:index/optimize API

POST - /api/esindices/:index/optimize

Optimizes an OpenSearch/Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true, the optimizeIndex function might block. Check the logs for errors. |

<a name="/esindices/_index/close"></a>

## /esindices/:index/close API

POST - /api/esindices/:index/close

Closes an OpenSearch/Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the close index operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esindices/_index/open"></a>

## /esindices/:index/open API

POST - /api/esindices/:index/open

Opens an OpenSearch/Elasticsearch index (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true, the openIndex function might block. Check the logs for errors. |

<a name="/esindices/_index/shrink"></a>

## /esindices/:index/shrink API

POST - /api/esindices/:index/shrink

Shrinks an OpenSearch/Elasticsearch index (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | The index name to shrink the index to. |
| numShards | <code>number</code> | The number of shards to shrink the index to. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the shrink operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks"></a>

## /estasks API

GET - /api/estasks

Fetches OpenSearch/Elasticsearch tasks.


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

Cancels an OpenSearch/Elasticsearch task (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel task operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks/_id/cancelwith"></a>

## /estasks/:id/cancelwith API

POST - /api/estasks/:id/cancelwith

Cancels an OpenSearch/Elasticsearch task by opaque id. Used to cancel running tasks
that a user has created allowing a user to cancel their own tasks.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel task operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/db/_db/queries"></a>

## /db/:db/queries API

GET - /api/db/:db/queries

Lists the queries running on a non OpenSearch/Elasticsearch db, like ClickHouse for the sessions.
The query text is only returned to dbAdmin users.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| db | <code>string</code> |  | The db, sessions, cluster or users. |
| filter | <code>string</code> |  | A regex to filter the user, db user or query by. |
| sortField | <code>string</code> | <code>&quot;elapsed&quot;</code> | The field to sort by. |
| desc | <code>boolean</code> | <code>true</code> | Sort descending. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array</code>| The queries: id, user, dbUser, app, state, elapsed, rowsRead, bytesRead, memory, cancelled, query, each backend fills what it can. |
| recordsTotal | <code>number</code>| The number of running queries. |
| recordsFiltered | <code>number</code>| The number of queries returned. |

<a name="/db/_db/queries/_id/kill"></a>

## /db/:db/queries/:id/kill API

POST - /api/db/:db/queries/:id/kill

Kills a query running on a non OpenSearch/Elasticsearch db (dbAdmin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| db | <code>string</code> | The db, sessions, cluster or users. |
| id | <code>string</code> | The query id from /api/db/:db/queries. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the query was found and killed. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/db/_db/tables"></a>

## /db/:db/tables API

GET - /api/db/:db/tables

Lists the tables, or for ClickHouse the table partitions, of a non OpenSearch/Elasticsearch db.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| db | <code>string</code> |  | The db, sessions, cluster or users. |
| filter | <code>string</code> |  | A regex to filter the table or partition by. |
| sortField | <code>string</code> | <code>&quot;table&quot;</code> | The field to sort by. |
| desc | <code>boolean</code> | <code>false</code> | Sort descending. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array</code>| The tables, each backend fills the fields it has: id, table, partition, rows, parts,
  patchParts, dead, bytes, compressed, uncompressed, tableBytes, indexBytes, memory, cached, first, last, modified,
  lastVacuum, lastAnalyze. |
| recordsTotal | <code>number</code>| The number of tables. |
| recordsFiltered | <code>number</code>| The number of tables returned. |

<a name="/db/_db/tables/_id/_action"></a>

## /db/:db/tables/:id/:action API

POST - /api/db/:db/tables/:id/:action
DELETE - /api/db/:db/tables/:id

Runs an action on a table or partition of a non OpenSearch/Elasticsearch db (dbAdmin only), the DELETE drops it
and also needs removeEnabled. ClickHouse can optimize and drop partitions, Postgres can vacuum tables.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| db | <code>string</code> | The db, sessions, cluster or users. |
| id | <code>string</code> | The table id from /api/db/:db/tables. |
| action | <code>string</code> | optimize or vacuum, the ones the db supports. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the action ran (an optimize or vacuum is only started). |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/estasks/cancelall"></a>

## /estasks/cancelall API

POST - /api/estasks/cancelall

Cancels all running OpenSearch/Elasticsearch tasks (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the cancel all tasks operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin"></a>

## /esadmin API

GET - /api/esadmin

Fetches all OpenSearch/Elasticsearch settings that a user can change (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| settings | <code>array</code>| List of ES settings that a user can change |

<a name="/esadmin/set"></a>

## /esadmin/set API

POST - /api/esadmin/set

Sets OpenSearch/Elasticsearch settings (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether saving the settings was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin/reroute"></a>

## /esadmin/reroute API

POST - /api/esadmin/reroute

Try to restart any shard migrations that have failed or paused (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the reroute was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin/flush"></a>

## /esadmin/flush API

POST - /api/esadmin/flush

Flush and refresh any data waiting in OpenSearch/Elasticsearch to disk (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true |
| text | <code>string</code>| The success message to (optionally) display to the user. |

<a name="/esadmin/unflood"></a>

## /esadmin/unflood API

POST - /api/esadmin/unflood

Try and clear any indices marked as flooded (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Always true |
| text | <code>string</code>| The success message to (optionally) display to the user. |

<a name="/esadmin/clearcache"></a>

## /esadmin/clearcache API

POST - /api/esadmin/clearcache

Try and clear the cache for all indices (requires the dbAdmin role).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether clearing the cache was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esadmin/allocation"></a>

## /esadmin/allocation API

GET - /api/esadmin/allocation

Provides an explanation for shard allocation in the cluster (requires the dbAdmin role).
Returns details about why shards are assigned or unassigned.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| index | <code>string</code> | Optional specific index name to explain |
| shard | <code>number</code> | Optional specific shard number to explain |
| primary | <code>boolean</code> | Optional whether the shard is primary (true) or replica (false) |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| allocation | <code>object</code>| The cluster allocation explanation including node decisions and shard state |

<a name="/esshards"></a>

## /esshards API

GET - /api/esshards

Fetches all OpenSearch/Elasticsearch shards


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>string</code> |  | Search text to filter the list of OpenSearch/Elasticsearch shards by. |
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

Exclude OpenSearch/Elasticsearch node by ip or name (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether exclude node operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esshards/_type/_value/include"></a>

## /esshards/:type/:value/include API

POST - /api/esshards/:type/:value/include

Include OpenSearch/Elasticsearch node by ip or name (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether include node operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/esshards/_index/_shard/delete"></a>

## /esshards/:index/:shard/delete API

POST - /api/esshards/:index/:shard/delete

Deletes an OpenSearch/Elasticsearch shard (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete shard operation was successful. |
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

<a name="/user/settings"></a>

## /user/settings API

GET - /api/user/settings

Retrieves an Arkime user's settings.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| settings | <code>ArkimeSettings</code>| The user's configured settings |

<a name="/user/settings"></a>

## /user/settings API

POST - /api/user/settings

Updates an Arkime user's settings.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update user settings operation was successful. |
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

<a name="/user/config/_page"></a>

## /user/config/:page API

GET - /api/user/config/:page

Fetches the configuration/layout information for a UI page for a user.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| config The configuration data for the page |

<a name="/views"></a>

## /views API

GET - /api/views

Retrieves Arkime views that a user can view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| views | [<code>Array.&lt;ArkimeView&gt;</code>](#ArkimeView)| A list of views a user has configured or has been shared. |

<a name="/view"></a>

## /view API

POST - /api/view

Creates an Arkime view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| view | [<code>ArkimeView</code>](#ArkimeView)| The new view data. |

<a name="/view/_id"></a>

## /view/:id API

DELETE - /api/view/:id

Deletes an Arkime view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/view/_id"></a>

## /view/:id API

PUT - /api/view/:id

Updates an Arkime view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update view operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/dashboards/system"></a>

## /dashboards/system API

GET - /api/dashboards/system

The dashboards Arkime ships and the ones an admin added to a dashboardsDir
directory (*.dashboard.json files). They are read only and visible to
every user; the Arkime tab opens one from ?dashboard=<id>.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>array</code>| The dashboards, each shaped like a summaryConfig
  shareable list entry: { id, type, name, description, data, system: true, canEdit: false, canDelete: false } |

<a name="ArkimeQuery"></a>

## ArkimeQuery Type

A query to be run periodically that can perform actions on sessions that match the queries. The query runs against sessions delayed by 90 seconds to make sure all updates have been completed for that session.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the query |
| enabled | <code>boolean</code> |  | Whether the query is enabled. If enabled, the query will run every 90 seconds. |
| lpValue | <code>number</code> |  | The last packet timestamp that was searched. Used to query for the next group of sessions to search. Format is seconds since Unix EPOCH. |
| lastRun | <code>number</code> |  | The time that the query was last run. Format is seconds since Unix EPOCH. |
| count | <code>number</code> |  | The count of total sessions that have matched this query. |
| lastCount | <code>number</code> |  | The count of sessions that have matched this query during its last run. |
| query | <code>string</code> |  | The search expression to apply when searching for sessions. |
| action | <code>string</code> | <code>&quot;tag&quot;</code> | The action to perform when sessions have matched. "tag" or "forward:clusterName". |
| creator | <code>string</code> |  | The id of the user that created this query. |
| tags | <code>string</code> |  | A comma separated list of tags to add to each session that matches this query. |
| notifier | <code>string</code> |  | A comma separated list of notifier IDs to alert when there are matches for this query. |
| lastNotified | <code>number</code> |  | The time that this query last sent a notification to the notifiers. Only notifies every 10 minutes. Format is seconds since Unix EPOCH. |
| lastNotifiedCount | <code>number</code> |  | The count of sessions that matched since the last notification was sent. |
| description | <code>string</code> |  | The description of this query. |
| created | <code>number</code> |  | The time that this query was created. Format is seconds since Unix EPOCH. |
| lastToggled | <code>number</code> |  | The time that this query was enabled or disabled. Format is seconds since Unix EPOCH. |
| lastToggledBy | <code>string</code> |  | The user who last enabled or disabled this query. |
| users | <code>string</code> |  | The list of userIds who have access to use this query. |
| roles | <code>string</code> |  | The list of roles who have access to use this query. |
| editRoles | <code>string</code> |  | The list of roles who have access to edit this query. |

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
| timestamp | <code>number</code> | The time that the request was made. Format is seconds since Unix EPOCH. |
| range | <code>number</code> | The date range of the request. Range is described in hours, -1 means all. |
| query | <code>string</code> | The query parameters of the request. |
| queryTime | <code>number</code> | The time it took for the response to be returned after the request was issued. |
| recordsTotal | <code>number</code> | The total number of items in the data set. |
| recordsFiltered | <code>number</code> | The number of items returned from searching the dataset (before paging). |
| recordsReturned | <code>number</code> | The number of items returned in the response (after paging). |
| body | <code>object</code> | The request body. |
| forcedExpression | <code>string</code> | The expression applied to the search as a result of a user's forced expression. Only visible to admins, normal users cannot see their forced expressions. |

<a name="Hunt"></a>

## Hunt Type

A packet search job that allows users to search within session packets for text.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| See_List | [<code>SessionsQuery</code>](#SessionsQuery) | This API supports a common set of parameters documented in the SessionsQuery section |

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
| lastPacketTime | <code>number</code> | The date of the last packet of the last searched session. Used to query for the next chunk of sessions to search. Format is milliseconds since Unix EPOCH. |
| created | <code>number</code> | The time that the hunt was created. Format is seconds since Unix EPOCH. |
| lastUpdated | <code>number</code> | The time that the hunt was last updated in the DB. Used to only update every 2 seconds. Format is seconds since Unix EPOCH. |
| started | <code>number</code> | The time that the hunt was started (put into running state). Format is seconds since Unix EPOCH. |
| errors | <code>array</code> | The list of errors that a hunt encountered. A hunt error includes:      value - The error text to display to the user.      time - The time the error was encountered.      node - The Arkime node that the hunt was searching sessions for when the error occurred. |
| notifier | <code>string</code> | The optional notifier name to fire when there is an error, or there are matches (every 10 minutes), or when the hunt is complete. |
| unrunnable | <code>boolean</code> | Whether an error has rendered the hunt unrunnable. |
| failedSessionIds | <code>array</code> | The list of sessions that have failed to be searched. Used to run the search against them again once the rest of the hunt is complete. |
| users | <code>array</code> | The list of users to be added to the hunt so they can view the results. |
| removed | <code>boolean</code> | Whether the hunt name and ID fields have been removed from the matched sessions. |

<a name="SessionsQuery"></a>

## SessionsQuery Parameter List

Many Arkime Session requests support a standard set of query parameters.
These parameters can be used to filter and sort the returned data.
For large queries, prefer the POST method to avoid URL length limits, which allows you to include parameters in the request body (these override any URL duplicates).
Ensure parameters with special characters are URL encoded when placed in the URL.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> | <code>1</code> | Perform the search from a specified number of hours ago until the present moment, where '-1' indicates searching all available data. |
| expression | <code>string</code> |  | The search expression string, ensure URL encoded |
| facets | <code>number</code> | <code>0</code> | 1 = include the aggregation information for maps and timeline graphs. |
| interval | <code>string</code> | <code>&quot;auto&quot;</code> | The timeline graph's bucket size: 'second', 'minute', 'hour', 'day', 'week', or 'auto' to pick one from the time range.      'hourOfWeek' buckets by the hour and folds the buckets into a week, so each <name>Histo series is [[slot, value], ...] with slot 0 = Monday 00:00 .. 167 = Sunday 23:00 in the timezone parameter's zone, and the graph carries hourOfWeek: true. |
| timezone | <code>string</code> | <code>&quot;UTC&quot;</code> | With interval=hourOfWeek, the IANA zone name (eg America/New_York) the hours are folded in; an unknown zone is UTC. |
| length | <code>number</code> | <code>100</code> | The number of items to return, beginning at start parameter, max is 2,000,000 |
| start | <code>number</code> | <code>0</code> | The entry to start at for pagination purposes. |
| startTime | <code>number</code> |  | If the date parameter is not set, this is the start time of data to return. Format is seconds since Unix EPOCH. |
| stopTime | <code>number</code> |  | If the date parameter is not set, this is the stop time of data to return. Format is seconds since Unix EPOCH. |
| view | <code>string</code> |  | The Arkime view name to apply before the expression. |
| order | <code>string</code> |  | Comma separated list of db field names to sort on. Data is sorted in order of the list supplied. Optionally can be followed by :asc or :desc for ascending or descending sorting. |
| fields | <code>string</code> |  | Comma separated list of db field names to return.      Default is ipProtocol, rootId, totDataBytes, client.bytes, server.bytes, firstPacket, lastPacket, source.ip, source.port, destination.ip, destination.port, network.packets, source.packets, destination.packets, network.bytes, source.bytes, destination.bytes, node, http.uri, source.geo.country_iso_code, destination.geo.country_iso_code, email.subject, email.src, email.dst, email.filename, dns.host, cert, irc.channel, http.xffGEO |
| bounding | <code>string</code> | <code>&quot;last&quot;</code> | Query sessions based on different aspects of a session's time. Options include:      'first' - First Packet: the timestamp of the first packet received for the session.      'last' - Last Packet: The timestamp of the last packet received for the session.      'both' - Bounded: Both the first and last packet timestamps for the session must be inside the time window.      'either' - Session Overlaps: The timestamp of the first packet must be before the end of the time window AND the timestamp of the last packet must be after the start of the time window.      'database' - Database: The timestamp the session was written to the database. This can be up to several minutes AFTER the last packet was received. |
| strictly | <code>boolean</code> | <code>false</code> | When set the entire session must be inside the date range to be observed, otherwise if it overlaps it is displayed. Overwrites the bounding parameter, sets bounding to 'both' |

<a name="Shortcut"></a>

## Shortcut Type

The shortcut object to store lists of values that can be used in search queries.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user that created the shortcut. |
| name | <code>string</code> |  | The name of the shortcut. |
| description | <code>string</code> |  | The description of the shortcut to display to users. |
| number | <code>Array.&lt;number&gt;</code> |  | A list of number values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| ip | <code>Array.&lt;string&gt;</code> |  | A list of ip values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| string | <code>Array.&lt;string&gt;</code> |  | A list of string values to use as the shortcut value. A shortcut must contain a list of numbers, strings, or ips. |
| users | <code>string</code> |  | A list of userIds that have access to this shortcut. |
| roles | <code>Array.&lt;string&gt;</code> |  | A list of Arkime roles that have access to this shortcut. |
| editRoles | <code>Array.&lt;string&gt;</code> |  | A list of Arkime roles that have edit access to this shortcut. |
| locked | <code>boolean</code> | <code>false</code> | Whether the shortcut is locked and must be updated using the db.pl script (can't be updated in the web application user interface). |

<a name="ESHealth"></a>

## ESHealth Type

The OpenSearch/Elasticsearch cluster health status and information.

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
| _timeStamp | <code>number</code> | timestamps in ms from unix epoch |

<a name="ArkimeView"></a>

## ArkimeView Type

A database view that can be applied to any search.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the view. |
| expression | <code>string</code> | The search expression to filter sessions. |
| sessionsColConfig | <code>ArkimeColumnConfig</code> | The Sessions column configuration to apply to the Sessions table when applying the view. |
| user | <code>string</code> | The user ID of the user who created the view. |
| users | <code>string</code> | The list of userIds who have access to use this view. |
| roles | <code>Array.&lt;string&gt;</code> | The list of roles who have access to use this view. |
| editRoles | <code>Array.&lt;string&gt;</code> | The list of roles who have access to edit this view. |


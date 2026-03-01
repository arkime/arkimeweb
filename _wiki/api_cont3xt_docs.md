<a name="/audit"></a>

## /audit API

Creates a new history audit log


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| audit | <code>Audit</code> | The history entry to create |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>Promise</code>| The promise that either resolves or rejects in error |

<a name="/audits"></a>

## /audits API

GET - /api/audits

Returns list of audit logs that the requesting user is allowed to view.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| searchTerm | <code>string</code> | an optional query parameter to filter on indicator, iType, and tags |
| startMs | <code>string</code> | an optional query parameter to specify the start of results (milliseconds since Unix EPOCH) |
| stopMs | <code>string</code> | an optional query parameter to specify the end of results (milliseconds since Unix EPOCH) |
| seeAll | <code>string</code> | an optional query parameter to request viewing all history (only works for admin users) |
| sortBy | <code>string</code> | an optional query parameter to specify the field to sort by |
| sortOrder | <code>string</code> | an optional query parameter to specify the order to sort by |
| itemsPerPage | <code>string</code> | an optional query parameter to specify the number of results to return |
| page | <code>string</code> | an optional query parameter to specify the page number (1-indexed) |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| audits | <code>Array.&lt;Audit&gt;</code>| A sorted array of audit logs that the logged |
| success | <code>boolean</code>| True if the request was successful, false otherwise |

<a name="/audit/_id"></a>

## /audit/:id API

DELETE - /api/audit/:id

Delete a log from history. Users can delete their own logs. Admins can delete any log.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete history log operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display. |

<a name="/settings"></a>

## /settings API

GET - /api/settings

Returns all the settings relevant for the cont3xt settings page

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| settings | <code>object</code>| General cont3xt settings |
| linkGroups | [<code>Array.&lt;LinkGroup&gt;</code>](#LinkGroup)| An array of link groups that the logged in user can view/edit |
| selectedOverviews | <code>object</code>| A mapping of the selected overview per iType, of shape {[iType]: overviewId} |

<a name="/settings"></a>

## /settings API

PUT - /api/settings

Updates the general cont3xt settings


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | General cont3xt settings for the logged in user |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/integration"></a>

## /integration API

GET - /api/integration

List out all the integrations. Integrations without any itypes are skipped.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| integrations | <code>Array.&lt;Integrations&gt;</code>| A map of integrations that the logged in user has configured |
| success | <code>boolean</code>| True if the request was successful, false otherwise |

<a name="/integration/search"></a>

## /integration/search API

POST - /api/integration/search

Fetches integration data


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The string to query integrations |
| doIntegrations | <code>Array.&lt;string&gt;</code> | A list of integration names to query |
| skipCache | <code>boolean</code> | Ignore any cached data and query all integrations again |
| skipChildren | <code>boolean</code> | Don't query integrations for sub-indicators |
| tags | <code>Array.&lt;string&gt;</code> | Tags applied at the time of search |
| viewId | <code>string</code> \| <code>undefined</code> | The ID of the view at the time of search (if any) |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| results | [<code>Array.&lt;IntegrationChunk&gt;</code>](#IntegrationChunk)| An array data chunks with the data |

<a name="/integration/_itype/_integration/search"></a>

## /integration/:itype/:integration/search API

POST - /api/integration/:itype/:integration/search

Fetches integration data about a single itype/integration


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The string to query the integration |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | [<code>IntegrationChunk</code>](#IntegrationChunk)| The chunk with either: purpose:data, purpose:fail, or purpose:error |

<a name="/integration/settings"></a>

## /integration/settings API

GET - /api/integration/settings

Return all the integration settings and current values that a user can set

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| settings | [<code>Array.&lt;IntegrationSetting&gt;</code>](#IntegrationSetting)| The settings for each integration for the logged in user |

<a name="/integration/settings"></a>

## /integration/settings API

PUT - /api/integration/settings

Updates the integration settings

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| settings | [<code>Array.&lt;IntegrationSetting&gt;</code>](#IntegrationSetting)| The integration settings to update for the logged in user |

<a name="/integration/stats"></a>

## /integration/stats API

GET - /api/integration/stats

Fetches stats about integrations

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| startTime | <code>number</code>| The start time of the cont3xt server (the start of the stats data) |
| stats | [<code>Array.&lt;Stat&gt;</code>](#Stat)| The integration stat data |
| itypeStats | [<code>Array.&lt;Stat&gt;</code>](#Stat)| The itype stat data |

<a name="/linkGroup"></a>

## /linkGroup API

GET - /api/linkGroup

Returns link groups that the requesting user is allowed to view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| linkGroups | [<code>Array.&lt;LinkGroup&gt;</code>](#LinkGroup)| An array of link groups that the logged in user can view |
| success | <code>boolean</code>| True if the request was successful, false otherwise |

<a name="/linkGroup"></a>

## /linkGroup API

PUT - /api/linkGroup

Creates a new link group


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| linkGroup | [<code>LinkGroup</code>](#LinkGroup) | The link group to create |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/linkGroup/_id"></a>

## /linkGroup/:id API

PUT - /api/linkGroup/:id

Updates a link group


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| linkGroup | [<code>LinkGroup</code>](#LinkGroup) | The link group to update |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/linkGroup/_id"></a>

## /linkGroup/:id API

DELETE - /api/linkGroup/:id

Deletes a link group

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/overview"></a>

## /overview API

PUT - /api/overview

Creates a new overview


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| req.body | [<code>Cont3xtOverview</code>](#Cont3xtOverview) | The overview to create |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/overview/_id"></a>

## /overview/:id API

PUT - /api/overview/:id

Updates an overview


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| req.params.id | <code>string</code> | The id of the overview to update |
| req.body | [<code>Cont3xtOverview</code>](#Cont3xtOverview) | The new value of the overview to update |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/overviews"></a>

## /overviews API

GET - /api/overview

Returns overviews that the requesting user is allowed to view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| overviews | [<code>Array.&lt;Cont3xtOverview&gt;</code>](#Cont3xtOverview)| An array of overviews that the logged in user can view |
| success | <code>boolean</code>| True if the request was successful, false otherwise |

<a name="/overview/_id"></a>

## /overview/:id API

DELETE - /api/overview/:id

Deletes an overview

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/views"></a>

## /views API

GET - /api/views

Returns views that the requesting user is allowed to view.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| views | [<code>Array.&lt;Cont3xtView&gt;</code>](#Cont3xtView)| An array of views that the logged in user can view |
| success | <code>boolean</code>| True if the request was successful, false otherwise |

<a name="/view"></a>

## /view API

POST - /api/view

Creates a new view


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>Cont3xtView</code>](#Cont3xtView) | The view to create |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/view/_id"></a>

## /view/:id API

PUT - /api/view/:id

Updates a view


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>Cont3xtView</code>](#Cont3xtView) | The view to update |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="/view/_id"></a>

## /view/:id API

DELETE - /api/view/:id

Deletes a view


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>Cont3xtView</code>](#Cont3xtView) | The view to delete |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| text | <code>string</code>| The success/error message to (optionally) display to the user |

<a name="IntegrationFieldDef"></a>

## IntegrationFieldDef Type

An Integration field definition object

The specifics on how to display a field


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | The field label to display to a user |
| path | <code>string</code> |  | The path (it can have dots) to the data for field, if not set the field is the same as name. For table type this will be the path to the array. |
| fields | [<code>Array.&lt;IntegrationField&gt;</code>](#IntegrationField) |  | Used with table data types, the list of fields to display in the table |
| defang | <code>boolean</code> |  | When true defang the string, change http to hXXp and change . to [.] |
| pivot | <code>boolean</code> |  | When set this field should be added to action menu for table entry that you can replace query with |
| join | <code>string</code> |  | Used with array data types, display with value as the separator on one line (example single: ', ') |
| defaultSortField | <code>string</code> |  | Used with table data types, sorts the table by this field initially |
| defaultSortDirection | <code>string</code> | <code>&quot;\&quot;desc\&quot;&quot;</code> | Used with table data types if defaultSortField is also set, sorts the table in this direction ('asc' or 'desc') |

<a name="IntegrationFieldType"></a>

## IntegrationFieldType Type

An Integration field type string

The data type of the field data


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;\&quot;string\&quot;&quot;</code> | The type of data displayed in the field                                 string - obvious                                 url - a url that should be made clickable                                 table - there will be a fields element                                 array - the field var will point to an array, display 1 per line unless join set                                 date - a date value                                 ms - a ms time value                                 seconds - a second time value                                 json - just display raw json, call in JSON.stringify(blah, false, 2) |

<a name="IntegrationTidbitContainer"></a>

## IntegrationTidbitContainer Type

An Integration tidbits object

Information for creating and ordering tidbits


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| order | <code>number</code> \| <code>undefined</code> | a default order to apply to all contained tidbits |
| fields | [<code>Array.&lt;IntegrationTidbit&gt;</code>](#IntegrationTidbit) | the objects that define individual tidbit displays |

<a name="IntegrationTidbit"></a>

## IntegrationTidbit Type

An Integration tidbit object

Information about how to display a field from an Integration's data to the primary indicator-tree display.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> \| <code>undefined</code> | The name of the field. If given, tidbit is displayed as key-value pair at bottom |
| type | [<code>IntegrationFieldType</code>](#IntegrationFieldType) | The type of data displayed in the field, default 'string' |
| field | [<code>IntegrationFieldDef</code>](#IntegrationFieldDef) | path to data |
| fieldRoot | [<code>IntegrationFieldDef</code>](#IntegrationFieldDef) \| <code>undefined</code> | path to element data from data root |
| display | <code>string</code> | how to display value in UI, default 'badge' |
| template | <code>string</code> \| <code>undefined</code> | pseudo template-string applied to value before postProcess |
| postProcess | <code>Array.&lt;string&gt;</code> \| <code>string</code> \| <code>undefined</code> | named filter(s) to pass value into |
| tooltip | <code>string</code> \| <code>undefined</code> | value used as tooltip |
| tooltipTemplate | <code>string</code> \| <code>undefined</code> | pseudo template-string filled with value & data for use in tooltip |
| order | <code>number</code> | number by which tidbits are sorted (ascending order), default 0 |
| precedence | <code>number</code> \| <code>undefined</code> | the higher, the more preferred among those with the same purpose |
| purpose | <code>string</code> \| <code>undefined</code> | when multiple valid tidbits have the same purpose,                                     only the one with the highest precedence will be kept |

<a name="IntegrationField"></a>

## IntegrationField Type

An Integration field object

Information about how to display a field within an Integration's data.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the field |
| type | [<code>IntegrationFieldType</code>](#IntegrationFieldType) | The type of data displayed in the field |
| field | [<code>IntegrationFieldDef</code>](#IntegrationFieldDef) | If not "name" and "type" it's an object describing the data |

<a name="IntegrationCard"></a>

## IntegrationCard Type

An Integration card object

Information about how to display the integration's data.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the card to display in the UI |
| fields | [<code>Array.&lt;IntegrationField&gt;</code>](#IntegrationField) | An array of field objects to outline how to display data for each field within the integration's data |

<a name="Integration"></a>

## Integration Type

An Integration object

Integrations are the configured data sources for Cont3xt.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| cachePolicy | <code>string</code> | Who can access the cached results of this integration's data ("shared") |
| cacheTimeout | <code>number</code> | How long results will be cached, -1 not cached |
| doable | <code>boolean</code> | Whether the user has access to execute this integration |
| icon | <code>string</code> | The relative url to the integrations icon |
| order | <code>number</code> | The order in which this integration displays in the UI |
| card | [<code>IntegrationCard</code>](#IntegrationCard) | Information on how to display the integration's data |
| tidbits | [<code>IntegrationTidbitContainer</code>](#IntegrationTidbitContainer) | Information on how to pull specialized fields into indicator-tree UI |


* [Integration](#Integration) : <code>object</code>
    * [.initialize()](#Integration.initialize)
    * [.register()](#Integration.register)

<a name="Integration.initialize"></a>

### Integration.initialize() (function)

Initialize the Integrations subsystem


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options.cache | <code>object</code> |  | The ArkimeCache implementation |
| options.getConfig | <code>function</code> |  | function used to get configuration items |
| options.integrationsPath | <code>string</code> | <code>&quot;__dirname/integrations/&quot;</code> | Where to find the integrations |

<a name="Integration.register"></a>

### Integration.register() (function)

Register an integration implementation


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| integration.name | <code>string</code> |  | The name of the integration |
| integration.itypes | <code>object</code> |  | An object of itypes to functions to call |
| integration.cacheable | <code>boolean</code> | <code>true</code> | Should results be cache |
| integration.noStats | <code>boolean</code> | <code>false</code> | Should we not save stats |
| integration.order | <code>number</code> | <code>10000</code> | What order should this integration be shown |

<a name="Itype"></a>

## Itype Type

The classification of the search string


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| itype | <code>string</code> | <code>&quot;\&quot;text\&quot;&quot;</code> | The type of the search                                ip, domain, url, email, phone, hash, or text |

<a name="DataChunkPurpose"></a>

## DataChunkPurpose Type

The classification of the data chunk

<a name="IntegrationChunk"></a>

## IntegrationChunk Type

Integration Data Chunk object

An chunk of data returned from searching integrations


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| purpose | [<code>DataChunkPurpose</code>](#DataChunkPurpose) | String discriminator to indicate the use of this data chunk |
| text | <code>string</code> | The message describing the error (on purpose: 'error') |
| indicators | <code>Array.&lt;Cont3xtIndicator&gt;</code> | The deduped, top-level indicators searched, given in search-order (purpose: 'init') |
| indicator | <code>Cont3xtIndicator</code> | The itype and query that correspond to this chunk of data (all purposes except: 'init', 'finish', and 'error') |
| total | <code>number</code> | The total number of integrations to query |
| sent | <code>number</code> | The number of integration results that have completed and been sent to the client |
| name | <code>string</code> | The name of the integration result within the chunk (purpose: 'data') |
| data | <code>object</code> | The data from the integration query (purpose: 'data'). This varies based upon the integration. The <a href="#integrationcard-type">IntegrationCard</a> describes how to present this data to the user. |
| parentIndicator | <code>Cont3xtIndicator</code> | The indicator that caused this integration/query to be run (purpose: 'link') |
| enhanceInfo | <code>object</code> | Curated data contributed from an integration to an indicator of a separate query (purpose: 'enhance') |

<a name="IntegrationSetting"></a>

## IntegrationSetting Type

Integration Settings object

The settings for an integration for the logged in user


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| globalConfiged | <code>boolean</code> | Whether integration is configured globally across cont3xt users or by this user (if a user has changed the settings for an integration, this is false) |
| locked | <code>boolean</code> | Whether integration is locked. Locked integrations use the globally configured settings. Users cannot update locked integrations. Any previously configured settings for locked integrations will be ignored in favor of the global configuration. |
| homePage | <code>string</code> | The link to the home page for this integration so a user can learn more |
| settings | <code>object</code> | The setting field definitions for this integration |
| values | <code>object</code> | The values that map to the setting fields for this integration (empty object if not set) |

<a name="Stat"></a>

## Stat Type

Integration Stat object

The statistic data for an integration


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| cacheFound | <code>number</code> | The number of entries found in the cache for this integration |
| cacheGood | <code>number</code> | The number of valid entries found in the cache for this integration |
| cacheLookup | <code>number</code> | The number of entries looked up in the cache for this integration |
| cacheRecentAvgMS | <code>number</code> | How long it takes to look up this integration from the cache |
| directError | <code>number</code> | The number of entries queried directly from the integration that failed |
| directFound | <code>number</code> | The number of entries found directly from the integration |
| directGood | <code>number</code> | The number of valid entries queried directly from the integration |
| directLookup | <code>number</code> | The number of entries queried directly from the integration |
| directRecentAvgMS | <code>number</code> | How long it takes to look up directly from the integration |
| name | <code>string</code> | The name of the integration |
| total | <code>number</code> | The number of times the integration was asked for a result |

<a name="Link"></a>

## Link Type

A Link object

Links are used to navigate to external sources.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the link |
| color | <code>string</code> | The color of the link |
| itypes | <code>Array.&lt;string&gt;</code> | The type of cont3xt results that pertain to this link |
| url | <code>string</code> | The url of the link. Links can include placeholder values that will be filled in with the data from the Cont3xt results |
| infoField | <code>string</code> | An optional text field to display as an informative tooltip. |
| externalDocUrl | <code>string</code> | An optional URL to link out to external documentation. |
| externalDocName | <code>string</code> | An optional name to label the external documentation. |

<a name="LinkGroup"></a>

## LinkGroup Type

A Link Group object

Link Groups are used to list links to external sources.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | The id of the link group |
| name | <code>string</code> | The name of the link group |
| creator | <code>string</code> | The creator of the link group |
| links | <code>Array.&lt;Links&gt;</code> | The array of links in this link group |
| editRoles | <code>array</code> | The Arkime roles that can edit this link group |
| viewRoles | <code>array</code> | The Arkime roles that can view this link group |
| _editable | <code>boolean</code> | Whether the logged in user is allowed to edit this link group |
| _viewable | <code>boolean</code> | Whether the logged in user is allowed to view this link group |

<a name="Cont3xtOverviewField"></a>

## Cont3xtOverviewField Type

A Cont3xt Overview Field Object

Cont3xt Overview Fields configure the display for an entry in an overview


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | The name of the integration to use a field from |
| field | <code>string</code> | The label of the field to use |
| alias | <code>string</code> \| <code>undefined</code> | Optional replacement label to display for this field in the overview |

<a name="Cont3xtOverview"></a>

## Cont3xtOverview Type

A Cont3xt Overview Object

Cont3xt Overviews are used to configure the default display for an itype


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | The id of the overview |
| creator | <code>string</code> | The creator of the overview |
| name | <code>string</code> | The name of the overview |
| title | <code>string</code> | The title of the overview, filled for display on the integration card panel |
| iType | <code>string</code> | The itype this overview can be displayed for |
| fields | [<code>Array.&lt;Cont3xtOverviewField&gt;</code>](#Cont3xtOverviewField) | The array of fields to be displayed by this overview |
| editRoles | <code>array</code> | The Arkime roles that can edit this overview |
| viewRoles | <code>array</code> | The Arkime roles that can view this overview |
| _editable | <code>boolean</code> | Whether the logged in user is allowed to edit this overview |
| _viewable | <code>boolean</code> | Whether the logged in user is allowed to view this overview |

<a name="Cont3xtView"></a>

## Cont3xtView Type

A Cont3xt View object

Cont3xt Views are used to save lists of integrations to apply to a query.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | The id of the view |
| name | <code>string</code> | The name of the view |
| creator | <code>string</code> | The creator of the view |
| integrations | <code>Array.&lt;string&gt;</code> | The array of integration names in this view |
| editRoles | <code>array</code> | The Arkime roles that can edit this view |
| viewRoles | <code>array</code> | The Arkime roles that can view this view |
| _editable | <code>boolean</code> | Whether the logged in user is allowed to edit this view |
| _viewable | <code>boolean</code> | Whether the logged in user is allowed to view this view |


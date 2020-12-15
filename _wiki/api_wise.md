<a name="api.getConfig"></a>

## api.getConfig API

Get from the config section a value or default


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section in the config file the key is in |
| name | <code>string</code> | The key to get from the section |
| [default] | <code>string</code> | the default value to return if key is not found in section |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The value found or the default value |

<a name="api.getConfigSections"></a>

## api.getConfigSections API

Get a list of all the sections int he config file

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>Array</code>| A list of all the sections in the config file |

<a name="api.getConfigSection"></a>

## api.getConfigSection API

Get the full config for a section


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section of the config file to return |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| A list of all the sections in the config file |

<a name="api.addField"></a>

## api.addField API

Add a field


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| addField | <code>string</code> | An encoded field definition |

<a name="api.addView"></a>

## api.addView API

Add a view


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the new view |
| input | <code>string</code> | An encoded view definition |

<a name="api.addSource"></a>

## api.addSource API

Activate a section of a source. Must be called if you want wise to query the source.
A section is an instance of a source, some sources can have multiple sections.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section name |
| src | <code>wiseSource</code> | A wiseSource object |

<a name="addSourceConfigDef"></a>

## addSourceConfigDef API

Add for each source config definition for the UI to use.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| sourceName | <code>string</code> | The source name |
| configDef | <code>object</code> | An array of objects of the config ALW |

<a name="/_ns_/nstest.html"></a>

## /\_ns\_/nstest.html API

GET - Health check URL

<a name="/fields"></a>

## /fields API

GET - Used by capture to retrieve all the fields created by wise sources


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [ver] | <code>integer</code> | <code>0</code> | Version of the encoded binary to return |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| binary | <code>binary</code>|  |

<a name="/views"></a>

## /views API

GET - Used by viewer to retrieve all the views being created by wise sources

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| All the views |

<a name="/fieldValueActions"></a>

## /fieldValueActions API

GET - Used by viewer to retrieve all the field value actions created by wise sources

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code> \| <code>array</code>| All the actions |

<a name="/get"></a>

## /get API

POST - Used by capture to lookup all the wise items


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ver | <code>integer</code> | <code>0</code> | The format of the post data, version 0 and 2 supported |
| hashes | <code>string</code> \| <code>array</code> |  | A comma separated list of md5 hashes of field arrays that the client knows about.                                If one of the hashes matches the current field array, then we don't send the field array. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>binary</code>| The encoded results |

<a name="/sources"></a>

## /sources API

GET - Used by wise UI to retrieve all the sources

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>array</code>| All the sources |

<a name="/source/_source/get"></a>

## /source/:source/get API

GET - Used by wise UI to retrieve the raw file being used by the section.
      This is an authenticated API and requires wiseService to be started with --webconfig.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| :source | <code>string</code> | The source to get the raw data for |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| All the views |

<a name="/source/_source/get"></a>

## /source/:source/get API

PUT - Used by wise UI to save the raw file being used by the source.
      This is an authenticated API and requires wiseService to be started with --webconfig.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| :source | <code>string</code> | The source to put the raw data for |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| All the views |

<a name="/config/defs"></a>

## /config/defs API

GET - Used by wise UI to retrieve all the configuration definitions for the various sources.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| object | <code>object</code>|  |

<a name="/config/get"></a>

## /config/get API

GET - Used by wise UI to retrieve the current config.
      This is an authenticated API and requires wiseService to be started with --webconfig.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| object | <code>object</code>|  |

<a name="/config/save"></a>

## /config/save API

PUT - Used by wise UI to save the current config.
      This is an authenticated API, requires the pin code, and requires wiseService to be started with --webconfig.

<a name="/types"></a>

## /types API

GET - Used by the wise UI to all the types known.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>array</code>| all the types |

<a name="/types/_source"></a>

## /types/:source API

GET - Used by the wise UI to retrieve all the types for a source, or if no source
      all the types known.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| {:source} | <code>string</code> | the source to get the types for |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>array</code>| all the types for the source |

<a name="/_source/_type/_key"></a>

## /:source/:type/:key API

GET - Query a single source for a key


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| {:source} | <code>string</code> | The source to get the results for |
| {:type} | <code>string</code> | The type of the key |
| {:key} | <code>string</code> | The key to get the results for |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code> \| <code>array</code>| The results for the query |

<a name="/_type/_key"></a>

## /:type/:key API

GET - Query all sources for a key


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| {:type} | <code>string</code> | The type of the key |
| {:key} | <code>string</code> | The key to get the results for |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code> \| <code>array</code>| The results for the query |

<a name="/stats"></a>

## /stats API

GET - Query for the stats

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| Object with array of stats per type and array of stats per source |

<a name="WISESource"></a>

## WISESource API

All wise sources need to inherit from this object


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | All the options |
| options.api | <code>object</code> |  | The api reference, will be saved in this.api |
| options.section | <code>string</code> |  | the name of the section, will be saved in this.section |
| [options.dontCache] | <code>boolean</code> | <code>false</code> | do not cache this source, the source handles itself |
| [options.cacheTimeout] | <code>integer</code> | <code>cacheAgeMin*60 or 60</code> | override the cacheAgeMin setting, -1 same as dont |
| [options.tagsSetting] | <code>boolean</code> | <code>false</code> | load the optional tags setting |
| [options.typeSetting] | <code>boolean</code> | <code>false</code> | load the required type setting |
| [options.formatSetting] | <code>boolean</code> | <code>false</code> | load the format setting |


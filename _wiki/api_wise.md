<a name="api.getConfig"></a>

## api.getConfig API

Get from the config section a value or default


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section in the config file the key is in |
| name | <code>string</code> | The key to get from the section |
| [d] | <code>string</code> | the default value to return if key is not found in section |

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


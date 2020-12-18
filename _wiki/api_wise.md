<a name="SimpleSource"></a>

## SimpleSource (class)

The SimpleSource base class implements some common functions for
sources that only have one type. Sources that extend this
class only need to worry about fetching the data, and
only need to implement the constructor and simpleSourceLoad.

Sources need to
* implement initSource
* call initSimple at the end of their constructor
* implement simpleSourceLoad

**Extends**: [<code>WISESource</code>](#WISESource)  

* [SimpleSource](#SimpleSource) ⇐ [<code>WISESource</code>](#WISESource)
    * [new SimpleSource(api, section, options)](#new_SimpleSource_new)
    * [.tagsResult](#WISESource+tagsResult)
    * [.format](#WISESource+format)
    * [.parse](#WISESource+parse)
    * [.type](#WISESource+type)
    * [.emptyResult](#WISESource+emptyResult)
    * [.dump()](#SimpleSource+dump)
    * [.initSimple()](#SimpleSource+initSimple) ⇒ <code>boolean</code>
    * [.load()](#SimpleSource+load)
    * *[.simpleSourceLoad(set, cb)](#SimpleSource+simpleSourceLoad)*
    * [.parseFieldDef(line)](#WISESource+parseFieldDef)
    * [.parseCSV(body, setCb, endCB)](#WISESource+parseCSV)
    * [.parseTagger(body, setCb, endCB)](#WISESource+parseTagger)
    * [.parseJSON(body, setCb, endCB)](#WISESource+parseJSON)
    * *[.getSourceRaw(cb)](#WISESource+getSourceRaw)*
    * *[.putSourceRaw(data, cb)](#WISESource+putSourceRaw)*

<a name="new_SimpleSource_new"></a>

### new SimpleSource(api, section, options) (constructor)

Create a simple source. The options formatSetting, tagsSetting, typeSetting will all be set to true automatically.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| api | [<code>WISESourceAPI</code>](#WISESourceAPI) | the api when source created |
| section | <code>string</code> | the section name |
| options | <code>object</code> | see WISESource constructor |
| options.reload | <code>integer</code> | If greater to zero, call simpleSourceLoad every options.reload minutes |

<a name="WISESource+tagsResult"></a>

### simpleSource.tagsResult (member)

The encoded tags result if options.tagsSetting was set to true

**Overrides**: [<code>tagsResult</code>](#WISESource+tagsResult)  
<a name="WISESource+format"></a>

### simpleSource.format (member)

The format of the source if options.formatSetting was set to true.

**Overrides**: [<code>format</code>](#WISESource+format)  
<a name="WISESource+parse"></a>

### simpleSource.parse (member)

{function} The parser function of the source if options.formatSetting was set to true.

**Overrides**: [<code>parse</code>](#WISESource+parse)  
<a name="WISESource+type"></a>

### simpleSource.type (member)

The wise item type of the source if options.typeSetting was set to true.

**Overrides**: [<code>type</code>](#WISESource+type)  
<a name="WISESource+emptyResult"></a>

### simpleSource.emptyResult (member)

A simple constant that should be used when needing to represent an empty result

**Overrides**: [<code>emptyResult</code>](#WISESource+emptyResult)  
<a name="SimpleSource+dump"></a>

### simpleSource.dump() (function)

Implemented for you

**Overrides**: [<code>dump</code>](#WISESource+dump)  
<a name="SimpleSource+initSimple"></a>

### simpleSource.initSimple() (function)

This function should be called by the constructor of the source when all
config is verified and the source is ready to go online.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>boolean</code>| On true the source was initialized with no issue |

<a name="SimpleSource+load"></a>

### simpleSource.load() (function)

Can be called by the source to force a reload of the data if it for some reason knows.

<a name="SimpleSource+simpleSourceLoad"></a>

### *simpleSource.simpleSourceLoad(set, cb)* (function)

Each simple source must implement this method.
It will be called inside initSimple and periodically if reloading is enabled.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| set | <code>function</code> | (key, value) the source should call the set function for each value it wants to load |
| cb | <code>function</code> | (err) |

<a name="WISESource+parseFieldDef"></a>

### simpleSource.parseFieldDef(line) (function)

Parse a field definition line and call the addField or addView as needed

**Overrides**: [<code>parseFieldDef</code>](#WISESource+parseFieldDef)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | the line to parse |

<a name="WISESource+parseCSV"></a>

### simpleSource.parseCSV(body, setCb, endCB) (function)

Util function to parse CSV formatted data

**Overrides**: [<code>parseCSV</code>](#WISESource+parseCSV)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+parseTagger"></a>

### simpleSource.parseTagger(body, setCb, endCB) (function)

Util function to parse tagger formatted data

**Overrides**: [<code>parseTagger</code>](#WISESource+parseTagger)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+parseJSON"></a>

### simpleSource.parseJSON(body, setCb, endCB) (function)

Util function to parse JSON formatted data

**Overrides**: [<code>parseJSON</code>](#WISESource+parseJSON)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+getSourceRaw"></a>

### *simpleSource.getSourceRaw(cb)* (function)

Get the raw source data for editing.
Source should implement this method if they want to support editing the data for a source.

**Overrides**: [<code>getSourceRaw</code>](#WISESource+getSourceRaw)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | (err, data) |

<a name="WISESource+putSourceRaw"></a>

### *simpleSource.putSourceRaw(data, cb)* (function)

Put the raw source data after editing.
Source should implement this method if they want to support editing the data for a source.

**Overrides**: [<code>putSourceRaw</code>](#WISESource+putSourceRaw)  

**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The full data for the source from UI |
| cb | <code>function</code> | (err) |

<a name="WISESourceAPI"></a>

## WISESourceAPI (class)

When sources are created they get an api object to interact with the wise service.


* [WISESourceAPI](#WISESourceAPI)
    * [.debug](#WISESourceAPI+debug) : <code>integer</code>
    * [.insecure](#WISESourceAPI+insecure) : <code>boolean</code>
    * [.getConfig(section, name, [default])](#WISESourceAPI+getConfig) ⇒ <code>string</code>
    * [.getConfigSections()](#WISESourceAPI+getConfigSections) ⇒ <code>string</code> \| <code>Array</code>
    * [.getConfigSection(section)](#WISESourceAPI+getConfigSection) ⇒ <code>object</code>
    * [.addField(field)](#WISESourceAPI+addField)
    * [.addView(name, view)](#WISESourceAPI+addView)
    * [.addSource(section, src)](#WISESourceAPI+addSource)
    * [.addSourceConfigDef(sourceName, configDef)](#WISESourceAPI+addSourceConfigDef)
    * [.createRedisClient()](#WISESourceAPI+createRedisClient)

<a name="WISESourceAPI+debug"></a>

### wiseSourceAPI.debug (member)

Current debug level of wiseService

<a name="WISESourceAPI+insecure"></a>

### wiseSourceAPI.insecure (member)

Is wiseService running in insecure mode

<a name="WISESourceAPI+getConfig"></a>

### wiseSourceAPI.getConfig(section, name, [default]) (function)

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

<a name="WISESourceAPI+getConfigSections"></a>

### wiseSourceAPI.getConfigSections() (function)

Get a list of all the sections in the config file

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>Array</code>| A list of all the sections in the config file |

<a name="WISESourceAPI+getConfigSection"></a>

### wiseSourceAPI.getConfigSection(section) (function)

Get the full config for a section


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section of the config file to return |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>object</code>| A list of all the sections in the config file |

<a name="WISESourceAPI+addField"></a>

### wiseSourceAPI.addField(field) (function)

Add a field


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | An encoded field definition |

<a name="WISESourceAPI+addView"></a>

### wiseSourceAPI.addView(name, view) (function)

Add a view


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the new view |
| view | <code>string</code> | An encoded view definition |

<a name="WISESourceAPI+addSource"></a>

### wiseSourceAPI.addSource(section, src) (function)

Activate a section of a source. Must be called if you want wise to query the source.
A section is an instance of a source, some sources can have multiple sections.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| section | <code>string</code> | The section name |
| src | [<code>WISESource</code>](#WISESource) | A WISESource object |

<a name="WISESourceAPI+addSourceConfigDef"></a>

### wiseSourceAPI.addSourceConfigDef(sourceName, configDef) (function)

Add for each source config definition for the UI to use.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| sourceName | <code>string</code> | The source name |
| configDef | <code>object</code> | An array of objects of the config ALW |

<a name="WISESourceAPI+createRedisClient"></a>

### wiseSourceAPI.createRedisClient() (function)

Create a redis client from the info in a section

**Params**: <code>string</code> redisType - what kind of redis  
**Params**: <code>string</code> section - section to get info  
<a name="WISESource"></a>

## WISESource (class)

All sources need to have the WISESource as their top base class.


* [WISESource](#WISESource)
    * [new WISESource(api, section, options)](#new_WISESource_new)
    * _instance_
        * [.tagsResult](#WISESource+tagsResult)
        * [.format](#WISESource+format)
        * [.parse](#WISESource+parse)
        * [.type](#WISESource+type)
        * [.emptyResult](#WISESource+emptyResult)
        * [.parseFieldDef(line)](#WISESource+parseFieldDef)
        * [.parseCSV(body, setCb, endCB)](#WISESource+parseCSV)
        * [.parseTagger(body, setCb, endCB)](#WISESource+parseTagger)
        * [.parseJSON(body, setCb, endCB)](#WISESource+parseJSON)
        * *[.getSourceRaw(cb)](#WISESource+getSourceRaw)*
        * *[.putSourceRaw(data, cb)](#WISESource+putSourceRaw)*
        * *[.dump(res)](#WISESource+dump)*
    * _static_
        * [.encodeResult()](#WISESource.encodeResult) ⇒ <code>buffer</code>
        * [.combineResults(results)](#WISESource.combineResults) ⇒ <code>Buffer</code>
        * [.result2JSON(results)](#WISESource.result2JSON) ⇒ <code>string</code>
        * [.request(url, file, cb)](#WISESource.request)
        * *[.initSource(api)](#WISESource.initSource)*

<a name="new_WISESource_new"></a>

### new WISESource(api, section, options) (constructor)

Should only be created by super(api, section, options) call


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| api | [<code>WISESourceAPI</code>](#WISESourceAPI) |  | the api when source created |
| section | <code>string</code> |  | the section name |
| options | <code>object</code> |  | All the options |
| [options.dontCache] | <code>boolean</code> | <code>false</code> | do not cache this source, the source handles itself |
| [options.cacheTimeout] | <code>integer</code> | <code>cacheAgeMin*60 or 60</code> | override the cacheAgeMin setting, -1 same as dont |
| [options.tagsSetting] | <code>boolean</code> | <code>false</code> | load the optional tags setting |
| [options.typeSetting] | <code>boolean</code> | <code>false</code> | load the required type setting |
| [options.formatSetting] | <code>boolean</code> | <code>false</code> | load the format setting |

<a name="WISESource+tagsResult"></a>

### wiseSource.tagsResult (member)

The encoded tags result if options.tagsSetting was set to true

<a name="WISESource+format"></a>

### wiseSource.format (member)

The format of the source if options.formatSetting was set to true.

<a name="WISESource+parse"></a>

### wiseSource.parse (member)

{function} The parser function of the source if options.formatSetting was set to true.

<a name="WISESource+type"></a>

### wiseSource.type (member)

The wise item type of the source if options.typeSetting was set to true.

<a name="WISESource+emptyResult"></a>

### wiseSource.emptyResult (member)

A simple constant that should be used when needing to represent an empty result

<a name="WISESource+parseFieldDef"></a>

### wiseSource.parseFieldDef(line) (function)

Parse a field definition line and call the addField or addView as needed


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | the line to parse |

<a name="WISESource+parseCSV"></a>

### wiseSource.parseCSV(body, setCb, endCB) (function)

Util function to parse CSV formatted data


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+parseTagger"></a>

### wiseSource.parseTagger(body, setCb, endCB) (function)

Util function to parse tagger formatted data


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+parseJSON"></a>

### wiseSource.parseJSON(body, setCb, endCB) (function)

Util function to parse JSON formatted data


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> | the raw CSV data |
| setCb | <code>function</code> | the function to call for each row found |
| endCB | <code>function</code> | all done parsing |

<a name="WISESource+getSourceRaw"></a>

### *wiseSource.getSourceRaw(cb)* (function)

Get the raw source data for editing.
Source should implement this method if they want to support editing the data for a source.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | (err, data) |

<a name="WISESource+putSourceRaw"></a>

### *wiseSource.putSourceRaw(data, cb)* (function)

Put the raw source data after editing.
Source should implement this method if they want to support editing the data for a source.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The full data for the source from UI |
| cb | <code>function</code> | (err) |

<a name="WISESource+dump"></a>

### *wiseSource.dump(res)* (function)

Dump the sources data to caller.
Source should implement this method if they want to support displaying the current state.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The express res object |

<a name="WISESource.encodeResult"></a>

### WISESource.encodeResult() (function)

Convert field ids and string values into the encoded form used in WISE.

This method tags a variable number of arguments, each in a pair of field id and string value.

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>buffer</code>| the endcoded results |

<a name="WISESource.combineResults"></a>

### WISESource.combineResults(results) (function)

Combine a array of encoded results into one encoded result


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| results | <code>object</code> \| <code>array</code> | Array of results |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>Buffer</code>| A single combined result |

<a name="WISESource.result2JSON"></a>

### WISESource.result2JSON(results) (function)

Convert an encoded combined results binary buffer into JSON string


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Buffer</code> | The combined results from encode |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code>| The JSON string |

<a name="WISESource.request"></a>

### WISESource.request(url, file, cb) (function)

Download a url and save to a file, if we already have the file and less than a minute old use that file.


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL to download |
| file | <code>string</code> | The file to save the results to |
| cb | <code>function</code> | (statusCode) The stats code result from the download |

<a name="WISESource.initSource"></a>

### *WISESource.initSource(api)* (function)

Every source needs to implement this method, usually with


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| api | [<code>WISESourceAPI</code>](#WISESourceAPI) | The api back into the WISE Service |

**Example**  
```js
exports.initSource = function (api) {
  api.addSourceConfigDef('sourcename', {
    singleton: false,
    name: 'sourcename',
    description: 'This is the best source ever',
    fields: [
      { name: 'type', required: true, help: 'The wise query type this source supports' },
      { name: 'tags', required: false, help: 'Comma separated list of tags to set for matches', regex: '^[-a-z0-9,]+' }
    ]
  });
  new TheSource(api);
}
```
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

<a name="/source/_source/put"></a>

## /source/:source/put API

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


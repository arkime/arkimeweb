<a name="/roles"></a>

## /roles API

GET - /api/roles

List all available Arkime roles

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| roles | [<code>Array.&lt;ArkimeRole&gt;</code>](#ArkimeRole)| The list of available Arkime roles |

<a name="/user"></a>

## /user API

GET - /api/user

Fetches the currently logged in user

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| user | [<code>Array.&lt;ArkimeUser&gt;</code>](#ArkimeUser)| The currently logged in user. |

<a name="/users"></a>

## /users API

POST - /api/users

Retrieves a list of users (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| data | [<code>Array.&lt;ArkimeUser&gt;</code>](#ArkimeUser)| The list of users configured. |
| recordsTotal | <code>number</code>| The total number of users. |
| recordsFiltered | <code>number</code>| The number of users returned in this result. |

<a name="/user"></a>

## /user API

POST - /api/user

Creates a new user (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the add user operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/_id"></a>

## /user/:id API

DELETE - /api/user/:id

Deletes a user (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete user operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/user/_id"></a>

## /user/:id API

POST - /api/user/:id

Updates a user (admin only).

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

<a name="ArkimeRole"></a>

## ArkimeRole Type

An Arkime Role

Roles are assigned to users to give them access to Arkime content

<a name="ArkimeUser"></a>

## ArkimeUser Type

The Arkime user object.


**Parameters**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The ID of the user. |
| userName | <code>string</code> |  | The name of the user (to be displayed in the UI). |
| enabled | <code>boolean</code> | <code>true</code> | Whether the user is enabled (or disabled). Disabled users cannot access the UI or APIs. |
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
| settings | <code>ArkimeSettings</code> |  | The Arkime app settings. |
| views | <code>object</code> |  | A list of views that the user can apply to their search. |
| notifiers | <code>object</code> |  | A list of notifiers taht the user can use. |
| columnConfigs | <code>object</code> |  | A list of sessions table column configurations that a user has created. |
| spiviewFieldConfigs | <code>object</code> |  | A list of SPIView page field configurations that a user has created. |
| tableStates | <code>object</code> |  | A list of table states used to render Arkime tables as the user has configured them. |
| welcomeMsgNum | <code>number</code> | <code>0</code> | The message number that a user is on. Gets incremented when a user dismisses a message. |
| lastUsed | <code>number</code> |  | The date that the user last used Arkime. Format is milliseconds since Unix EPOC. |
| timeLimit | <code>number</code> |  | Limits the time range a user can query for. |
| roles | <code>array</code> |  | The list of Arkime roles assigned to this user. |


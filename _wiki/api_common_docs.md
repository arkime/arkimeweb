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
| name | <code>string</code> | The name of the new notifier. |
| type | <code>type</code> | The type of notifier. |
| fields | <code>array</code> | The fields to configure the notifier. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the create notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| notifier | [<code>Notifier</code>](#Notifier)| If successful, the notifier with name sanitized and created/user fields added. |

<a name="/notifier/_id"></a>

## /notifier/:id API

PUT - /api/notifier/:id

Updates an existing notifier (admin only).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The new id of the notifier. |
| type | <code>type</code> | The new type of notifier. |
| fields | <code>array</code> | The new field values to configure the notifier. |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the update notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |
| notifier | [<code>Notifier</code>](#Notifier)| If successful, the updated notifier with name sanitized and updated field added/updated. |

<a name="/notifier/_id"></a>

## /notifier/:id API

DELETE - /api/notifier/:id

Deletes an existing notifier (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the delete notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

<a name="/notifier/_id/test"></a>

## /notifier/:id/test API

POST - /api/notifier/:id/test

Tests an existing notifier (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| Whether the test notifier operation was successful. |
| text | <code>string</code>| The success/error message to (optionally) display to the user. |

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

<a name="/users/min"></a>

## /users/min API

POST - /api/users/min

Retrieves a list of users (non-admin usable [with role status returned only for roleAssigners]).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| roleId | <code>string</code> | Optional roleId to match against |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code>| True if the request was successful, false otherwise |
| data | [<code>Array.&lt;ArkimeUserInfo&gt;</code>](#ArkimeUserInfo)| The list of users configured. |

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

<a name="/user/_id/assignment"></a>

## /user/:id/assignment API

POST - /api/user/:id/assignment

Updates whether a user has a certain role (admin & roleAssigners only).

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

<a name="Notifier."></a>

## Notifier.(type, fields) (function)

Checks that the notifier type is valid and the required fields are filled out


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of notifier that is being checked |
| fields | <code>Array</code> | The list of fields to be checked against the type of notifier                         to determine that all the required fields are filled out |

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
|  | <code>string</code> \| <code>undefined</code>| String message to describe check error or undefined if all is good |

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
| users | <code>Arrray</code> | The list of userIds who have access to use this notifier. |
| roles | <code>Array</code> | The list of roles who have access to use this notifier. |

<a name="ArkimeRole"></a>

## ArkimeRole Type

An Arkime Role

Roles are assigned to users to give them access to Arkime content<br>
Default roles include:<br>
arkimeAdmin - has administrative access to Arkime (can configure and update Arkime)<br>
arkimeUser - has access to Arkime<br>
cont3xtAdmin - has administrative access to Cont3xt (can configure and update Cont3xt)<br>
cont3xtUser - has access to Cont3xt<br>
parliamentAdmin - has administrative access to Parliament (can configure and update Parliament)<br>
parliamentUser - has access to Parliament (can view and interact with Parliament Issues)<br>
superAdmin - has access to all the applications and can configure anything<br>
usersAdmin - has access to configure users<br>
wiseAdmin - has administrative access to WISE (can configure and update WISE)<br>
wiseUser - has access to WISE

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
| roleAssigners | <code>array</code> |  | The list of userIds that can manage who has this (ROLE) |

<a name="ArkimeUserInfo"></a>

## ArkimeUserInfo Type

The Arkime user-info object (information provided to roleAssigners or non-admin users).


**Parameters**:

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user. |
| userName | <code>string</code> | The name of the user (to be displayed in the UI). |
| hasRole | <code>boolean</code> \| <code>undefined</code> | whether the user has the requested role            (only if a role was provided & the requester is a roleAssigner for it) |


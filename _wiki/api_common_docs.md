<a name="/users"></a>

## /users API

POST - /api/users

Retrieves a list of users (admin only).

**Returns**:

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;ArkimeUser&gt;</code>| The list of users configured. |
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


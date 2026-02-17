---
title: Roles
layout: wiki
permalink: "/roles"
---


<div class="full-height-and-width-container with-footer pt-3 pe-5 ps-5 pb-3" markdown="1">
# Arkime Roles
{: .section-header.mt-1 }

In Arkime 4.0 the concept of Roles was introduced to Arkime.
We will be moving our permission model over to use roles.
Starting with Arkime 4.3 we have strengthened the roles and clearly outlined the rules.
Starting with Arkime 6, system roles and many user permissions now support inheritance. For each permission, you can either force a specific value or inherit it from the user's assigned roles.

There are two classes of roles: System defined roles and User defined roles.

### The system defined roles include:
{: .subsection }

* <strong>superAdmin</strong> - Has all system roles assigned. Only superAdmin can create or edit other superAdmin users. Only superAdmin can assign the usersAdmin, arkimeAdmin, cont3xtAdmin, parliamentAdmin, and wiseAdmin role to another user.
* <strong>usersAdmin</strong> - Can create, update, and delete users (except for superAdmin users). Can assign and unassign non Admin roles to users. Can unassign Admin roles from users.
* <strong>arkimeUser</strong> - Can use Arkime application, also known as viewer
* <strong>arkimeAdmin</strong> - An arkimeAdmin is automatically assigned arkimeUser. An arkimeAdmin has extra ability to change Arkime configurations, view data for all Arkime Users (including superAdmins), and has different query limitations.
* <strong>cont3xtUser</strong> - Can use Cont3xt application
* <strong>cont3xtAdmin</strong> - An cont3xtAdmin is automatically assigned cont3xtUser. An cont3xtAdmin has extra ability to change Cont3xt configurations and view data for all Cont3xt Users (including superAdmins).
* <strong>parliamentUser</strong> - Can use the issues feature of parliament
* <strong>parliamentAdmin</strong> - A parliamentAmdmin is automatically a parliamentUser. A parliamentAdmin can configure the clusters and settings in parliament.
* <strong>wiseUser</strong> - View raw data for a WISE source and get all configurations.
* <strong>wiseAdmin</strong> - A wiseAdmin is automatically a wiseUser. A wiseAdmin can setup new wise sources and edit the source data.


User defined roles can be created and can reference system roles and some permissions.
Any system role referenced by a user role will automatically be inherited by the user.
For example if user role SecGroup is created and includes both arkimeUser and cont3xtUser,
any user assigned the SecGroup role will also have access to Arkime & Cont3xt even if the user
doesn't have the arkimeUser/cont3xtUser directly assigned.


### High level Role Rules:
{: .subsection }
* Only a user with the superAdmin role can create/modify/delete other users with the superAdmin role.
* Only a user with the superAdmin role can assign another user the arkimeAdmin, cont3xtAdmin, parliamentAdmin, wiseAdmin roles. However a usersAdmin can still modify everything else about non superAdmins.
* A user with the usersAdmin role but without the superAdmin role can add/modify/delete any user but a user with the superAdmin role. They can unassign Admin roles from non superAdmin users, but they can not assign Admin roles.
* The application Admin users can view application data for all users, including other Admin and superAdmins users
* webEnabled and headerAuthEnabled values are not inherited from roles. They must be set on each user individually.

### Creating User defined Roles Programmatically:
{: .subsection }

Behind the scenes, user defined roles are stored in the users database with a leading role: prefix.
You can use the arkime_add_user script to create a user defined role.
<code>/opt/arkime/bin/arkime_add_user.sh role:role-name "Role Name" passwordignored [other-options]</code>



</div>

---
title: Roles
layout: wiki
permalink: "/roles"
---


<div class="full-height-and-width-container with-footer pt-3 pr-5 pl-5 pb-3" markdown="1">

In arkime 4.x the concept of Roles was introduced to Arkime.
We will be moving our permission model over to use roles.

There are two classes of roles: System defined roles and User defined roles.

The system defined roles include:

* <strong>superAdmin</strong> - Has all system roles assigned. Only superAdmin can create or edit other superAdmin users.
* <strong>userAdmin</strong> - Can create and edit users (except for superAdmin users)
* <strong>arkimeUser</strong> - Can use Arkime application, also known as viewer
* <strong>arkimeAdmin</strong> - An arkimeAdmin is automatically assigned arkimeUser. An arkimeAdmin has extra ability to change Arkime configurations, view data for all Arkime Users (including superAdmins), and has different query limitations.
* <strong>cont3xtUser</strong> - Can use Cont3xt application
* <strong>cont3xtAdmin</strong> - An cont3xtAdmin is automatically assigned cont3xtUser. An cont3xtAdmin has extra ability to change Cont3xt configurations and view data for all Cont3xt Users (including superAdmins).
* <strong>parliamentUser</strong> - Can use the issues feature of parliament
* <strong>parliamentAdmin</strong> - A parliamentAmdmin is automatically a parliamentUser. A parliamentAdmin can configure the clusters and settings in parliament
* <strong>wiseUser</strong> - Can use the WISE UI
* <strong>wiseAdmin</strong> - A wiseAdmin is automatically a wiseUser. A parlamentAdmin can setup new wise sources and edit the source data.


User defined roles can be created and can reference system roles and some permissions.
Any system role referenced by a user role will automatically be inherited by the user.
For example if user role SecGroup is included and includes both arkimeUser and cont3xtUser,
and user assigned the SecGroup role will also have access to Arkime & Cont3xt even if the user
doesn't directly have the arkimeUser/cont3xtUser directly assigned.


High level Role Rules:
* Only a superAdmin can create/modify superAdmin user
* Only a superAdmin user can set another user as a arkimeAdmin, cont3xtAdmin, parliamentAdmin, wiseAdmin - however a usersAdmin can still modify everything else about non superAdmins
* usersAdmin can add/modify users
* The application Admin users can still view application data for other admin and superAdmins
 

</div>

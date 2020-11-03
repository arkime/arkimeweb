---
title: Tagger Format
layout: wiki
permalink: /taggerformat
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Tagger Format

---

### Basic

Simple tagger files contain one element of the same type per line

**Example:** list of IPs
{: .mb-0 }

```
10.0.0.1
10.0.0.2
10.0.0.3
```

---

### Set Existing Fields

Tagger files can also set other Arkime fields by appending a semicolon, the field name, and value.

**Example:** same list of IPs, but now we optionally set an extra tag and the dns.host name
{: .mb-0 }

```
10.0.0.1;tags=extratag
10.0.0.2;tags=extratag;dns.host=bad.example.com
10.0.0.3
```

---

### Set NEW Fields

It is also possible to create NEW fields inside the tagger file. These new fields are comments and must start with `#field:`. To save typing and bytes, it is possible to create shortcuts that are valid just for that file.

**Example:** same list of IPs, but now we create 2 new fields:`whatever.str` and `whatever.int`, plus create a shortcut for the tags field. Note that "str" and "int" are the names of the fields and not data types. The new fields will show up in SPI view in a new group called "whatever."
{: .mb-0 }

```
#field:whatever.str;kind:lotermfield;count:true;friendly:A String;db:whatever.str-term;help:Help for String;shortcut:0
#field:whatever.int;kind:integer;count:true;friendly:A Integer;db:whatever.dbint;help:Help for integer;shortcut:1
#field:tags;shortcut:2
10.0.0.1;0=string;1=1;2=atag
10.0.0.2;tags=canstillusefullname
10.0.0.3
```

**Note:**  After adding a new field you must restart the Viewer.

**Note:**  See the Definitions section below for definitions of the fields used in this example.

---

### Set a View Template

When the tagger format is used with the WISE plugin it is also possible to specify the view to use by using a leading #view:. The view section is written in the pug templating language which is very sensitive to spaces. Look at `viewer/views/sessionDetail.pug` for examples and ideas.

**Example:** same as above, but now have a view for the whatever fields
{: .mb-0 }

```
#field:whatever.str;kind:lotermfield;count:true;friendly:A String;db:whatever.str-term;help:Help for String;shortcut:0
#field:whatever.int;kind:integer;count:true;friendly:A Integer;db:whatever.dbint;help:Help for integer;shortcut:1
#field:tags;shortcut:2
#view:if (session.whatever)
#view:  div.sessionDetailMeta.bold Whatever
#view:  dl.sessionDetailMeta
#view:    +arrayList(session.whatever, 'str-term', 'Str', 'whatever.str')
#view:    +arrayList(session.whatever, 'dbint', 'Ints', 'whatever.int')
10.0.0.1;0=string;1=1;2=atag
10.0.0.2;tags=canstillusefullname
10.0.0.3
```

---

### Definitions

##### Field definition
{: .mb-0}

Setting | Default | Description
--------|---------|------------
field | REQUIRED | The field expression
kind | REQUIRED | ip, lotermfield, termfield, uptermfield, lotextfield, textfield, uptextfield (**Note:** see the Valid values for "kind" (data type) table for kind descriptions)
count | false | Track number of items with a .cnt field auto created
friendly | fieldname | A SHORT description, used to describe fields in field labels
db | REQUIRED | The DB field name, prior to Arkime 1.x MUST end with -term for term fields which is what you want for most strings. With Arkime 1.x -term shouldn't be used.
group | Before first dot in field or general | Field category
help | fieldname | Help to describe more information about the field
shortcut | NONE | Used when loading file
nolinked | false | (Since 2.0.1) When true, the data in this field will not be set on linked sessions
noutf8 | false | (Since 2.1.1) When true, the data in this field is not treated as utf-8 automatically
{: .table .table-striped .table-sm .mb-4 }

##### Valid values for "kind" (data type)
{: .mb-0 }

Name | Description
-----|------------
ip | ip
lotextfield | lower case tokenized string (no longer supported with Arkime 1.x)
textfield | tokenized string
lotermfield | lower case non tokenized string
termfield | non tokenized string
uptermfield | upper case non tokenized string
uptextfield | uppercase tokenized string (no longer supported with Arkime 1.x)
integer | integer
{: .table .table-striped .table-sm .mb-4 }

</div>

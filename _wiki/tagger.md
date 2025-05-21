---
title: Tagger Plugin
layout: wiki
permalink: "/tagger"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Tagger Plugin
{: .section-header.mt-1 }

The Tagger plugin allows you to automatically assign tags (or other fields) when certain content matches the item in the tagfile.

### Tagging by five types of data is currently possible:
{: .subsection }

* IP address
* Host(name)
* md5
* email (fields)
* uri (fields).

To get started you will need to `uncomment` `tagger.so`  plugin in config file.

### Next, prepare your tagger files.
{: .subsection}

Each tagger file is a simple text file with one item per line.
The tagger plugin will look for matches in the content and assign the tags accordingly.
All items in a single tagger file will only match against the same field type, so you will need multiple tagger files to maatch all 5 types of data.
The filename used will also be added as a tag to matching sessions.

So for example:
* Place your IPs into `iptagdata`
* Hosts into `hosttagdata`
* md5s into `md5tagdata`
* email fields into `emailtagdata`
* uri fields into `uritagdata`

You do NOT need to use these filenames, they are just examples.

### Once done, you should be able to upload content with `taggerUpload.pl` script:
{: .subsection}

 ```
/opt/arkime/bin/taggerUpload.pl localhost:9200 ip iptagdata tag tag .. tag
/opt/arkime/bin/taggerUpload.pl localhost:9200 host hosttagdata tag ..
/opt/arkime/bin/taggerUpload.pl localhost:9200 md5 md5tagdata tag
/opt/arkime/bin/taggerUpload.pl localhost:9200 email emailtagdata tag
/opt/arkime/bin/taggerUpload.pl localhost:9200 uri uritagdata tag
```


The simplest version of the Tagger file format is a list of items; one item per line. Advanced format parameters are also supported. Please see [TaggerFormat](taggerformat) for details.

</div>

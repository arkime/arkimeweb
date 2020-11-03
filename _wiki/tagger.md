---
title: Tagger Plugin
layout: wiki
permalink: "/tagger"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Tagger Plugin

---

The Tagger plugin allows you to automatically assign tags when certain content matches the item in the tagfile.

##### Tagging by five types of data is currently possible:
{: .mb-0}

* IP address
* Host(name)
* md5
* email (fields)
* uri (fields).

To get started you will need to `uncomment` `tagger.so`  plugin in config file.

##### Next, prepare and upload your tagger files.
{: .mb-0}

* Place your IPs into `iptagdata`
* Hosts into `hosttagdata`
* md5s into `md5tagdata`
* email fields into `emailtagdata`
* uri fields into `uritagdata`

##### Once done, you should be able to upload content with `taggerUpload.pl` script:
{: .mb-0}

 ```
./capture/plugins/taggerUpload.pl localhost:9200 ip iptagdata tag tag .. tag
./capture/plugins/taggerUpload.pl localhost:9200 host hosttagdata tag ..
./capture/plugins/taggerUpload.pl localhost:9200 md5 md5tagdata tag
./capture/plugins/taggerUpload.pl localhost:9200 email emailtagdata tag
./capture/plugins/taggerUpload.pl localhost:9200 uri uritagdata tag
```


The simplest version of the Tagger file format is a list of items; one item per line. Advanced format parameters are also supported. Please see [TaggerFormat](taggerformat) for details.

</div>

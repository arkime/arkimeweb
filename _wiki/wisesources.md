---
title: Adding New WISE Sources
layout: wiki
permalink: "/wisesources"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Adding New WISE Sources

Adding a new source to WISE is a fairly easy task.  The framework handles most caching and configuration needs leaving the developer to focus on retrieving the data and converting it to a format that Arkime understands.  The best way to learn is to look at other sources.

All sources need to be named `source.something.js` and must contain a class that inherits from WISESource.

---

## Creating Fields

Each source needs to specify which fields it will be setting.  This is done by calling `api.addField` with information about the field.  Don't worry about calling `api.addField` multiple times for the same field as it will only be added once.  More information about specifying the field definition can be found [here](taggerformat).

---

## Retrieving Data

There are usually only two general types of sources:  
1. Sources that load data into memory - refreshing when needed  
2. Sources that make an API call to retrieve data.

In both cases the results will need to be converted from whatever form they are in into a special encoded form that WISE understands.

### Memory data

For memory data, sources should use the `HashTable` package to store the data which is loaded into memory.  An interval should be setup to occasionally reload the data.  The `cacheTimeout` variable should be set to -1 so the wiseService doesn't actually cache the data as it is already loaded into memory.

### API Data

API data sources only need to have routines to fetch the data from the API when requests come in.

---

## Creating Views

### Template
```
    var wiseSource     = require('./wiseSource.js')
      , util           = require('util')
      , HashTable      = require('hashtable')
      ;

    //////////////////////////////////////////////////////////////////////////////////
    function SourceName (api, section) {
      SourceName.super_.call(this, api, section);

      // Get variables needed
      this.key          = api.getConfig(section, "key");

      // Check if variables needed are set, if not return
      if (this.key === undefined) {
        return console.log(this.section, "- No export key defined");
      }

      // Setup any other things
      this.host = "www.example.com";

      // Create fields that will be set in Arkime
      this.typeField = this.api.addField("field:thesource.type;db:thesource.type-term;kind:lotermfield;friendly:Type;help:Indicator Type;count:true");

      // Create view that will be used in Arkime
      this.api.addView("thesource",
        "if (session.thesource)\n" +
        "  div.sessionDetailMeta.bold thesource\n" +
        "  dl.sessionDetailMeta\n" +
        "    +arrayList(session.thesource, 'type-term', 'Type', 'thesource.type')\n";

      // Optionally create any special right click actions
      this.api.addRightClick("thesourcetype", {name:"TheSource", url:"https://" + this.host + "/search.php?search=%TEXT%", field:"thesource.type"});

      // Memory data sources will have this section to load their data
      // this.cacheTimeout = -1;
      // setImmediate(this.load.bind(this));
      // setInterval(this.load.bind(this), X*60*60*1000); // Reload every X hours
      // this.data = new HashTable();

      // Add the source as available
      this.api.addSource("thesource", this);
    }
    util.inherits(SourceName, wiseSource);
    //////////////////////////////////////////////////////////////////////////////////
    // Used for memory data sources
    SourceName.prototype.load = function() {
      var self = this;

      this.data.clear();

      Code to get all the data

      For each row that needs to be added to memory
        var encoded = wiseSource.encode(self.typeField, row.type
                                        self.someOtherField, row.someOtherField);
        self.data.put(row.key, {num: 2, buffer: encoded});
    }
    //////////////////////////////////////////////////////////////////////////////////
    // Implement if domain lookups are supported
    SourceName.prototype.getDomain = function(domain, cb) {
    };
    //////////////////////////////////////////////////////////////////////////////////
    // Implement if ip lookups are supported
    SourceName.prototype.getIp = function(ip, cb) {
    };
    //////////////////////////////////////////////////////////////////////////////////
    // Implement if md5 lookups are supported
    SourceName.prototype.getMd5 = function(md5, cb) {
    };
    //////////////////////////////////////////////////////////////////////////////////
    // Implement if email lookups are supported
    SourceName.prototype.getEmail = function(email, cb) {
    };
    //////////////////////////////////////////////////////////////////////////////////
    // Function called by WISE when file loaded
    exports.initSource = function(api) {
      var source = new SourceName(api, "thesource");
    };
```

</div>

---
title: Adding New WISE Sources
layout: wiki
permalink: "/wisesources"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Adding New WISE Sources

Adding a new source to WISE is a fairly easy task.  The framework handles most caching and configuration needs leaving the developer to focus on retrieving the data and converting it to a format that Arkime understands.  The best way to learn is to look at other sources.

All sources need to be named `source.something.js` and must contain a class that extends WISESource.

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

For memory data, sources should use javsscript `Map` to store the data which is loaded into memory.  An interval should be setup to occasionally reload the data.  The `cacheTimeout` variable should be set to -1 so the wiseService doesn't actually cache the data as it is already loaded into memory inside your source.

### API Data

API data sources only need to have routines to fetch the data from the API when requests come in.

---

## Creating Views

### Template
```
    const fs = require('fs');
    const WISESource = require('./wiseSource.js');

    class SourceName extends WISESource {
      // ----------------------------------------------------------------------------
      constructor (api, section) {
        super(api, section, { dontCache: true });
        this.key = api.getConfig('sourcename', 'key');
        this.host = api.getConfig('sourcename', 'host');

        if (this.key === undefined) {
          console.log(this.section, '- No export key defined');
          return;
        }

        if (this.host === undefined) {
          console.log(this.section, '- No server host defined');
          return;
        }

        this.ips = new Map();
        this.domains = new Map();
        this.emails = new Map();
        this.md5s = new Map();

        this.idField = this.api.addField('field:sourcename.id;db:sourcename.id;kind:integer;friendly:Id;help:SourceName Reference ID;shortcut:0;count:true');
        this.typeField = this.api.addField('field:sourcename.type;db:sourcename.type;kind:lotermfield;friendly:Type;help:Indicator Type;shortcut:1;count:true');

        this.api.addView('sourcename',
          'if (session.sourcename)\n' +
          '  div.sessionDetailMeta.bold SourceName\n' +
          '  dl.sessionDetailMeta\n' +
          "    +arrayList(session.sourcename, 'id', 'Id', 'sourcename.id')\n" +
          "    +arrayList(session.sourcename, 'type', 'Type', 'sourcename.type')\n"
        );

        this.api.addValueAction('sourcenameid', { name: 'SourceName', url: `https://${this.host}/network/%TEXT%`, fields: 'sourcename.id' });

        setImmediate(this.loadFile.bind(this));
        setInterval(this.loadFile.bind(this), 24 * 60 * 60 * 1000); // Reload file every 24 hours

        this.api.addSource('sourcename', this, ['domain', 'email', 'ip', 'md5']);
      }

      parseFile () {
          // Code that does stuff here
      }

      // ----------------------------------------------------------------------------
      loadFile () {
        console.log(this.section, '- Downloading files');
        WISESource.request('https://' + this.host + '/export/moloch/?export_key=' + this.key, '/tmp/stuff.json', (statusCode) => {
          if (statusCode === 200 || !this.loaded) {
            this.loaded = true;
            this.parseFile();
          }
        });
      };

      // ----------------------------------------------------------------------------
      getDomain (domain, cb) {
        const domains = this.domains;
        cb(null, domains.get(domain) || domains.get(domain.substring(domain.indexOf('.') + 1)));
      };

      // ----------------------------------------------------------------------------
      getIp (ip, cb) {
        cb(null, this.ips.get(ip));
      };

      // ----------------------------------------------------------------------------
      getMd5 (md5, cb) {
        cb(null, this.md5s.get(md5));
      };

      // ----------------------------------------------------------------------------
      getEmail (email, cb) {
        cb(null, this.emails.get(email));
      };

      // ----------------------------------------------------------------------------
      itemCount () {
        return this.ips.size + this.domains.size + this.md5s.size + this.emails.size;
      };

      // ----------------------------------------------------------------------------
      dump (res) {
        ['ips', 'domains', 'emails', 'md5s'].forEach((ckey) => {
          res.write(`${ckey}:\n`);
          this[ckey].forEach((value, key) => {
            const str = `{"key": "${key}", "ops":\n` +
              WISESource.result2JSON(value) + '},\n';
            res.write(str);
          });
        });
        res.end();
      };
    }

    // ----------------------------------------------------------------------------
    exports.initSource = function (api) {
      api.addSourceConfigDef('sourcename', {
        singleton: true,
        name: 'sourcename',
        description: 'SourceName source',
        link: 'https://arkime.com/wise#sourcename',
        types: ['ip', 'domain', 'md5', 'email'],
        cacheable: false,
        displayable: true,
        fields: [
          { name: 'key', password: true, required: true, help: 'The API key' },
          { name: 'host', required: true, help: 'Server hostname location' }
        ]
      });

      return new SourceName(api, 'sourcename');
    };
```

</div>

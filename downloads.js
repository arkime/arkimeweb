'use strict';

function parseXML (xml) {
  let files = $(xml).find('ListBucketResult').find('Contents');
  let downloads = {};
  let nightlies = { title:'Nightly', downloads:[] };
  let acommities = { title:'Arkime Latest Commit', downloads:[] };
  let mcommities = { title:'Arkime/Moloch Hybrid Latest Commit', downloads:[] };
  const oses = {
    'arch.x86': 'Arch',
    centos6: 'Centos 6',
    centos7: 'Centos 7',
    centos8: 'Centos 8',
    ubuntu16: 'Ubuntu 16.04',
    ubuntu18: 'Ubuntu 18.04',
    ubuntu20: 'Ubuntu 20.04',
    ubuntu22: 'Ubuntu 22.04'
  };

  for (let i = 0, len = files.length; i < len; ++i) {
    let file = $(files[i]);
    let key  = file.find('Key').text();

    if (key.startsWith('builds/')) {
      let keyArr = key.split('/');
      let os     = keyArr[1];
      let vers   = keyArr[2];
      let time   = new Date(file.find('LastModified').text());

      time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)}`;

      let uniqueVers = vers.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/g);

      let osTitle = os.replace('-', ' ');
      osTitle = osTitle.charAt(0).toUpperCase() + osTitle.slice(1);

      let download = {
        url  : `https://s3.amazonaws.com/files.molo.ch/${key}`,
        title: osTitle
      };

      if (!uniqueVers && vers.includes('nightly')) {
        if (!nightlies.time) { nightlies.modified = time; }
        nightlies.downloads.push(download);
        continue;
      }

      uniqueVers = uniqueVers[0];

      const arkimeOrMoloch = key.match(/(arkime|moloch)/g);

      // The downloads key has arkime/moloch in the name so we have both entries
      // We uppercase MOLOCH so it sorts before arkime, because we reverse sort and need it to be after
      let downloadKey;
      if (arkimeOrMoloch[0] === 'arkime') {
        downloadKey = `${uniqueVers}-arkime`;
      } else  {
        downloadKey = `${uniqueVers}-MOLOCH`;
      }

      // group by version
      if (!downloads.hasOwnProperty(downloadKey)) {
        // 2.4 & below is Moloch
        // 2.7 and above but named moloch is Hybrid
        // named arkime is Arkime
        let title;
        if (arkimeOrMoloch[0] === 'arkime')
          title = 'Arkime';
        else
          title = (uniqueVers.match(/^([0-1]|2\.[0-4])/) ? 'Moloch' : 'Arkime/Moloch Hybrid');
        downloads[downloadKey] = {
          title     : `${title} ${uniqueVers}`,
          downloads : [download],
          modified  : time
        };
      } else {
        downloads[downloadKey].downloads.push(download);
      }
    } else if (key.startsWith('moloch-master')) {
      const keyArr = key.split(key[13]);
      const os = keyArr[1];
      let time = new Date(file.find('LastModified').text());
      time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)} ${('0'+time.getHours()).slice(-2)}:${('0'+time.getMinutes()).slice(-2)}:${('0'+time.getSeconds()).slice(-2)}`;

      const osTitle = oses[os];

      if (!osTitle) { continue; }

      let download = {
        url  : `https://s3.amazonaws.com/files.molo.ch/${key}`,
        title: osTitle
      };

      mcommities.modified = time;
      mcommities.downloads.push(download);
    } else if (key.startsWith('arkime-main')) {
      const keyArr = key.split(key[11]);
      const os = keyArr[1];
      let time = new Date(file.find('LastModified').text());
      time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)} ${('0'+time.getHours()).slice(-2)}:${('0'+time.getMinutes()).slice(-2)}:${('0'+time.getSeconds()).slice(-2)}`;

      const osTitle = oses[os];

      if (!osTitle) { continue; }

      let download = {
        url  : `https://s3.amazonaws.com/files.molo.ch/${key}`,
        title: osTitle
      };

      acommities.modified = time;
      acommities.downloads.push(download);
    }
  }

  return {
    downloads: downloads,
    nightlies: nightlies,
    acommities: acommities,
    mcommities: mcommities,
    sortedVersions: Object.keys(downloads).sort().reverse()
  };
}

function buildDownloadVersionRow (version, btnType, osList) {
  let html = `<div class="row d-flex flex-row justify-content-around">
               <div class="p-2">
                 <div class="btn-fw"><strong>${version.title}</strong></div>
                 <div class="time"><small>${version.modified}</small></div>
               </div>`;

  let downloads = version.downloads;

  let i, d, len;
  for (i = 0, len = osList.length; i < len; ++i) {
    for (d = 0; d < downloads.length; d++) {
      if (downloads[d].title === osList[i]) {
        let download = downloads[d];
        html += `<div class="p-2">
                   <a href="${download.url}" class="btn btn-fw ${btnType}">
                     ${download.title}
                   </a>
                 </div>`;
        break;
      }
    }

    if (d === downloads.length) {
      html += `<div class="p-2">
                 <a href=""
                   style="visibility:hidden"
                   class="btn btn-fw btn-outline-primary">
                   test
                 </a>
               </div>`;
    }
  }

  html += '</div>';

  return html;
}

function setupPage (versions, nightlies, acommities, mcommities, sortedVersions, osLists, length) {
  let downloadsHtml = ''

  let osList = [ 'Arch', 'Centos 7', 'Centos 8', 'Ubuntu 18.04', 'Ubuntu 20.04' ];
  let osCommitList = [ 'Arch', 'Centos 7', 'Centos 8', 'Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04' ];
  if (osLists.main) {
    osList = osLists.main
  }
  if (osLists.commit) {
    osCommitList = osLists.commit
  }

  let acommitDownloadsHtml = buildDownloadVersionRow(acommities, 'btn-outline-danger', osCommitList);
  let mcommitDownloadsHtml = buildDownloadVersionRow(mcommities, 'btn-outline-danger', osCommitList);

  if (!length) { length = sortedVersions.length }
  for (let v = 0; v < length; ++v) {
    if (versions.hasOwnProperty(sortedVersions[v])) {
      let version = versions[sortedVersions[v]];
      let btnType = v === 0 ? 'btn-primary' : 'btn-outline-primary';
      let html = buildDownloadVersionRow(version, btnType, osList);

      downloadsHtml += html;
    }
  }

  $('.commit-downloads-container').show();
  $('.main-downloads').append(downloadsHtml);
  $('.acommit-downloads').append(acommitDownloadsHtml);
  $('.mcommit-downloads').append(mcommitDownloadsHtml);
}

function setupError () {
  $('.downloads-error').show();
  $('.loading-downloads').hide();
  $('.commit-downloads-container').hide();
}

function getDownloadsAndSetup (osLists, length) {
  $.ajax({
    url: 'https://s3.amazonaws.com/files.molo.ch',
    type: 'GET',
    crossDomain: true,
    dataType: 'xml',
    success: function (xml) {
      let downloads = parseXML(xml);
      setupPage(downloads.downloads, downloads.nightlies, downloads.acommities, downloads.mcommities, downloads.sortedVersions, osLists, length);
      $('.loading-downloads').hide();
    },
    error: function(xhr, textStatus, errorThrown) {
      setupError();
    }
  });
}

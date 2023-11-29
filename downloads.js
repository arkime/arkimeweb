'use strict';

function parseXML (xml) {
  let files = $(xml).find('ListBucketResult').find('Contents');
  let downloads = {};
  let nightlies = { title:'Nightly', downloads:[] };
  let acommities = { title:'Arkime 5 Latest Commit', downloads:[] };
  let acommities5 = { title:'Arkime DEV5 Latest Commit', downloads:[] };
  let mcommities = { title:'Arkime/Moloch 5 Hybrid Latest Commit', downloads:[] };
  const oses = {
    'arch.x86': 'Arch',
    centos6: 'Centos 6',
    centos7: 'Centos 7',
    centos8: 'Centos 8',
    el9: 'EL 9',
    ubuntu16: 'Ubuntu 16.04',
    ubuntu18: 'Ubuntu 18.04',
    ubuntu20: 'Ubuntu 20.04',
    ubuntu22: 'Ubuntu 22.04',
    al2023: 'AL2023'
  };

  for (let i = 0, len = files.length; i < len; ++i) {
    let file = $(files[i]);
    let key  = file.find('Key').text();

    if (key.startsWith('builds/')) {
      let keyArr = key.split('/');
      let os     = keyArr[1];
      let vers   = keyArr[2].replace(/_rc/, '-rc');
      let time   = new Date(file.find('LastModified').text());

      time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)}`;

      let uniqueVers = vers.match(/([0-9]+)\.([0-9]+)\.([0-9]+)(-rc[12345])?/g);

      let osTitle = os.replace('-', ' ');
      osTitle = osTitle.charAt(0).toUpperCase() + osTitle.slice(1);
      osTitle = osTitle.replace('El ', 'EL ');
      osTitle = osTitle.replace('Al2', 'AL2');

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
    } else if (key.startsWith('arkime-dev5')) {
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

      acommities5.modified = time;
      acommities5.downloads.push(download);
    }
  }

  return {
    downloads: downloads,
    nightlies: nightlies,
    acommities: acommities,
    acommities5: acommities5,
    mcommities: mcommities,
    sortedVersions: Object.keys(downloads).sort().reverse()
  };
}

function buildDownloadVersionRow (version, osList, listName, index, ver=4) {
  const id = version.title.replace(/[^-a-zA-Z0-9]/g, '');
  let html = `
    <div class="card">
      <div
        id="heading-${id}"
        class="card-header p-0">
        <h2 class="mb-0">
          <button
          type="button"
          data-toggle="collapse"
          data-target="#collapse-${id}"
          aria-controls="collapse-${id}"
          class="btn btn-block text-left accordion-btn"
          aria-expanded="${index === 0 ? 'true' : 'false'}">
            ${version.title}
            <small class="pull-right">
              ${version.modified}
            </small>
          </button>
        </h2>
      </div>
      <div
        id="collapse-${id}"
        data-parent="#${listName}"
        aria-labelledby="heading-${id}"
        class="collapse${index === 0 ? ' show' : ''}">
        <div class="card-body p-1">
          <div class="row d-flex flex-row justify-content-around flex-wrap">
  `;

  let downloads = version.downloads;

  let i, d, len;
  for (i = 0, len = osList.length; i < len; ++i) {
    for (d = 0; d < downloads.length; d++) {
      if (downloads[d].title === osList[i]) {
        let download = downloads[d];
        if (download.title === 'AL2023' && listName === 'latestCommitAccordion') {
          // Need to hardcode x86 link also
          html += `<a href="https://s3.amazonaws.com/files.molo.ch/arkime-main.al2023.x86_64.rpm" class="m-2">${download.title}</a> (<a href="https://s3.amazonaws.com/files.molo.ch/arkime-main.al2023.aarch64.rpm">arm</a>)`;
        } else if (download.title === 'Ubuntu 22.04' && listName === 'latestCommitAccordion') {
          html += `<a href="${download.url}" class="m-2">${download.title}</a> (<a href="https://s3.amazonaws.com/files.molo.ch/arkime-main_ubuntu2204_arm64.deb">arm</a>)`;
        } else {
          html += `<a href="${download.url}" class="m-2">${download.title}</a>`;
        }
        break;
      }
    }
  }

  if (listName === 'latestCommitAccordion') {
    ver=5
    html += `
      </div>
      <div class="alert alert-danger text-center lead lead-sm mb-0 p-1">
        <span class="fa fa-exclamation-triangle mr-2 danger-theme-text"></span>
        <a class="no-decoration"
          href="faq#how_do_i_upgrade_to_arkime_${ver}">
          Please read the upgrading to ${ver} instructions
        </a>
        <span class="fa fa-exclamation-triangle ml-2 danger-theme-text"></span>
      </div>
      </div></div></div>
    `;
  } else {
    html += '</div></div></div></div>';
  }

  return html;
}

function setupPage (downloads, osLists, length) {
  let downloadsHtml = ''

  let osList = [ 'AL2023', 'Arch', 'Centos 7', 'Centos 8', 'EL 9', 'Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04'];
  let osCommitList = [ 'AL2023', 'Arch', 'Centos 7', 'Centos 8', 'EL 9', 'Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04' ];
  if (osLists.main) {
    osList = osLists.main
  }
  if (osLists.commit) {
    osCommitList = osLists.commit
  }

  let acommitDownloadsHtml = buildDownloadVersionRow(downloads.acommities, osCommitList, 'latestCommitAccordion', 0);
  let mcommitDownloadsHtml = buildDownloadVersionRow(downloads.mcommities, osCommitList, 'latestCommitAccordion', 1);
  let acommit5DownloadsHtml = buildDownloadVersionRow(downloads.acommities5, osCommitList, 'latestCommitAccordion', 2, 5);

  if (!length) { length = downloads.sortedVersions.length }
  for (let v = 0; v < length; ++v) {
    if (downloads.downloads.hasOwnProperty(downloads.sortedVersions[v])) {
      let version = downloads.downloads[downloads.sortedVersions[v]];
      let html = buildDownloadVersionRow(version, osList, 'downloadsAccordion', v);

      downloadsHtml += html;
    }
  }

  $('.main-downloads').append(downloadsHtml);
  $('.acommit-downloads').replaceWith(acommitDownloadsHtml);
  $('.mcommit-downloads').replaceWith(mcommitDownloadsHtml);
  $('.acommit5-downloads').replaceWith(acommit5DownloadsHtml);
}

function removeLoading () {
  $('.loading-letter').attr('style', 'font-size:1px;');
  $('.loading-downloads').attr('style', 'height:0px;margin:0px;padding:0px;');
}

function setupError () {
  $('.downloads-error').show();
  removeLoading();
}

function getDownloadsAndSetup (osLists, length) {
  $.ajax({
    url: 'https://s3.amazonaws.com/files.molo.ch',
    type: 'GET',
    crossDomain: true,
    dataType: 'xml',
    success: function (xml) {
      let downloads = parseXML(xml);
      setupPage(downloads, osLists, length);
      setTimeout(() => {
        removeLoading();
      }, 200);
    },
    error: function () {
      setupError();
    }
  });
}

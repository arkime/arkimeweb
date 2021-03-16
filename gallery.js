'use strict';

// determine if the document is ready to be manipulated
function docReady (fn) {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// copy code in the <code> block of a gallery item
function copyCode (id) {
  const copyContent = document.getElementById(id).getElementsByTagName('code')[0].innerHTML;
  // create an input to copy from
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = copyContent;
  input.select();
  document.execCommand('copy', false);
  input.remove();
}

let debounce;
let galleryTitles;
let noResultsArea;

function searchGallery (e) {
  if (debounce) { clearTimeout(debounce); }

  debounce = setTimeout(() => {
    let numMatches = 0;
    const searchTerm = e.target.value.toLowerCase();

    let match = false;

    for (const title of galleryTitles) { // search titles
      const titleText = title.innerHTML.toLowerCase();
      match = titleText.match(searchTerm);

      // find the gallery item block to show/hide
      const item = title.closest('.gallery-item');
      if (!item) { continue; }

      if (!match) {
        const galleryTags = item.getElementsByClassName('search-badge');

        for (const tag of galleryTags) { // search tags
          const tagText = tag.innerHTML.toLowerCase();
          match = tagText.match(searchTerm);

          if (match) { // we found at least one tag match
            // no need to search any further, show the item and break loop
            item.className = 'gallery-item';
            numMatches++;
            break;
          }
        }
        if (!match) { // no title or tag matches, hide the gallery item
          item.className = 'gallery-item gallery-item-hidden';
        }
      } else { // a title matched so make sure the item is visible
        item.className = 'gallery-item';
        numMatches++;
      }
    }

    // show no results area if there are no results
    !numMatches
      ? noResultsArea.style.display = 'block'
      : noResultsArea.style.display = 'none';
  }, 400)
}

docReady(() => { // DOM is loaded and ready
  let input = document.getElementById('wiseSearch');
  if (input) { input.addEventListener('input', searchGallery); }

  input = document.getElementById('rulesSearch');
  if (input) { input.addEventListener('input', searchGallery); }

  galleryTitles = document.getElementsByClassName('search-title');
  noResultsArea = document.getElementById('no-results')
});

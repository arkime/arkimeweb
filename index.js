'use strict';

function toggleToc () {
  $('#viewport').toggleClass('collapsed-toc');
}

function play () {
  const audio = document.getElementById('audio');
  audio.play();
}

function copyLink (event, page) {
  let copyText;
  if (typeof event === 'string') {
    copyText = event;
    $(page).attr('data-original-title', "COPIED!").tooltip('show');
  } else {
    copyText = `https://arkime.com/${page}#${event.parentNode.id}`;
  }
  // create an input to copy from
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = copyText;
  input.select();
  document.execCommand('copy', false);
  input.remove();
}

function setupLinks () {
  // get the name of the page
  const page = window.location.pathname.split('/').pop().split('.')[0];
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach((heading) => {
    const span = document.createElement('span');
    span.classList.add('fa', 'fa-link', 'small', 'copy-link', 'cursor-copy', 'ml-2');
    span.setAttribute('onclick', "copyLink(this, '" + page + "')");
    heading.appendChild(span);
  });
}

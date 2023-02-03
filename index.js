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

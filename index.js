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

function setupCodeCopy () {
  const blocks = document.querySelectorAll('pre');
  blocks.forEach((pre) => {
    if (pre.querySelector('.code-copy-btn')) { return; }
    pre.classList.add('code-copy-wrap');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy');
    btn.title = 'Copy';
    btn.innerHTML = '<span class="fa fa-clipboard"></span>';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code') || pre;
      const text = code.innerText;
      const done = () => {
        const old = btn.innerHTML;
        btn.innerHTML = '<span class="fa fa-check"></span>';
        setTimeout(() => { btn.innerHTML = old; }, 1200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          done();
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        done();
      }
    });
    pre.appendChild(btn);
  });
}

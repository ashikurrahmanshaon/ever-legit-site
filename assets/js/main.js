(function () {
  'use strict';

  var S = window.SITE || {};
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  each(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Opened straight from a folder on a computer: point page links at index.html */
  if (window.location.protocol === 'file:') {
    each(document.querySelectorAll('a[href]'), function (link) {
      var href = link.getAttribute('href');
      if (/^(https?:|mailto:|tel:|#)/.test(href)) { return; }
      var parts = href.match(/^([^?#]*)(.*)$/);
      if (/\/$/.test(parts[1])) { link.setAttribute('href', parts[1] + 'index.html' + parts[2]); }
    });
  }

  /* Header: soft shadow after scrolling, steps aside on the way down, returns on the way up.
     It waits for a real change of direction, so small scroll jitters do not make it flicker. */
  var header = document.querySelector('.site-header');
  var lastY = Math.max(window.scrollY, 0);
  var travelled = 0;
  var queued = false;
  function onScroll() {
    var y = Math.max(window.scrollY, 0);
    var delta = y - lastY;
    lastY = y;
    queued = false;
    if (!header) { return; }
    header.classList.toggle('is-scrolled', y > 8);
    if (root.classList.contains('menu-open')) { return; }
    travelled = (delta > 0) === (travelled > 0) ? travelled + delta : delta;
    if (y < 120 || travelled < -24) { header.classList.remove('is-hidden'); }
    else if (travelled > 48) { header.classList.add('is-hidden'); }
  }
  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Menu on small screens */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open && header) { header.classList.remove('is-hidden'); }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!root.classList.contains('menu-open'));
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setMenu(false); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { setMenu(false); }
    });
    window.addEventListener('pageshow', function () { setMenu(false); });
  }

  /* Reveal on scroll. Once an element has arrived it is handed back to its own styles,
     so hover and tap effects are not slowed down by the reveal timing. */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (items.length && canObserve && !reduce) {
    root.classList.add('anim');
    items.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child.hasAttribute('data-reveal');
      });
      var index = siblings.indexOf(el);
      if (index > 0) { el.style.setProperty('--d', Math.min(index, 5) * 60); }
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        var wait = (parseFloat(el.style.getPropertyValue('--d')) || 0) + 1300;
        observer.unobserve(el);
        el.classList.add('is-in');
        window.setTimeout(function () {
          el.removeAttribute('data-reveal');
          el.style.removeProperty('--d');
        }, wait);
      });
    }, { rootMargin: '0px', threshold: 0.01 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* Looping motion rests while it is off screen */
  if (canObserve && !reduce) {
    var rest = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      });
    }, { rootMargin: '80px' });
    each(document.querySelectorAll('.art, .marquee, .seal'), function (el) { rest.observe(el); });
  }

  /* Contact form: opens WhatsApp or the visitor's email app with the message filled in */
  var form = document.getElementById('contact-form');
  if (form) {
    var select = form.elements.business;
    var asked = new URLSearchParams(window.location.search).get('business');
    if (asked) {
      each(select.options, function (option) {
        if (option.value.toLowerCase() === asked.toLowerCase()) { select.value = option.value; }
      });
    }

    var required = [
      { name: 'name', message: 'Enter your name.' },
      { name: 'message', message: 'Write your message.' }
    ];

    function setError(input, message) {
      var box = document.getElementById(input.id + '-error');
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        box.textContent = message;
        box.hidden = false;
      } else {
        input.removeAttribute('aria-invalid');
        box.hidden = true;
      }
    }

    required.forEach(function (rule) {
      var input = form.elements[rule.name];
      input.addEventListener('input', function () {
        if (input.value.trim()) { setError(input, ''); }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstBad = null;
      required.forEach(function (rule) {
        var input = form.elements[rule.name];
        if (input.value.trim()) {
          setError(input, '');
        } else {
          setError(input, rule.message);
          firstBad = firstBad || input;
        }
      });
      if (firstBad) { firstBad.focus(); return; }

      var name = form.elements.name.value.trim();
      var message = form.elements.message.value.trim();
      var channel = event.submitter && event.submitter.getAttribute('data-channel');

      if (channel === 'whatsapp' && S.whatsapp) {
        var text = '[' + select.value + '] ' + message + '\n\n' + name;
        window.location.href = 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(text);
        return;
      }
      var subject = '[' + select.value + '] Message from ' + name;
      window.location.href = 'mailto:' + S.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(message + '\n\n' + name);
    });
  }
})();

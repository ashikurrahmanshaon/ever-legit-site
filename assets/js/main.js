(function () {
  'use strict';

  var S = window.SITE || {};
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Header: soft shadow after scrolling, steps aside on the way down, returns on the way up */
  var header = document.querySelector('.site-header');
  var lastY = window.scrollY;
  var queued = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      if (!root.classList.contains('menu-open')) {
        if (y > lastY && y > 320) { header.classList.add('is-hidden'); }
        else if (y < lastY) { header.classList.remove('is-hidden'); }
      }
    }
    lastY = y;
    queued = false;
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
  }

  /* Reveal on scroll */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (items.length && 'IntersectionObserver' in window && !reduce) {
    root.classList.add('anim');
    items.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child.hasAttribute('data-reveal');
      });
      var index = siblings.indexOf(el);
      if (index > 0) { el.style.setProperty('--d', Math.min(index, 8) * 90); }
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px', threshold: 0.06 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* Contact form: opens WhatsApp or the visitor's email app with the message filled in */
  var form = document.getElementById('contact-form');
  if (form) {
    var select = form.elements.business;
    var asked = new URLSearchParams(window.location.search).get('business');
    if (asked) {
      Array.prototype.forEach.call(select.options, function (option) {
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

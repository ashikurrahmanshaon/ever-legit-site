(function () {
  'use strict';

  var S = window.SITE || {};
  function val(key) {
    return String(S[key] == null ? '' : S[key]).trim();
  }
  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  /* Company details from assets/js/config.js */
  var toHref = {
    email: function (v) { return 'mailto:' + v; },
    phone: function (v) { return 'tel:' + v.replace(/[^+\d]/g, ''); },
    whatsapp: function (v) { return 'https://wa.me/' + v.replace(/\D/g, ''); },
    storeUrl: function (v) { return v; }
  };
  each('[data-site]', function (el) {
    var v = val(el.getAttribute('data-site'));
    if (v) { el.textContent = v; el.classList.remove('ph'); }
  });
  each('[data-site-href]', function (el) {
    var key = el.getAttribute('data-site-href');
    var v = val(key);
    if (v && toHref[key]) { el.setAttribute('href', toHref[key](v)); }
  });
  each('[data-site-show]', function (el) {
    if (val(el.getAttribute('data-site-show'))) { el.hidden = false; }
  });
  each('[data-site-unset]', function (el) {
    if (val(el.getAttribute('data-site-unset'))) { el.hidden = true; }
  });

  /* A placeholder that has been replaced by hand loses its highlight */
  each('.ph', function (el) {
    if (!/^\s*\[/.test(el.textContent)) { el.classList.remove('ph'); }
  });

  each('[data-year]', function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* Contact form: opens the visitor's email app with the message filled in */
  var form = document.getElementById('contact-form');
  if (form) {
    var select = form.elements.business;
    var asked = new URLSearchParams(window.location.search).get('business');
    if (asked) {
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value.toLowerCase() === asked.toLowerCase()) { select.value = option.value; }
      });
    }

    var formError = document.getElementById('form-error');
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

      var to = val('email');
      if (!to) {
        formError.textContent = 'This form is not connected yet. Add your email address in assets/js/config.js.';
        formError.hidden = false;
        return;
      }
      formError.hidden = true;

      var name = form.elements.name.value.trim();
      var subject = '[' + select.value + '] Message from ' + name;
      var body = form.elements.message.value.trim() + '\n\n' + name;
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();

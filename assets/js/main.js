(function () {
  'use strict';

  var S = window.SITE || {};

  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
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

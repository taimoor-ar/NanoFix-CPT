/* NanoFix phone menu: adds a three-line button to the header and opens/closes the menu */
(function () {
  var header = document.querySelector('header');
  var nav = header && header.querySelector('nav');
  if (!header || !nav) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nf-burger';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(btn);

  btn.addEventListener('click', function () {
    var open = header.classList.toggle('nf-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  var isPhone = function () { return window.matchMedia('(max-width: 768px)').matches; };

  // Services: on phones, tapping opens/closes the list of services
  var dd = nav.querySelector('.dropdown');
  var toggle = nav.querySelector('.dropdown-toggle');
  if (dd && toggle) {
    toggle.addEventListener('click', function (e) {
      if (isPhone()) { e.preventDefault(); dd.classList.toggle('nf-sub'); }
    });
  }

  // Close the menu after tapping any other link
  nav.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (a && !a.classList.contains('dropdown-toggle')) {
      header.classList.remove('nf-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

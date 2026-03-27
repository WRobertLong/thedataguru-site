/* ==============================================
   THE DATA GURU LTD - Shared Nav Injector
   Automatically injects nav on every page.
   Active link is detected from current URL.
   ============================================== */
(function() {
  var path = window.location.pathname;
  var depth = (path.match(/\//g) || []).length - 1;
  var root = depth <= 1 ? '' : '../'.repeat(depth - 1);
  var page = path.split('/').pop() || 'index.html';

  function isActive(href) {
    if (href === 'index.html' && (page === 'index.html' || page === '')) return true;
    return page === href;
  }

  function li(href, label) {
    var cls = isActive(href) ? ' class="active"' : '';
    return '<li><a href="' + root + href + '"' + cls + '>' + label + '</a></li>';
  }

  var nav = '<nav class="nav" id="navbar">' +
    '<div class="nav-inner">' +
      '<a href="' + root + 'index.html" class="logo">' +
        '<span class="logo-main">The Data Guru</span>' +
        '<span class="logo-sub">Ltd</span>' +
      '</a>' +
      '<ul class="nav-links">' +
        li('index.html', 'Home') +
        li('about.html', 'About') +
        li('team.html', 'Team') +
        li('services.html', 'Services') +
        li('blog.html', 'Blog') +
        li('work-experience.html', 'Work Experience') +
        '<li><a href="' + root + 'contact.html" class="nav-cta">Get in Touch</a></li>' +
      '</ul>' +
      '<button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">' +
        '<i class="fas fa-sun"></i>' +
      '</button>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      '<a href="' + root + 'index.html">Home</a>' +
      '<a href="' + root + 'about.html">About</a>' +
      '<a href="' + root + 'team.html">Team</a>' +
      '<a href="' + root + 'services.html">Services</a>' +
      '<a href="' + root + 'blog.html">Blog</a>' +
      '<a href="' + root + 'work-experience.html">Work Experience</a>' +
      '<a href="' + root + 'contact.html">Get in Touch</a>' +
    '</div>' +
  '</nav>';

  document.body.insertAdjacentHTML('afterbegin', nav);
})();

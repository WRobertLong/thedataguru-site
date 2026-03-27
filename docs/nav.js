/* ==============================================
   THE DATA GURU LTD — Shared Nav Injector
   Automatically injects nav on every page.
   Active link is detected from current URL.
   ============================================== */

(function() {
  // Determine the root path based on page depth
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  const root = depth <= 1 ? '' : '../'.repeat(depth - 1);

  // Detect active page
  const page = path.split('/').pop() || 'index.html';
  const isActive = (href) => {
    if (href === 'index.html' && (page === 'index.html' || page === '')) return true;
    return page === href;
  };

  const navHTML = `
  <nav class="nav" id="navbar">
    <div class="nav-inner">
      <a href="${root}index.html" class="logo">
        <span class="logo-main">The Data Guru</span>
        <span class="logo-sub">Ltd</span>
      </a>
      <ul class="nav-links">
        <li><a href="${root}index.html"${isActive('index.html') ? ' class="active"' : ''}>Home</a></li>
        <li><a href="${root}about.html"${isActive('about.html') ? ' class="active"' : ''}>About</a></li>
        <li><a href="${root}team.html"${isActive('team.html') ? ' class="active"' : ''}>Team</a></li>
        <li><a href="${root}services.html"${isActive('services.html') ? ' class="active"' : ''}>Services</a></li>
        <li><a href="${root}blog.html"${isActive('blog.html') ? ' class="active"' : ''}>Blog</a></li>
        <li><a href="${root}work-experience.html"${isActive('work-experience.html') ? ' class="active"' : ''}>Work Experience</a></li>
        <li><a href="${root}contact.html" class="nav-cta">Get in Touch</a></li>
      </ul>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <i class="fas fa-sun"></i>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <a href="${root}index.html">Home</a>
      <a href="${root}about.html">About</a>
      <a href="${root}team.html">Team</a>
      <a href="${root}services.html">Services</a>
      <a href="${root}blog.html">Blog</a>
      <a href="${root}work-experience.html">Work Experience</a>
      <a href="${root}contact.html">Get in Touch</a>
    </div>
  </nav>`;

  // Inject nav as first child of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();

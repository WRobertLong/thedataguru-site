/* ==============================================
   THE DATA GURU LTD - Main Script
   ============================================== */

// Theme Toggle - runs before DOM ready to prevent flash
(function() {
  var saved = localStorage.getItem('tdg-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener("DOMContentLoaded", function () {

  // Theme toggle button
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    var updateBtn = function() {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };
    updateBtn();
    themeBtn.addEventListener('click', function() {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('tdg-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('tdg-theme', 'light');
      }
      updateBtn();
      loadAndInitParticles();
    });
  }

  // Particles defaults - used if JSON fetch fails
  var PARTICLE_DEFAULTS = {
    colors: ["#C0622A", "#E8A87C", "#B8963E", "#4dd9c0", "#FAF7F2"],
    size_max: 6,
    speed: 1.2,
    density: 80,
    line_color: "#B8963E",
    line_opacity: 0.35,
    line_distance: 150,
    opacity_min: 0.1,
    opacity_max: 0.7
  };

  function buildParticleConfig(cfg) {
    return {
      particles: {
        number: { value: cfg.density, density: { enable: true, value_area: 900 } },
        color: { value: cfg.colors },
        shape: { type: 'circle' },
        opacity: {
          value: cfg.opacity_max,
          random: true,
          anim: { enable: true, speed: 0.6, opacity_min: cfg.opacity_min, sync: false }
        },
        size: { value: cfg.size_max, random: true },
        line_linked: {
          enable: true,
          distance: cfg.line_distance,
          color: cfg.line_color,
          opacity: cfg.line_opacity,
          width: 1
        },
        move: {
          enable: true, speed: cfg.speed, direction: 'none',
          random: true, straight: false, out_mode: 'out', bounce: false
        }
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.7 } },
          push: { particles_nb: 4 },
          repulse: { distance: 120, duration: 0.4 }
        }
      },
      retina_detect: true
    };
  }

  function destroyParticles() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      try { window.pJSDom[0].pJS.fn.vendors.destroypJS(); } catch(e) {}
      window.pJSDom = [];
    }
  }

  function initParticles(cfg) {
    if (typeof particlesJS === 'undefined') { console.warn('particles.js not loaded'); return; }
    if (!document.getElementById('particles-js')) return;
    destroyParticles();
    particlesJS('particles-js', buildParticleConfig(cfg));
  }

  // Work out path to root for config file fetch
  var path = window.location.pathname;
  var depth = (path.match(/\//g) || []).length - 1;
  var root = depth <= 1 ? '' : '../'.repeat(depth - 1);

  function loadAndInitParticles() {
    if (!document.getElementById('particles-js')) return;
    fetch(root + 'particles-config.json?nocache=' + Date.now())
      .then(function(r) { return r.json(); })
      .then(function(cfg) { console.log('Particles config loaded:', cfg); initParticles(cfg); })
      .catch(function() { console.warn('Using default particle config'); initParticles(PARTICLE_DEFAULTS); });
  }

  loadAndInitParticles();

  // Secret keystroke Ctrl+Shift+P to reload particle config
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      console.log('Reloading particle config...');
      loadAndInitParticles();
      var el = document.getElementById('particles-js');
      if (el) {
        el.style.transition = 'opacity 0.2s';
        el.style.opacity = '0.3';
        setTimeout(function() { el.style.opacity = '1'; }, 200);
      }
    }
  });

  // Navbar scroll state
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile hamburger
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      var spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(function(s) { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.addEventListener('click', function(e) {
      if (navbar && !navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        var spans = hamburger.querySelectorAll('span');
        spans.forEach(function(s) { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .service-full-card');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function(el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease ' + (i * 0.07) + 's, transform 0.5s ease ' + (i * 0.07) + 's';
      observer.observe(el);
    });
  }

});

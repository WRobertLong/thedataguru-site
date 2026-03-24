/* ==============================================
   THE DATA GURU LTD — Main Script
   ============================================== */

// ---- Theme Toggle (runs immediately before DOM ready to prevent flash) ----
(function() {
  const saved = localStorage.getItem('tdg-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener("DOMContentLoaded", function () {

  // ---- Theme toggle button ----
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const updateBtn = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };
    updateBtn();
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('tdg-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('tdg-theme', 'light');
      }
      updateBtn();
      reinitParticles();
    });
  }

  // ---- Particles config ----
  function getParticleConfig() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 900 } },
        color: { value: isLight ? '#8B3E18' : '#C0622A' },
        shape: { type: 'circle' },
        opacity: {
          value: isLight ? 0.40 : 0.60,
          random: true,
          anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false }
        },
        size: { value: 2.8, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: isLight ? '#8B3E18' : '#B8963E',
          opacity: isLight ? 0.25 : 0.40,
          width: 1
        },
        move: {
          enable: true, speed: 1.2, direction: 'none',
          random: true, straight: false, out_mode: 'out', bounce: false,
        },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab:    { distance: 160, line_linked: { opacity: 0.7 } },
          push:    { particles_nb: 4 },
          repulse: { distance: 120, duration: 0.4 },
        },
      },
      retina_detect: true,
    };
  }

  function reinitParticles() {
    if (typeof particlesJS === 'undefined') return;
    if (window.pJSDom && window.pJSDom.length > 0) {
      try { window.pJSDom[0].pJS.fn.vendors.destroypJS(); } catch(e) {}
      window.pJSDom = [];
    }
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', getParticleConfig());
    }
  }

  // Init particles
  if (document.getElementById('particles-js')) {
    if (typeof particlesJS === 'undefined') {
      console.warn('particles.js not loaded');
    } else {
      particlesJS('particles-js', getParticleConfig());
    }
  }

  // ---- Navbar scroll state ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- Mobile hamburger ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity  = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ---- Fade-in on scroll ----
  const fadeEls = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .service-full-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      observer.observe(el);
    });
  }

});

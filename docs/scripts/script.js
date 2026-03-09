/* ==============================================
   THE DATA GURU LTD — Main Script
   ============================================== */

// ---- Particles (home page only) ----
document.addEventListener("DOMContentLoaded", function () {
  const particlesEl = document.getElementById('particles-js');
  if (particlesEl) {
    if (typeof particlesJS === "undefined") {
      console.warn("particles.js not loaded");
    } else {
      particlesJS('particles-js', {
        particles: {
          number: { value: 70, density: { enable: true, value_area: 900 } },
          color: { value: '#c0622a' },       // terracotta accent
          shape: { type: 'circle' },
          opacity: {
            value: 0.45,
            random: true,
            anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false }
          },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#b8963e',               // warm gold for lines
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.2,                     // slow & gentle
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
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
            grab:    { distance: 160, line_linked: { opacity: 0.6 } },
            push:    { particles_nb: 4 },
            repulse: { distance: 120, duration: 0.4 },
          },
        },
        retina_detect: true,
      });
    }
  }

  // ---- Animated role cycling ----
  const roleEl = document.getElementById('roleText');
  if (roleEl) {
    const roles = [
      "Data Analytics",
      "Data Engineering",
      "Data Architecture",
      "Data Recovery",
      "Data Strategy",
      "Data Modelling",
      "Business Intelligence",
      "Statistical Consulting",
      "iPad / iPhone Repair",
      "Computer Repair",
    ];
    let idx = 0;

    roleEl.classList.add('fade-in');

    setInterval(() => {
      roleEl.classList.remove('fade-in');
      roleEl.classList.add('fade-out');

      setTimeout(() => {
        idx = (idx + 1) % roles.length;
        roleEl.textContent = roles[idx];
        roleEl.classList.remove('fade-out');
        roleEl.classList.add('fade-in');
      }, 500);
    }, 3000);
  }

  // ---- Navbar scroll state ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Mobile hamburger ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate spans
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity  = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity  = '';
        spans[2].style.transform = '';
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity  = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ---- Fade-in on scroll (sections) ----
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

/**
 * AJH Website - Daily Built JavaScript
 * Building better every day
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initCounters();
  initSmoothScroll();
  initAnimations();
  initParticles();
  initBlogAnimations();
});

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  });
}

function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-card, .project-card, .skill-category, .section-header, .stat-card, .timeline-item, .blog-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count], .stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.count));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(element, target) {
  const duration = 2000;
  const startTime = performance.now();
  function update(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = formatNumber(Math.floor(target * eased));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function formatNumber(num) {
  if (num >= 100000) return (num / 100000).toFixed(0) + '00K';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
}

function initAnimations() {
  document.body.classList.add('loaded');
  const heroEls = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-cta');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + (i * 100));
  });
}

function initParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particles';
  document.body.appendChild(particleContainer);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    if (Math.random() > 0.5) {
      particle.style.background = 'var(--accent-secondary)';
    } else if (Math.random() > 0.5) {
      particle.style.background = 'var(--accent-tertiary)';
    }
    particleContainer.appendChild(particle);
  }
}

function initBlogAnimations() {
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach((card, index) => {
    card.style.animationDelay = (index * 0.1) + 's';
  });
}

// Konami Code Easter Egg
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === konami[ki]) {
    ki++;
    if (ki === konami.length) {
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#00d4ff,#7b2cbf,#ff006e);z-index:9999;pointer-events:none;animation:flashAnim 0.5s ease-out forwards;';
      document.head.insertAdjacentHTML('beforeend','<style>@keyframes flashAnim{0%{opacity:1}100%{opacity:0}}</style>');
      document.body.appendChild(flash);
      setTimeout(() => { flash.remove(); document.querySelector('style:last-of-type')?.remove(); }, 500);
      ki = 0;
    }
  } else ki = 0;
});

// Scroll-based navbar link highlighting
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

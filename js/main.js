/**
 * AJH Website - Daily Built JavaScript
 * Building better every day
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initNavigation();
  initScrollEffects();
  initCounters();
  initSmoothScroll();
  initAnimations();
  initParticles();
  initBlogAnimations();
  initScrollToTop();
  initContactForm();
  initNewsletterForm();
  initShortcutsPanel();
  initKeyboardShortcuts();
  initServiceWorker();
  initServiceWorkerUpdate();
  initPageAnalytics();
  initCursorTrail();
  initSearch();
  initDemos();
  initEasterEgg();
  initQuickActions();
  initClock();
  initReadingProgress();
  initSkillBars();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModal();
  initSectionTransitions();
  initHoverEffects();
  initScrollAnimations();
  initRandomQuote();
  initCommandPalette();
  initDailyStreak();
  initPageViews();
  initCanvasAnimation();
  initFAQ();
  initRoleText();
});

/**
 * Utility Functions
 */

// Debounce - limits function execution rate
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle - executes at most once per interval
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Smooth scroll to element
function scrollToElement(selector, offset = 80) {
  const element = document.querySelector(selector);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth'
    });
    return true;
  }
  return false;
}

// Check if element is in viewport
function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
    rect.bottom >= 0
  );
}

// Animate number counter
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

// Format large numbers
function formatNumber(num) {
  if (num >= 100000) return (num / 100000).toFixed(0) + '00K';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('ajh-theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ajh-theme', next);
    });
  }
}

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

function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.className = 'form-status success';
        status.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      status.className = 'form-status error';
      status.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

// Newsletter Form Handler
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('🎉 Subscribed! You\'ll get updates on new builds and projects.');
        form.reset();
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      alert('❌ Subscription failed. Please try again.');
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

// Keyboard Shortcuts Panel
function initShortcutsPanel() {
  const panel = document.getElementById('shortcuts-panel');
  const toggle = document.getElementById('shortcuts-toggle');
  if (!panel || !toggle) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
}

// Global Keyboard Shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // ? to toggle shortcuts panel
    if (e.key === '?' || e.key === '/') {
      const panel = document.getElementById('shortcuts-panel');
      if (panel) {
        panel.classList.toggle('open');
        e.preventDefault();
      }
    }

    // T to toggle theme
    if (e.key === 't' || e.key === 'T') {
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) themeToggle.click();
    }

    // Escape to close shortcuts panel
    if (e.key === 'Escape') {
      const panel = document.getElementById('shortcuts-panel');
      if (panel) panel.classList.remove('open');
    }
  });
}

// Page View Analytics
function initPageAnalytics() {
  const storageKey = 'ajh_page_views';
  const todayKey = 'ajh_visit_date';
  const today = new Date().toDateString();
  
  const storedDate = localStorage.getItem(todayKey);
  let views = parseInt(localStorage.getItem(storageKey) || '0');
  
  if (storedDate !== today) {
    views = 0;
    localStorage.setItem(todayKey, today);
  }
  
  views++;
  localStorage.setItem(storageKey, views.toString());
  
  console.log(`Page views today: ${views}`);
}

// Page Loader
function initLoader() {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loader-progress');
  if (!loader) return;

  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 30;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 300);
    }
    if (progress) progress.style.width = width + '%';
  }, 150);

  // Fallback: hide loader after 3 seconds max
  setTimeout(() => {
    clearInterval(interval);
    if (progress) progress.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }, 3000);
}

// Service Worker Registration
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('AJH SW: Registered successfully', registration.scope);
        })
        .catch((error) => {
          console.log('AJH SW: Registration failed', error);
        });
    });
  }
}

// Service Worker Update Notification
function initServiceWorkerUpdate() {
  if (!('serviceWorker' in navigator)) return;
  
  let updateInterval = setInterval(() => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      });
    });
  }, 60000); // Check every minute
  
  // Check immediately on load
  navigator.serviceWorker.ready.then(() => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        if (registration.waiting) {
          showUpdateNotification(true);
        }
      });
    });
  });
}

function showUpdateNotification(silent = false) {
  const existing = document.getElementById('sw-update-notification');
  if (existing) return;
  
  const notification = document.createElement('div');
  notification.id = 'sw-update-notification';
  notification.innerHTML = `
    <div class="sw-update-content">
      <i class="fas fa-sync-alt"></i>
      <div class="sw-update-text">
        <strong>Update Available</strong>
        <span>A new version of this site is ready!</span>
      </div>
    </div>
    <button class="sw-update-btn" id="sw-update-reload">Update Now</button>
    <button class="sw-update-close" id="sw-update-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Inject styles
  if (!document.getElementById('sw-update-styles')) {
    const styles = document.createElement('style');
    styles.id = 'sw-update-styles';
    styles.textContent = `
      #sw-update-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--bg-card, #1a1a25);
        border: 1px solid var(--border-color, #2a2a3a);
        border-radius: 12px;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2);
        z-index: 9999;
        animation: slideInUp 0.4s ease;
        font-family: inherit;
      }
      @keyframes slideInUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #sw-update-notification .sw-update-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      #sw-update-notification .sw-update-content i {
        color: var(--accent-primary, #00d4ff);
        font-size: 1.2rem;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      #sw-update-notification .sw-update-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      #sw-update-notification .sw-update-text strong {
        color: var(--text-primary, #fff);
        font-size: 0.95rem;
      }
      #sw-update-notification .sw-update-text span {
        color: var(--text-secondary, #a0a0b0);
        font-size: 0.8rem;
      }
      #sw-update-notification .sw-update-btn {
        background: var(--accent-primary, #00d4ff);
        color: #000;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 600;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      #sw-update-notification .sw-update-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
      }
      #sw-update-notification .sw-update-close {
        background: transparent;
        border: none;
        color: var(--text-muted, #606070);
        cursor: pointer;
        padding: 5px;
        font-size: 1rem;
        transition: color 0.2s ease;
      }
      #sw-update-notification .sw-update-close:hover {
        color: var(--accent-primary, #00d4ff);
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  document.getElementById('sw-update-reload').addEventListener('click', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      });
      window.location.reload();
    });
  });
  
  document.getElementById('sw-update-close').addEventListener('click', () => {
    notification.remove();
  });
  
  if (silent) {
    setTimeout(() => notification.remove(), 10000);
  }
}

// Custom Cursor Glow Trail
function initCursorTrail() {
  const trailCount = 8;
  const trailDots = [];
  
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${10 - i}px;
      height: ${10 - i}px;
      background: var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      opacity: ${0.6 - (i * 0.07)};
      transition: transform 0.1s ease, left 0.05s linear, top 0.05s linear;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trailDots.push({ el: dot, x: 0, y: 0 });
  }
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    trailDots.forEach((dot, i) => {
      const speed = 0.15 - (i * 0.01);
      dot.x += (x - dot.x) * speed;
      dot.y += (y - dot.y) * speed;
      dot.el.style.left = (dot.x - (10 - i) / 2) + 'px';
      dot.el.style.top = (dot.y - (10 - i) / 2) + 'px';
      x = dot.x;
      y = dot.y;
    });
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
}

// Search Functionality
function initSearch() {
  const searchBtn = document.getElementById('nav-search-btn');
  const searchModal = document.getElementById('nav-search-modal');
  const searchInput = document.getElementById('search-input');
  const searchClose = document.getElementById('search-close');
  const searchResults = document.getElementById('search-results');
  const hintTags = document.querySelectorAll('.hint-tag');
  if (!searchBtn || !searchModal) return;

  const searchData = [
    { title: 'Home', desc: 'Hero section with introduction', section: '#home', icon: 'fa-home' },
    { title: 'About Me', desc: 'Learn about AJ H and skills', section: '#about', icon: 'fa-user' },
    { title: 'Currently Building', desc: 'Live project status tracker', section: '#current', icon: 'fa-code-branch' },
    { title: 'Projects', desc: 'Featured projects including Vault V6', section: '#projects', icon: 'fa-folder-open' },
    { title: 'Skills', desc: 'Technical stack and expertise', section: '#skills', icon: 'fa-code' },
    { title: 'Stats', desc: 'Daily build numbers and metrics', section: '#stats', icon: 'fa-chart-bar' },
    { title: 'Journey', desc: 'AJ\'s development timeline', section: '#journey', icon: 'fa-road' },
    { title: 'Demos', desc: 'Interactive project previews', section: '#demos', icon: 'fa-play-circle' },
    { title: 'Blog', desc: 'Latest builds and updates', section: '#blog', icon: 'fa-blog' },
    { title: 'Gallery', desc: 'Project showcase gallery', section: '#gallery', icon: 'fa-images' },
    { title: 'Contact', desc: 'Get in touch or send a message', section: '#contact', icon: 'fa-envelope' },
    { title: 'Newsletter', desc: 'Subscribe for updates', section: '#newsletter', icon: 'fa-bell' },
  ];

  function openSearch() {
    searchModal.classList.add('active');
    searchInput.focus();
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '';
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-search"></i>
          <p>No results found for "${query}"</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <div class="search-result-item" data-section="${item.section}">
        <i class="fas ${item.icon}"></i>
        <div class="search-result-text">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-desc">${item.desc}</div>
        </div>
        <span class="search-result-section">${item.section}</span>
      </div>
    `).join('');

    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        closeSearch();
        window.scrollTo({ top: document.querySelector(section).offsetTop - 80, behavior: 'smooth' });
      });
    });
  }

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  hintTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const section = tag.dataset.section;
      closeSearch();
      window.scrollTo({ top: document.querySelector(section).offsetTop - 80, behavior: 'smooth' });
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' || e.key === 'k') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });
}

// Project Demos Modal
function initDemos() {
  const demoCards = document.querySelectorAll('.demo-card');
  const demoModal = document.getElementById('demo-modal');
  const demoIframe = document.getElementById('demo-iframe');
  const demoModalTitle = document.getElementById('demo-modal-title');
  const demoModalClose = document.getElementById('demo-modal-close');
  const demoExternalLink = document.getElementById('demo-external-link');

  if (!demoModal || !demoCards.length) return;

  demoCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      const title = card.querySelector('.demo-info h4')?.textContent || 'Project Preview';
      
      if (demoIframe) demoIframe.src = url;
      if (demoModalTitle) demoModalTitle.textContent = title;
      if (demoExternalLink) demoExternalLink.href = url;
      
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    demoModal.classList.remove('active');
    if (demoIframe) demoIframe.src = '';
    document.body.style.overflow = 'auto';
  }

  if (demoModalClose) {
    demoModalClose.addEventListener('click', closeModal);
  }

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Easter Egg - Secret Message
function initEasterEgg() {
  // Check if user has found the secret before
  const secretFound = localStorage.getItem('ajh_secret_found');
  
  // Random chance to show secret (0.1%)
  if (!secretFound && Math.random() < 0.001) {
    setTimeout(() => {
      const secretMsg = document.getElementById('secret-message');
      if (secretMsg) {
        secretMsg.style.display = 'flex';
        localStorage.setItem('ajh_secret_found', 'true');
      }
    }, 5000);
  }
}

// Close secret message
function closeSecret() {
  const secretMsg = document.getElementById('secret-message');
  if (secretMsg) {
    secretMsg.style.display = 'none';
  }
}

// Make closeSecret available globally
window.closeSecret = closeSecret;

// Quick Actions Floating Menu
function initQuickActions() {
  const existing = document.getElementById('quick-actions');
  if (existing) return;
  
  const quickActions = document.createElement('div');
  quickActions.id = 'quick-actions';
  quickActions.innerHTML = `
    <button class="qa-toggle" id="qa-toggle" aria-label="Quick Actions">
      <i class="fas fa-bolt"></i>
    </button>
    <div class="qa-menu" id="qa-menu">
      <button class="qa-item" data-action="scroll-top" aria-label="Scroll to top">
        <i class="fas fa-arrow-up"></i>
        <span>Scroll Top</span>
      </button>
      <button class="qa-item" data-action="scroll-bottom" aria-label="Scroll to bottom">
        <i class="fas fa-arrow-down"></i>
        <span>Scroll Bottom</span>
      </button>
      <button class="qa-item" data-action="theme" aria-label="Toggle theme">
        <i class="fas fa-adjust"></i>
        <span>Theme</span>
      </button>
      <button class="qa-item" data-action="search" aria-label="Search">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
      <button class="qa-item" data-action="random-section" aria-label="Random section">
        <i class="fas fa-random"></i>
        <span>Random</span>
      </button>
      <button class="qa-item" data-action="share" aria-label="Share">
        <i class="fas fa-share-alt"></i>
        <span>Share</span>
      </button>
    </div>
  `;
  
  // Inject styles
  const styles = document.createElement('style');
  styles.textContent = `
    #quick-actions {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9990;
      font-family: inherit;
    }
    #quick-actions .qa-toggle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--gradient-1, linear-gradient(135deg, #00d4ff, #7b2cbf));
      border: none;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #quick-actions .qa-toggle:hover {
      transform: scale(1.1) rotate(15deg);
      box-shadow: 0 6px 30px rgba(0, 212, 255, 0.6);
    }
    #quick-actions .qa-toggle.active {
      transform: rotate(45deg);
    }
    #quick-actions .qa-menu {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: var(--bg-card, #1a1a25);
      border: 1px solid var(--border-color, #2a2a3a);
      border-radius: 16px;
      padding: 10px;
      display: none;
      flex-direction: column;
      gap: 5px;
      min-width: 160px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      animation: popIn 0.3s ease;
    }
    @keyframes popIn {
      from { transform: scale(0.8) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    #quick-actions .qa-menu.open {
      display: flex;
    }
    #quick-actions .qa-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      background: transparent;
      border: none;
      border-radius: 10px;
      color: var(--text-primary, #fff);
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      text-align: left;
      font-family: inherit;
    }
    #quick-actions .qa-item:hover {
      background: var(--bg-card-hover, #22222f);
      color: var(--accent-primary, #00d4ff);
    }
    #quick-actions .qa-item i {
      width: 18px;
      text-align: center;
      color: var(--text-secondary, #a0a0b0);
    }
    #quick-actions .qa-item:hover i {
      color: var(--accent-primary, #00d4ff);
    }
  `;
  document.head.appendChild(styles);
  document.body.appendChild(quickActions);
  
  const toggle = document.getElementById('qa-toggle');
  const menu = document.getElementById('qa-menu');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  
  document.querySelectorAll('.qa-item').forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      toggle.classList.remove('active');
      menu.classList.remove('open');
      
      switch (action) {
        case 'scroll-top':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'scroll-bottom':
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          break;
        case 'theme':
          document.querySelector('.theme-toggle')?.click();
          break;
        case 'search':
          document.getElementById('nav-search-btn')?.click();
          break;
        case 'random-section':
          const sections = ['home', 'about', 'current', 'projects', 'skills', 'stats', 'journey', 'demos', 'blog', 'contact'];
          const random = sections[Math.floor(Math.random() * sections.length)];
          document.querySelector(`#${random}`)?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'share':
          if (navigator.share) {
            navigator.share({
              title: 'AJH | Developer & Builder',
              text: 'Full-stack developer building things daily from The Bronx.',
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }
          break;
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!quickActions.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

// Live Clock - Eastern Time Zone
function initClock() {
  const clockEl = document.getElementById('clock-time');
  if (!clockEl) return;
  
  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}
// Reading Progress Bar
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress-bar');
  const progressContainer = document.getElementById('reading-progress');
  if (!progressBar || !progressContainer) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';
    
    // Show/hide based on scroll
    if (scrollTop > 200) {
      progressContainer.classList.add('visible');
    } else {
      progressContainer.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// Skill Bars Animation
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.setProperty('--target-width', width + '%');
        fill.classList.add('animated');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => observer.observe(fill));
}

// Skills Filter
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCategories.forEach(category => {
        if (filter === 'all') {
          category.style.display = 'block';
          category.style.animation = 'fadeInUp 0.4s ease forwards';
        } else if (category.getAttribute('data-category') === filter) {
          category.style.display = 'block';
          category.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          category.style.display = 'none';
        }
      });
    });
  });
}

// Projects Filter
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('#project-filter .filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cardFilter = card.getAttribute('data-filter');
        if (filter === 'all' || cardFilter === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project Detail Modal
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-desc');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalGithub = document.getElementById('modal-github');
  const modalLive = document.getElementById('modal-live');
  
  if (!modal) return;
  
  // Project data
  const projectsData = {
    'AJH\'s Vault V6': {
      icon: 'fa-vault',
      badge: 'Gaming',
      desc: '<p>100K+ games unblocked gaming hub. The ultimate UBG experience with proxy, educational tools, apps, and endless customization. Built for performance and accessibility.</p>',
      tech: ['JavaScript', 'Proxy', 'WebSocket', 'Node.js'],
      github: 'https://github.com/1ajh/vaultv6',
      live: 'https://ajhmath.org'
    },
    'Vault V6 Enhanced': {
      icon: 'fa-vault',
      badge: 'Gaming',
      desc: '<p>Enhanced version of the vault with additional features, improved UI, and better performance. Built with modern web technologies.</p>',
      tech: ['JavaScript', 'React', 'Node.js'],
      github: 'https://github.com/1ajh/vault-v6f',
      live: '#'
    },
    'UV Static': {
      icon: 'fa-bolt',
      badge: 'Tools',
      desc: '<p>UV static proxy service for bypassing restrictions and accessing content freely. Supports multiple protocols and endpoints.</p>',
      tech: ['Bun', 'TypeScript', 'Hono'],
      github: 'https://github.com/1ajh/uv-static',
      live: '#'
    },
    'Zo Computer': {
      icon: 'fa-rocket',
      badge: 'Web Apps',
      desc: '<p>Personal AI workspace and cloud computer. A modern take on personal computing with AI integration and seamless workflow.</p>',
      tech: ['React', 'TypeScript', 'Bun'],
      github: 'https://github.com/1ajh',
      live: 'https://ajhs.zo.computer'
    },
    'Korone Bootstrapper': {
      icon: 'fa-download',
      badge: 'Tools',
      desc: '<p>Windows installer and bootstrapper for Roblox client. Handles dependencies, installations, and updates seamlessly.</p>',
      tech: ['C++', 'CMake', 'Windows API'],
      github: 'https://github.com/1ajh/Korone-Bootstrapper',
      live: '#'
    },
    'Pekona Clients': {
      icon: 'fa-mobile-alt',
      badge: 'Experimental',
      desc: '<p>Custom Roblox Android clients with modifications. Historical versions from 2017-2021 showcasing evolution of mobile gaming clients.</p>',
      tech: ['Java', 'Kotlin', 'Android'],
      github: 'https://github.com/1ajh/Pekone-Unofficial-Clients-1',
      live: '#'
    },
    '2024 Roblox Client': {
      icon: 'fa-gamepad',
      badge: 'Experimental',
      desc: '<p>Latest Roblox client build with custom modifications and optimizations. Exploring new rendering and performance improvements.</p>',
      tech: ['C++', 'Lua', 'Roblox Studio'],
      github: 'https://github.com/1ajh/2024-roblox',
      live: '#'
    }
  };
  
  // Click handlers for project cards
  const projectCards = document.querySelectorAll('.project-card.clickable');
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.project-title')?.textContent;
      const data = projectsData[title];
      
      if (data && modal) {
        modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        modalTitle.textContent = title;
        modalBadge.textContent = data.badge;
        modalDesc.innerHTML = data.desc;
        modalTechTags.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
        modalGithub.href = data.github;
        modalLive.href = data.live;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Section Transitions
 * Adds smooth entrance animations when sections scroll into view
 */
function initSectionTransitions() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });

  sections.forEach(section => {
    section.classList.add('section-transition');
    sectionObserver.observe(section);
  });
}

/**
 * Hover Effects
 * Enhanced hover interactions for cards and interactive elements
 */
function initHoverEffects() {
  // Project cards - tilt effect on hover
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Social links - glow effect on hover
  const socialLinks = document.querySelectorAll('.footer-links a, .social-links a');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-3px) scale(1.1)';
      link.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.4)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0) scale(1)';
      link.style.boxShadow = 'none';
    });
  });

  // Skill bars - shimmer effect on hover
  const skillBars = document.querySelectorAll('.skill-item');
  
  skillBars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      const fill = bar.querySelector('.skill-fill');
      if (fill) {
        fill.style.background = `linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%)`;
        fill.style.backgroundSize = '200% 100%';
        fill.style.animation = 'shimmer 1.5s ease infinite';
      }
    });
    
    bar.addEventListener('mouseleave', () => {
      const fill = bar.querySelector('.skill-fill');
      if (fill) {
        fill.style.background = '';
        fill.style.backgroundSize = '';
        fill.style.animation = '';
      }
    });
  });

  // Demo cards - border glow on hover
  const demoCards = document.querySelectorAll('.demo-card');
  
  demoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent-primary)';
      card.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.style.boxShadow = '';
    });
  });
}

/**
 * Scroll Animations
 * Advanced scroll-based animations for various elements
 */
function initScrollAnimations() {
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero-visual');
  
  if (hero && heroVisual) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;
      
      if (scrolled < heroHeight) {
        const parallaxValue = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${parallaxValue}px)`;
        
        // Also adjust opacity
        const opacityValue = 1 - (scrolled / heroHeight) * 0.5;
        heroVisual.style.opacity = opacityValue;
      }
    }, { passive: true });
  }

  // Fade sections on scroll
  const fadeElements = document.querySelectorAll('.about-card, .project-card, .timeline-item');
  
  fadeElements.forEach((el, index) => {
    el.style.setProperty('--fade-delay', `${index * 0.1}s`);
  });

  // Animate stats counters on scroll
  const statsSection = document.querySelector('#stats');
  let statsAnimated = false;
  
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
          });
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }

  // Timeline reveal animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('timeline-visible');
        }, index * 150);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // Add CSS for timeline visible state
  if (!document.getElementById('scroll-animations-styles')) {
    const styles = document.createElement('style');
    styles.id = 'scroll-animations-styles';
    styles.textContent = `
      /* Section Transitions */
      .section-transition {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .section-transition.section-visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Timeline Animations */
      .timeline-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.5s ease;
      }
      
      .timeline-item.timeline-visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* Shimmer animation for skill bars */
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      /* Project card transition reset */
      .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      
      /* Demo card transitions */
      .demo-card {
        transition: all 0.3s ease;
      }
      
      /* Footer link transitions */
      .footer-links a, .social-links a {
        transition: all 0.3s ease;
      }
      
      /* Skill item transitions */
      .skill-item {
        transition: all 0.3s ease;
      }
      
      /* Hero visual parallax container */
      .hero-visual {
        will-change: transform, opacity;
      }
    `;
    document.head.appendChild(styles);
  }
}/**
 * Random Motivational Quote
 * Displays a rotating inspirational quote in the hero section
 */
function initRandomQuote() {
  const quotes = [
    { text: "Build something people want to use.", author: "Paul Graham" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Code is read way more than it is written.", author: "Peter Provost" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "The most disastrous thing you can learn is your first programming language.", author: "Alan Kay" },
    { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
    { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
    { text: "Get comfortable with being uncomfortable.", author: "AJ H" },
    { text: "Ship when it is done, not when it is perfect.", author: "AJ H" },
    { text: "Build daily. Never stop. Always improve.", author: "AJ H" },
    { text: "The only way to go fast is to go well.", author: "Uncle Bob" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  ];

  const quoteDisplay = document.querySelector(".quote-display");

  if (!quoteDisplay) {
    const quoteEl = document.createElement("div");
    quoteEl.className = "quote-display";
    quoteEl.style.fontSize = "1rem";
    quoteEl.style.color = "var(--text-secondary)";
    quoteEl.style.fontStyle = "italic";
    quoteEl.style.marginTop = "15px";
    quoteEl.style.opacity = "0";
    quoteEl.style.transition = "opacity 0.5s ease";
    
    const hero = document.querySelector(".hero");
    const heroStats = document.querySelector(".hero-stats");
    if (hero && heroStats) {
      heroStats.insertAdjacentElement("afterend", quoteEl);
    }
  }

  const newQuoteDisplay = document.querySelector(".quote-display");
  if (!newQuoteDisplay) return;

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    newQuoteDisplay.style.opacity = "0";

    setTimeout(() => {
      newQuoteDisplay.innerHTML = `"${quote.text}" <span style="color: var(--accent-primary);">— ${quote.author}</span>`;
      newQuoteDisplay.style.opacity = "1";
    }, 300);
  }

  showRandomQuote();
  setInterval(showRandomQuote, 15000);

  const quoteBtn = document.querySelector(".quote-rotate-btn");
  if (quoteBtn) {
    quoteBtn.addEventListener("click", showRandomQuote);
  }
}

// ==========================================
// COMMAND PALETTE (Ctrl+K)
// ==========================================
function initCommandPalette() {
  const existing = document.getElementById('command-palette');
  if (existing) existing.remove();

  const palette = document.createElement('div');
  palette.id = 'command-palette';
  palette.className = 'command-palette';
  palette.innerHTML = `
    <div class="cp-overlay"></div>
    <div class="cp-container">
      <div class="cp-header">
        <i class="fas fa-terminal"></i>
        <input type="text" class="cp-input" placeholder="Type a command or search..." />
        <kbd>Esc</kbd>
      </div>
      <div class="cp-results"></div>
      <div class="cp-footer">
        <span><kbd>↑↓</kbd> Navigate</span>
        <span><kbd>↵</kbd> Select</span>
        <span><kbd>Esc</kbd> Close</span>
      </div>
    </div>
  `;
  document.body.appendChild(palette);

  const cpInput = palette.querySelector('.cp-input');
  const cpResults = palette.querySelector('.cp-results');
  const cpOverlay = palette.querySelector('.cp-overlay');

  const commands = [
    { icon: 'fa-home', label: 'Go to Home', action: () => scrollTo('#home') },
    { icon: 'fa-user', label: 'Go to About', action: () => scrollTo('#about') },
    { icon: 'fa-code', label: 'Go to Projects', action: () => scrollTo('#projects') },
    { icon: 'fa-tools', label: 'Go to Skills', action: () => scrollTo('#skills') },
    { icon: 'fa-chart-bar', label: 'Go to Stats', action: () => scrollTo('#stats') },
    { icon: 'fa-road', label: 'Go to Journey', action: () => scrollTo('#journey') },
    { icon: 'fa-play', label: 'Go to Demos', action: () => scrollTo('#demos') },
    { icon: 'fa-pen', label: 'Go to Blog', action: () => scrollTo('#blog') },
    { icon: 'fa-envelope', label: 'Go to Contact', action: () => scrollTo('#contact') },
    { icon: 'fa-bell', label: 'Go to Newsletter', action: () => scrollTo('#newsletter') },
    { icon: 'fa-moon', label: 'Toggle Dark/Light Theme', action: () => document.querySelector('.theme-toggle')?.click() },
    { icon: 'fa-search', label: 'Open Search', action: () => document.querySelector('.search-btn')?.click() },
    { icon: 'fa-arrow-up', label: 'Scroll to Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: 'fa-arrow-down', label: 'Scroll to Bottom', action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) },
    { icon: 'fa-redo', label: 'Refresh Page', action: () => location.reload() },
    { icon: 'fa-keyboard', label: 'Show Keyboard Shortcuts', action: () => document.getElementById('shortcuts-toggle')?.click() },
  ];

  function renderResults(filter = '') {
    const filtered = filter
      ? commands.filter(c => c.label.toLowerCase().includes(filter.toLowerCase()))
      : commands;
    cpResults.innerHTML = filtered.map((c, i) => `
      <div class="cp-result" data-index="${i}">
        <i class="fas ${c.icon}"></i>
        <span>${c.label}</span>
      </div>
    `).join('');

    if (!filtered.length) {
      cpResults.innerHTML = '<div class="cp-no-results">No commands found</div>';
    }
  }

  function openPalette() {
    palette.classList.add('active');
    cpInput.focus();
    cpInput.value = '';
    renderResults();
  }

  function closePalette() {
    palette.classList.remove('active');
  }

  cpInput.addEventListener('input', (e) => renderResults(e.target.value.toLowerCase()));

  cpResults.addEventListener('click', (e) => {
    const result = e.target.closest('.cp-result');
    if (result) {
      const index = parseInt(result.dataset.index);
      const filtered = cpInput.value
        ? commands.filter(c => c.label.toLowerCase().includes(cpInput.value.toLowerCase()))
        : commands;
      if (filtered[index]) {
        filtered[index].action();
        closePalette();
      }
    }
  });

  cpOverlay.addEventListener('click', closePalette);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });
}

// ==========================================
// DAILY STREAK TRACKER
// ==========================================
function initDailyStreak() {
  const STREAK_KEY = 'ajh_daily_streak';
  const LAST_VISIT_KEY = 'ajh_last_visit';
  
  function getToday() {
    return new Date().toDateString();
  }
  
  function updateStreak() {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const today = getToday();
    
    if (lastVisit === today) {
      return; // Already visited today
    }
    
    let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
      streak += 1; // Continuing streak
    } else if (lastVisit !== today) {
      streak = 1; // Reset streak
    }
    
    localStorage.setItem(STREAK_KEY, streak.toString());
    localStorage.setItem(LAST_VISIT_KEY, today);
  }
  
  updateStreak();
  
  const streakCount = parseInt(localStorage.getItem(STREAK_KEY) || '0');
  const streakEl = document.querySelector('.streak-count');
  if (streakEl) {
    streakEl.textContent = `${streakCount} day${streakCount !== 1 ? 's' : ''}`;
  }
}

// ==========================================
// PAGE VIEWS COUNTER
// ==========================================
function initPageViews() {
  const VIEWS_KEY = 'ajh_page_views';
  let views = parseInt(localStorage.getItem(VIEWS_KEY) || '0');
  views += 1;
  localStorage.setItem(VIEWS_KEY, views.toString());
  
  const viewsEl = document.querySelector('.page-views-count');
  if (viewsEl) {
    viewsEl.textContent = formatNumber(views);
  }
}

// ==========================================
// CANVAS PARTICLE ANIMATION
// ==========================================
function initCanvasAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) {
    // Create canvas if it doesn't exist
    const hero = document.querySelector('.hero');
    if (hero) {
      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'hero-canvas';
      hero.style.position = 'relative';
      hero.insertBefore(newCanvas, hero.firstElementChild);
      canvas = newCanvas;
    } else {
      return;
    }
  }
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  
  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    if (hero) {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
  }
  
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    };
  }
  
  function initParticles() {
    particles = [];
    const count = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
      ctx.fill();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 100)})`;
          ctx.stroke();
        }
      });
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  resizeCanvas();
  initParticles();
  animate();
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
  
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Helper function for scrollTo
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) {
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      item.classList.toggle('open');
      question.setAttribute('aria-expanded', !isOpen);
    });
  });
}

// Additional demo placeholder gradient backgrounds
const style = document.createElement('style');
style.textContent = `
  .demo-placeholder.gradient-bg {
    background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  }
`;
document.head.appendChild(style);
/**
 * Day 37 - 2026 Web Features
 * Building better every day
 */

// Noise Overlay Generator
function initNoiseOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'noise-overlay';
  document.body.appendChild(overlay);
}

// Blob Background Generator
function initBlobBackground() {
  const blob = document.createElement('div');
  blob.className = 'blob-bg';
  blob.style.top = '-200px';
  blob.style.left = '-200px';
  document.body.appendChild(blob);
}

// Bento Stats Enhancement
function initBentoStats() {
  const stats = document.querySelectorAll('.bento-stat');
  stats.forEach((stat, index) => {
    stat.style.animationDelay = `${index * 0.1}s`;
    stat.classList.add('bounce-in');
  });
}

// Magnetic Button Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Kinetic Title Animation
function initKineticTitle() {
  const title = document.querySelector('.kinetic-title');
  if (!title) return;
  
  // Add subtle mouse tracking for parallax effect
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    
    title.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Morphing Blob Animation
function initMorphBlob() {
  const blob = document.querySelector('.blob-bg');
  if (!blob) return;
  
  let mouseX = 0, mouseY = 0;
  let blobX = 0, blobY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 100;
  });
  
  function animate() {
    blobX += (mouseX - blobX) * 0.02;
    blobY += (mouseY - blobY) * 0.02;
    
    blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
    requestAnimationFrame(animate);
  }
  
  animate();
}

// 3D Card Tilt Effect
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    const inner = card.querySelector('.tilt-card-inner') || card;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
}

// Page Transition Effect
function initPageTransition() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  
  // Trigger on internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        transition.classList.add('active');
        setTimeout(() => {
          transition.classList.remove('active');
        }, 500);
      }
    });
  });
}

// Liquid Button Ripple
function initLiquidButtons() {
  const buttons = document.querySelectorAll('.liquid-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        width: 10px;
        height: 10px;
        left: ${x}px;
        top: ${y}px;
        animation: rippleEffect 0.6s ease-out;
      `;
      
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Gradient Border Animation
function initGradientBorders() {
  const borders = document.querySelectorAll('.gradient-border');
  
  borders.forEach(border => {
    border.style.position = 'relative';
  });
}

// Typewriter Effect for Hero
function initTypewriter() {
  const elements = document.querySelectorAll('.typewriter');
  
  elements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid var(--accent-primary)';
    
    let index = 0;
    function type() {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, 50);
      } else {
        setTimeout(() => {
          el.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    type();
  });
}

// Bento Grid Mouse Follower
function initBentoFollower() {
  const bentoItems = document.querySelectorAll('.bento-item');
  
  bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      item.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.1), transparent 50%)
      `;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.background = '';
    });
  });
}

// Enhanced Particle System
function initEnhancedParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.4;';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2})`
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Draw connections
      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  resize();
  createParticles();
  animate();
  
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

// Initialize Day 37 Features
document.addEventListener('DOMContentLoaded', () => {
  initNoiseOverlay();
  initBlobBackground();
  initBentoStats();
  initMagneticButtons();
  initKineticTitle();
  initMorphBlob();
  initTiltCards();
  initPageTransition();
  initLiquidButtons();
  initTypewriter();
  initBentoFollower();
  initEnhancedParticles();
  
  console.log('Day 37 Features Initialized - Building better every day');
});

// Role Text Rotator - Day 38
const roles = [
  'Full-Stack Developer',
  'Daily Builder',
  'Gaming Hub Creator',
  'Problem Solver',
  'Code Craftsman',
  ' Bronx Native',
  'Never Stopping'
];

function initRoleText() {
  const roleEl = document.getElementById('role-text');
  if (!roleEl) return;
  
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;
  
  function typeRole() {
    const currentRole = roles[currentIndex];
    
    if (isDeleting) {
      roleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      roleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % roles.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
  }
  
  // Start typing after a brief delay
  setTimeout(typeRole, 1000);
}

/* ===== MAIN JAVASCRIPT ===== */
(function() {
  'use strict';

  // ===== DOM READY =====
  const ready = fn => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

  // ===== UTILITIES =====
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // ===== HEADER SCROLL EFFECT =====
  function initHeaderScroll() {
    const header = $('.header');
    if (!header) return;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 20);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE DRAWER =====
  function initMobileDrawer() {
    const btn = $('.mobile-menu-btn');
    const drawer = $('.drawer');
    if (!btn || !drawer) return;

    const open = () => { drawer.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    const toggle = () => drawer.classList.contains('open') ? close() : open();

    btn.addEventListener('click', toggle);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
  }

  // ===== ACTIVE NAV ON SCROLL =====
  function initActiveNav() {
    const sections = $$('section[id]');
    const links = $$('.nav-link');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

    sections.forEach(s => observer.observe(s));
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });

    items.forEach(el => observer.observe(el));
  }

  // ===== SMOOTH SCROLL OFFSET =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerH = $('.header')?.offsetHeight || 72;
          const targetPos = target.getBoundingClientRect().top + window.scrollY - headerH;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  // ===== FAQ FUNCTIONALITY =====
  function initFAQ() {
    const searchInput = $('.faq-search-input');
    const tabs = $$('.faq-tab');
    const items = $$('.faq-item');
    const emptyState = $('.faq-empty');

    if (!items.length) return;

    let currentCategory = 'all';
    let searchQuery = '';

    // Search filter
    if (searchInput) {
      searchInput.addEventListener('input', debounce(e => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterFAQ();
      }, 150));
    }

    // Category tabs
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        filterFAQ();
      });
    });

    // Accordion
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all others
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });

      // Keyboard support
      question?.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });

    function filterFAQ() {
      let visibleCount = 0;
      items.forEach(item => {
        const questionText = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.faq-answer-content')?.textContent.toLowerCase() || '';
        const category = item.dataset.category;

        const matchesSearch = !searchQuery || questionText.includes(searchQuery) || answerText.includes(searchQuery);
        const matchesCategory = currentCategory === 'all' || category === currentCategory;

        if (matchesSearch && matchesCategory) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
          item.classList.remove('open');
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('visible', visibleCount === 0);
      }
    }
  }

  // ===== COPY CODE BUTTONS =====
  function initCodeCopy() {
    $$('pre code').forEach(block => {
      if (block.parentElement.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn btn-ghost btn-icon';
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      btn.title = 'Copy code';
      btn.style.position = 'absolute';
      btn.style.top = '0.75rem';
      btn.style.right = '0.75rem';
      btn.style.opacity = '0';
      btn.style.transition = 'opacity var(--transition-fast)';
      block.parentElement.style.position = 'relative';
      block.parentElement.appendChild(btn);

      block.parentElement.addEventListener('mouseenter', () => btn.style.opacity = '1');
      block.parentElement.addEventListener('mouseleave', () => btn.style.opacity = '0');

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
          setTimeout(() => btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', 2000);
        } catch (e) {
          console.error('Copy failed', e);
        }
      });
    });
  }

  // ===== PARALLAX ORBS =====
  function initParallaxOrbs() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const orbs = $$('.orb');
    if (!orbs.length) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          orbs.forEach((orb, i) => {
            const speed = 0.15 + i * 0.05;
            orb.style.transform = `translateY(${y * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== THEME TOGGLE (optional) =====
  function initThemeToggle() {
    const toggle = $('#theme-toggle');
    if (!toggle) return;
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initTheme = stored || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', initTheme);
    toggle.setAttribute('aria-pressed', initTheme === 'dark');

    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      toggle.setAttribute('aria-pressed', next === 'dark');
    });
  }

  // ===== CUSTOM CURSOR =====
  function initCustomCursor() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;
    let lastParticleTime = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create trail particles (throttled)
      const now = Date.now();
      if (now - lastParticleTime > 50) {
        createParticle(mouseX, mouseY);
        lastParticleTime = now;
      }
    });
    
    // Hover detection for interactive elements
    const hoverTargets = 'a, button, .btn, .card, .faq-question, .suggestion-btn, input, textarea, [role="button"]';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) {
        isHovering = true;
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) {
        isHovering = false;
        document.body.classList.remove('cursor-hover');
      }
    });
    
    // Click animation
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    
    // Smooth cursor ring follow
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Create trail particle
    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
    
    // Hide default cursor
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);
  }

  // ===== MAGNETIC BUTTONS =====
  function initMagneticButtons() {
    if ('ontouchstart' in window) return;
    
    const magneticElements = $$('.btn-primary, .btn-secondary, .logo');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;
        
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ===== TILT EFFECT ON CARDS =====
  function initCardTilt() {
    if ('ontouchstart' in window) return;
    
    const cards = $$('.card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 8;
        const tiltY = (x - 0.5) * -8;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.01)`;
        
        // Set mouse position for glow
        card.style.setProperty('--mouse-x', (x * 100) + '%');
        card.style.setProperty('--mouse-y', (y * 100) + '%');
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ===== ANIMATED COUNTER FOR TRUST STATS =====
  function initTrustCounters() {
    const statNumbers = $$('.stat-number');
    if (!statNumbers.length) return;
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    statNumbers.forEach(el => {
      const originalText = el.textContent.trim();
      const numMatch = originalText.match(/\d+/);
      if (!numMatch) return;
      
      const finalNum = parseInt(numMatch[0]);
      const suffix = originalText.replace(numMatch[0], '');
      
      if (prefersReduced) return;
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const duration = 1800;
            const start = performance.now();
            
            const animate = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = Math.round(finalNum * eased);
              el.textContent = current + suffix;
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = originalText;
              }
            };
            
            requestAnimationFrame(animate);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(el);
    });
  }

  // ===== DEBOUNCE =====
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  // ===== HERO GRADIENT MESH BACKGROUND =====
  function initHeroMesh() {
    const canvas = document.getElementById('hero-mesh');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;
    let time = 0;
    
    // Mesh points for organic gradient
    const points = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, color: [0, 229, 179] },  // accent
      { x: 0.7, y: 0.6, vx: -0.0002, vy: 0.0003, color: [99, 102, 241] }, // secondary
      { x: 0.5, y: 0.2, vx: 0.0002, vy: -0.0002, color: [34, 211, 238] }, // cyan
      { x: 0.3, y: 0.8, vx: -0.0003, vy: -0.0001, color: [0, 229, 179] }, // accent
      { x: 0.8, y: 0.2, vx: 0.0001, vy: 0.0002, color: [99, 102, 241] },  // secondary
      { x: 0.1, y: 0.6, vx: 0.0002, vy: -0.0003, color: [34, 211, 238] }, // cyan
    ];
    
    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Update point positions
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        
        // Clamp
        p.x = Math.max(0, Math.min(1, p.x));
        p.y = Math.max(0, Math.min(1, p.y));
      });
      
      // Draw gradient mesh
      points.forEach(p => {
        const gradient = ctx.createRadialGradient(
          p.x * width, p.y * height, 0,
          p.x * width, p.y * height, Math.min(width, height) * 0.5
        );
        
        const [r, g, b] = p.color;
        const pulse = Math.sin(time * 0.02 + p.x * 10) * 0.3 + 0.7;
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.15 * pulse})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.05 * pulse})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
      
      // Add subtle noise-like effect with small dots
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.01 + i * 0.5) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.015 + i * 0.7) * 0.5 + 0.5) * height;
        const size = Math.sin(time * 0.03 + i) * 2 + 3;
        const alpha = Math.sin(time * 0.02 + i * 0.3) * 0.3 + 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 179, ${alpha})`;
        ctx.fill();
      }
      
      time++;
      animationId = requestAnimationFrame(draw);
    }
    
    // Start animation
    resize();
    draw();
    
    // Handle resize
    window.addEventListener('resize', debounce(resize, 100));
    
    // Pause when not visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) draw();
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
  }

  // ===== SCROLL-TRIGGERED COUNTER ANIMATIONS =====
  function initScrollCounters() {
    const counters = $$('.stat-number[data-target]');
    if (!counters.length) return;
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();
          
          // Easing function for smooth animation
          const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            const current = Math.round(target * eased);
            
            el.textContent = current + suffix;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });
    
    counters.forEach(el => observer.observe(el));
  }

  // ===== INIT ALL =====
  ready(() => {
    initHeaderScroll();
    initMobileDrawer();
    initActiveNav();
    initScrollReveal();
    initSmoothScroll();
    initFAQ();
    initCodeCopy();
    initParallaxOrbs();
    initThemeToggle();
    initCustomCursor();
    initMagneticButtons();
    initCardTilt();
    initTrustCounters();
    initHeroMesh();
    initScrollCounters();
  });
})();
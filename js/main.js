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

  // ===== DEBOUNCE =====
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
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
  });
})();
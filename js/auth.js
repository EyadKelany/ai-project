/* ===== AUTH STATE MANAGEMENT ===== */
(function() {
  'use strict';

  function updateNavAuth(user) {
    const slots = document.querySelectorAll('.auth-nav-slot');
    if (!slots.length) return;

    slots.forEach(slot => {
      slot.innerHTML = '';
      if (user) {
        const email = user.email || 'Account';
        const short = email.length > 18 ? email.substring(0, 18) + '...' : email;
        const btn = document.createElement('button');
        btn.className = 'btn btn-ghost auth-user-btn';
        btn.title = email;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ' + short;
        btn.addEventListener('click', async function() {
          await supabaseClient.auth.signOut();
          window.location.reload();
        });
        slot.appendChild(btn);
      } else {
        const link = document.createElement('a');
        link.href = 'login.html';
        link.className = 'btn btn-ghost auth-login-link';
        link.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Sign In';
        slot.appendChild(link);
      }
    });
  }

  async function initAuth() {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      updateNavAuth(session?.user || null);

      supabaseClient.auth.onAuthStateChange((event, session) => {
        updateNavAuth(session?.user || null);
      });
    } catch (e) {
      console.warn('Auth init failed:', e);
    }
  }

  const ready = fn => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
  ready(initAuth);
})();

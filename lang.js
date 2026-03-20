// Shared language switcher — included in all portfolio pages
(function() {
  const STORAGE_KEY = 'portfolio_lang';

  const LANG_SCRIPT = `
  /* LANG TOGGLE */
  .lang-toggle {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--ink-faint);
    border-radius: 3px;
    overflow: hidden;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
  }
  .lang-btn {
    padding: 4px 10px;
    cursor: pointer;
    color: var(--ink-light);
    background: transparent;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    transition: background 0.15s, color 0.15s;
  }
  .lang-btn.active {
    background: var(--ink);
    color: var(--paper);
  }
  .lang-btn:hover:not(.active) {
    background: var(--ink-faint);
    color: var(--ink);
  }
  `;

  window.__applyLang = function(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerHTML = lang === 'pt' ? el.dataset.pt : el.dataset.en;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  };

  window.__initLang = function() {
    // Inject toggle CSS
    const style = document.createElement('style');
    style.textContent = LANG_SCRIPT;
    document.head.appendChild(style);

    // Build toggle HTML
    const toggle = document.createElement('div');
    toggle.className = 'lang-toggle';
    toggle.innerHTML = '<button class="lang-btn" data-lang="en">EN</button><button class="lang-btn" data-lang="pt">PT</button>';
    toggle.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => window.__applyLang(btn.dataset.lang));
    });

    // Insert into nav
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.appendChild(toggle);

    // Apply saved or default lang
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    window.__applyLang(saved);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.__initLang);
  } else {
    window.__initLang();
  }
})();

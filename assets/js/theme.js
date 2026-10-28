/**
 * Theme Manager for Karimnagar4You
 * Supports Light & Dark dual-mode with localStorage persistence & system fallback
 */
(function () {
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    sunIcons.forEach(el => {
      if (isDark) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    moonIcons.forEach(el => {
      if (isDark) {
        el.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
      }
    });
  }

  // Initial detection
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Global toggle function
  window.toggleTheme = function () {
    const currentlyDark = document.documentElement.classList.contains('dark');
    applyTheme(!currentlyDark);
  };

  // Sync icon state on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const isNowDark = document.documentElement.classList.contains('dark');
    updateThemeIcons(isNowDark);
  });
})();

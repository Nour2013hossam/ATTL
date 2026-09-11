const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const langToggle = document.getElementById('lang-toggle');

// Mobile navigation
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

// Bilingual interface
let currentLang = localStorage.getItem('attl-language') || 'en';

function applyLanguage(lang) {
  currentLang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-en][data-ar]').forEach(element => {
    element.innerHTML = element.dataset[currentLang];
  });

  if (langToggle) {
    langToggle.textContent = currentLang === 'en' ? 'العربية' : 'English';
    langToggle.setAttribute(
      'aria-label',
      currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English'
    );
  }

  localStorage.setItem('attl-language', currentLang);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  });
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Scroll reveal for major cards/sections
const revealItems = document.querySelectorAll('.section, .join, .glass-strip, .track, .glass-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

applyLanguage(currentLang);

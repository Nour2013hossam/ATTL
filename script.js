const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const langToggle = document.getElementById('lang-toggle');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

let currentLang = localStorage.getItem('attl-language') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    el.innerHTML = el.dataset[lang];
  });

  langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
  langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Arabic' : 'Switch to English');
  localStorage.setItem('attl-language', lang);
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'ar' : 'en');
});

document.getElementById('year').textContent = new Date().getFullYear();
applyLanguage(currentLang);

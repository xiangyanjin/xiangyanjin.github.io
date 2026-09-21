(() => {
  const buttons = document.querySelectorAll('[data-set-lang]');
  function setLanguage(language) {
    const selected = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = selected === 'en' ? 'en' : 'zh-CN';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLang === selected)));
    try { localStorage.setItem('academic-homepage-language', selected); } catch (_) {}
  }
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));
  try { const saved = localStorage.getItem('academic-homepage-language'); if (saved) setLanguage(saved); } catch (_) {}
})();

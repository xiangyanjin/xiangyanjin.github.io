(() => {
  const buttons = document.querySelectorAll('[data-set-lang]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const papers = document.querySelectorAll('.paper[data-topic]');
  const status = document.getElementById('filter-status');

  function updateFilterStatus() {
    if (!status) return;
    const count = [...papers].filter(paper => !paper.hidden).length;
    status.textContent = document.documentElement.lang === 'en'
      ? `Showing ${count} of ${papers.length} preprints.`
      : `显示 ${papers.length} 篇预印本中的 ${count} 篇。`;
  }

  function setLanguage(language) {
    const selected = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = selected === 'en' ? 'en' : 'zh-CN';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLang === selected)));
    updateFilterStatus();
    try { localStorage.setItem('academic-homepage-language', selected); } catch (_) {}
  }
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));
  try { const saved = localStorage.getItem('academic-homepage-language'); if (saved) setLanguage(saved); } catch (_) {}

  filterButtons.forEach(button => button.addEventListener('click', () => {
    const topic = button.dataset.filter;
    papers.forEach(paper => { paper.hidden = topic !== 'all' && paper.dataset.topic !== topic; });
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateFilterStatus();
  }));
  const filters = document.querySelector('.paper-filters');
  if (filters) filters.hidden = false;
  updateFilterStatus();
})();

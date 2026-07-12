import { state, saveState } from './state.js';

export function navigateTo(tab) {
  state.currentTab = tab;
  saveState();

  // Mettre à jour l'UI
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tab) {
      btn.classList.add('active');
    }
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    if (content.id === tab) {
      content.classList.add('active');
    }
  });

  // Charger les données spécifiques à l'onglet
  switch(tab) {
    case 'clients':
      // Code spécifique si nécessaire
      break;
    case 'properties':
      // Code spécifique si nécessaire
      break;
    case 'schedule':
      renderSchedule();
      break;
  }
}
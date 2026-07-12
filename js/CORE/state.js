export const state = {
  clients: [],
  properties: [],
  services: [
    { id: '1', name: 'Ménage standard', duration: '1h', price: 45, category: 'cleaning' },
    { id: '2', name: 'Ménage complet', duration: '2h', price: 85, category: 'cleaning' },
    { id: '3', name: 'Nettoyage après départ', duration: '1h30', price: 65, category: 'cleaning' },
    { id: '4', name: 'Rangement', duration: '45min', price: 35, category: 'cleaning' },
    { id: '5', name: 'Maintenance technique', duration: '2h', price: 90, category: 'maintenance' }
  ],
  quotes: [],
  schedule: [],
  notes: [],
  currentTab: 'dashboard',
  darkMode: false,
  compactView: false,
  currentWeek: new Date()
};

// Charger depuis localStorage
const savedState = localStorage.getItem('hestiacleanState');
if (savedState) {
  Object.assign(state, JSON.parse(savedState));
}

// Sauvegarder dans localStorage
export function saveState() {
  localStorage.setItem('hestiacleanState', JSON.stringify(state));
}
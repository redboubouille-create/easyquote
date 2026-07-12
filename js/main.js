import { state, saveState } from './core/state.js';
import { navigateTo } from './core/router.js';
import {
  addClient, getClients, deleteClient, updateClient, getClientById
} from './modules/client.js';
import {
  addProperty, getProperties, deleteProperty, updateProperty, getPropertiesByClient
} from './modules/property.js';
import {
  addService, getServices, deleteService, updateService
} from './modules/service.js';
import {
  createQuote, getQuotes, updateQuoteStatus, getQuotesByClient
} from './modules/quote.js';
import {
  addScheduleItem, getScheduleForWeek, getUpcomingSchedule, deleteScheduleItem
} from './modules/schedule.js';
import {
  addNote, getNotes, getNotesByClient, deleteNote
} from './modules/note.js';
import {
  validateClient, validateProperty, validateService, validateQuote, validateNote
} from './utils/validation.js';
import { exportData, importData } from './utils/storage.js';
import { formatDate, getWeekRange, addDays } from './utils/date.js';
import { calculateQuoteTotal, getInitials, debounce } from './utils/helpers.js';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupNavigation();
  setupModals();
  setupEventListeners();
  renderDashboard();
  renderClients();
  renderProperties();
  renderServices();
  renderSchedule();
  renderQuotes();
  renderNotes();
  updateClientFilter();
  updateQuoteFilters();
});

// Thème sombre
function setupTheme() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const compactViewToggle = document.getElementById('compact-view-toggle');

  darkModeToggle.checked = state.darkMode;
  compactViewToggle.checked = state.compactView;
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  document.documentElement.setAttribute('data-compact', state.compactView ? 'true' : 'false');

  darkModeToggle.addEventListener('change', () => {
    state.darkMode = darkModeToggle.checked;
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    saveState();
  });

  compactViewToggle.addEventListener('change', () => {
    state.compactView = compactViewToggle.checked;
    document.documentElement.setAttribute('data-compact', state.compactView ? 'true' : 'false');
    saveState();
  });
}

// Navigation
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateTo(button.dataset.tab);
    });
  });

  // Restaurer l'onglet actif
  if (state.currentTab) {
    const activeButton = document.querySelector(`.nav-btn[data-tab="${state.currentTab}"]`);
    if (activeButton) {
      activeButton.click();
    }
  }
}

// Modals
function setupModals() {
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close');

  // Ouvrir modals
  document.getElementById('add-client-btn')?.addEventListener('click', () => {
    openModal('client-modal', { mode: 'add', client: null });
  });

  document.getElementById('add-property-btn')?.addEventListener('click', () => {
    openModal('property-modal', { mode: 'add', property: null });
  });

  document.getElementById('add-service-btn')?.addEventListener('click', () => {
    openModal('service-modal', { mode: 'add', service: null });
  });

  document.getElementById('add-quote-btn')?.addEventListener('click', () => {
    openModal('quote-modal', { mode: 'add', quote: null });
  });

  document.getElementById('add-note-btn')?.addEventListener('click', () => {
    openModal('note-modal', { mode: 'add', note: null });
  });

  // Fermer modals
  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeModal(closeBtn.closest('.modal').id);
    });
  });

  // Fermer en cliquant à l'extérieur
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId, data = {}) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Configurer le modal en fonction des données
  if (modalId === 'client-modal') {
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('client-form');

    if (data.mode === 'edit' && data.client) {
      modalTitle.textContent = 'Modifier le client';
      form.querySelector('#client-name').value = data.client.name;
      form.querySelector('#client-email').value = data.client.email;
      form.querySelector('#client-phone').value = data.client.phone || '';
      form.querySelector('#client-address').value = data.client.address || '';
      form.querySelector('#client-notes').value = data.client.notes || '';
      form.dataset.clientId = data.client.id;
    } else {
      modalTitle.textContent = 'Ajouter un client';
      form.reset();
      form.removeAttribute('data-client-id');
    }
  }

  // Autres configurations de modals...

  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Rendu du tableau de bord
function renderDashboard() {
  // Statistiques
  document.getElementById('total-clients').textContent = state.clients.length;
  document.getElementById('total-properties').textContent = state.properties.length;
  document.getElementById('total-services').textContent = state.services.length;

  const totalRevenue = state.quotes.reduce((sum, quote) => {
    const price = parseFloat(quote.price || 0);
    const discount = parseFloat(quote.discount || 0);
    return sum + (price * (1 - discount / 100));
  }, 0);

  document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2) + ' €';

  // Prochaines interventions
  const upcomingSchedule = getUpcomingSchedule();
  const upcomingScheduleEl = document.getElementById('upcoming-schedule');
  upcomingScheduleEl.innerHTML = upcomingSchedule.length > 0
    ? upcomingSchedule.map(item => `
      <div class="upcoming-schedule-item">
        <div>
          <strong>${formatDate(item.date)}</strong>
          <div>${item.clientName || 'Client inconnu'}</div>
        </div>
        <div>
          <span>${item.serviceName}</span>
          <small>${item.duration}</small>
        </div>
      </div>
    `).join('')
    : '<p>Aucune intervention prévue prochainement</p>';

  // Notes récentes
  const recentNotes = [...state.notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const recentNotesEl = document.getElementById('recent-notes');
  recentNotesEl.innerHTML = recentNotes.length > 0
    ? recentNotes.map(note => `
      <div class="note-item">
        <strong>${note.title}</strong>
        <p>${truncateText(note.content, 100)}</p>
        <small>${formatDate(note.createdAt)}</small>
      </div>
    `).join('')
    : '<p>Aucune note récente</p>';

  // Alertes
  const alertsEl = document.getElementById('alerts-list');
  const alerts = [];

  // Alertes pour clients sans logement
  state.clients.forEach(client => {
    if (!state.properties.some(p => p.clientId === client.id)) {
      alerts.push({
        type: 'warning',
        message: `Client ${client.name} n'a aucun logement associé`
      });
    }
  });

  // Alertes pour devis en attente depuis plus de 7 jours
  state.quotes.forEach(quote => {
    if (quote.status === 'pending') {
      const daysSince = (new Date() - new Date(quote.createdAt)) / (1000 * 60 * 60 * 24);
      if (daysSince > 7) {
        alerts.push({
          type: 'warning',
          message: `Devis #${quote.id.substring(0, 4)} en attente depuis ${Math.floor(daysSince)} jours`
        });
      }
    }
  });

  alertsEl.innerHTML = alerts.length > 0
    ? alerts.map(alert => `
      <div class="alert-item alert-${alert.type}">
        <span>⚠️</span>
        <span>${alert.message}</span>
      </div>
    `).join('')
    : '<p>Aucune alerte</p>';
}

// Rendu des clients
function renderClients() {
  const clientsList = document.getElementById('clients-list');
  const clientSearch = document.getElementById('client-search');
  const clientSort = document.getElementById('client-sort');

  function renderFilteredClients() {
    let clients = [...state.clients];

    // Filtrage
    const searchTerm = clientSearch.value.toLowerCase();
    if (searchTerm) {
      clients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        (client.phone && client.phone.includes(searchTerm)) ||
        (client.address && client.address.toLowerCase().includes(searchTerm))
      );
    }

    // Tri
    const sortValue = clientSort.value;
    clients.sort((a, b) => {
      if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
      if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
      if (sortValue === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    // Affichage
    clientsList.innerHTML = clients.length > 0
      ? clients.map(client => `
        <li>
          <div class="client-info">
            <strong>${client.name}</strong>
            <div class="client-details">
              <span>${client.email}</span>
              ${client.phone ? <span>• ${client.phone}</span> : ''}
            </div>
            ${client.address ? <div class="client-address">${truncateText(client.address, 50)}</div> : ''}
          </div>
import { state, saveState } from '../core/state.js';

export function addService(serviceData) {
  const newService = {
    id: Date.now().toString(),
    ...serviceData,
    createdAt: new Date().toISOString()
  };

  state.services.push(newService);
  saveState();
  return newService;
}

export function getServices() {
  return [...state.services];
}

export function deleteService(serviceId) {
  // Supprimer les devis associés
  state.quotes = state.quotes.filter(quote => quote.serviceId !== serviceId);
  state.services = state.services.filter(s => s.id !== serviceId);
  saveState();
}

export function updateService(serviceId, updatedData) {
  const index = state.services.findIndex(s => s.id === serviceId);
  if (index !== -1) {
    state.services[index] = {
      ...state.services[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return state.services[index];
  }
  return null;
}
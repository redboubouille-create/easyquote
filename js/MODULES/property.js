import { state, saveState } from '../core/state.js';

export function addProperty(propertyData) {
  const newProperty = {
    id: Date.now().toString(),
    ...propertyData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  state.properties.push(newProperty);
  saveState();
  return newProperty;
}

export function getProperties() {
  return [...state.properties];
}

export function deleteProperty(propertyId) {
  // Supprimer les devis associés
  state.quotes = state.quotes.filter(quote => quote.propertyId !== propertyId);
  state.properties = state.properties.filter(p => p.id !== propertyId);
  saveState();
}

export function updateProperty(propertyId, updatedData) {
  const index = state.properties.findIndex(p => p.id === propertyId);
  if (index !== -1) {
    state.properties[index] = {
      ...state.properties[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return state.properties[index];
  }
  return null;
}

export function getPropertiesByClient(clientId) {
  return state.properties.filter(p => p.clientId === clientId);
}
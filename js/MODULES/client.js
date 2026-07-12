import { state, saveState } from '../core/state.js';

export function addClient(clientData) {
  const existingClient = state.clients.find(c =>
    c.email === clientData.email || c.phone === clientData.phone
  );

  if (existingClient) {
    throw new Error('Un client avec cet email ou téléphone existe déjà');
  }

  const newClient = {
    id: Date.now().toString(),
    ...clientData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  state.clients.push(newClient);
  saveState();
  return newClient;
}

export function getClients() {
  return [...state.clients];
}

export function deleteClient(clientId) {
  // Supprimer les notes associées
  state.notes = state.notes.filter(note => note.clientId !== clientId);
  // Supprimer les logements associés
  state.properties = state.properties.filter(prop => prop.clientId !== clientId);
  // Supprimer les devis associés
  state.quotes = state.quotes.filter(quote => quote.clientId !== clientId);

  state.clients = state.clients.filter(client => client.id !== clientId);
  saveState();
}

export function updateClient(clientId, updatedData) {
  const index = state.clients.findIndex(c => c.id === clientId);
  if (index !== -1) {
    state.clients[index] = {
      ...state.clients[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return state.clients[index];
  }
  return null;
}

export function getClientById(clientId) {
  return state.clients.find(c => c.id === clientId) || null;
}
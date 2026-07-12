import { state, saveState } from '../core/state.js';

export function createQuote(quoteData) {
  const newQuote = {
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...quoteData
  };

  state.quotes.push(newQuote);
  saveState();
  return newQuote;
}

export function getQuotes() {
  return [...state.quotes];
}

export function updateQuoteStatus(quoteId, status) {
  const quote = state.quotes.find(q => q.id === quoteId);
  if (quote) {
    quote.status = status;
    quote.updatedAt = new Date().toISOString();
    saveState();
    return quote;
  }
  return null;
}

export function getQuotesByClient(clientId) {
  return state.quotes.filter(q => q.clientId === clientId);
}

export function getQuotesByProperty(propertyId) {
  return state.quotes.filter(q => q.propertyId === propertyId);
}

export function getQuotesByDateRange(startDate, endDate) {
  return state.quotes.filter(q => {
    const quoteDate = new Date(q.date);
    return quoteDate >= startDate && quoteDate <= endDate;
  });
}
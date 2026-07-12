export function validateClient(clientData) {
  const errors = [];

  if (!clientData.name || clientData.name.trim() === '') {
    errors.push('Le nom est requis');
  }

  if (!clientData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)) {
    errors.push('Email invalide');
  }

  if (clientData.phone && !/^[\d\s\+\-]{8,}$/.test(clientData.phone)) {
    errors.push('Téléphone invalide');
  }

  if (clientData.address && clientData.address.trim() === '') {
    errors.push('L\'adresse est requise');
  }

  return errors;
}

export function validateProperty(propertyData) {
  const errors = [];

  if (!propertyData.name || propertyData.name.trim() === '') {
    errors.push('Le nom du logement est requis');
  }

  if (!propertyData.address || propertyData.address.trim() === '') {
    errors.push('L\'adresse est requise');
  }

  if (propertyData.bedrooms && (isNaN(propertyData.bedrooms) || propertyData.bedrooms < 1)) {
    errors.push('Nombre de chambres invalide');
  }

  if (propertyData.surface && (isNaN(propertyData.surface) || propertyData.surface < 10)) {
    errors.push('Surface invalide (minimum 10m²)');
  }

  return errors;
}

export function validateService(serviceData) {
  const errors = [];

  if (!serviceData.name || serviceData.name.trim() === '') {
    errors.push('Le nom de la prestation est requis');
  }

  if (!serviceData.duration || serviceData.duration.trim() === '') {
    errors.push('La durée est requise');
  }

  if (isNaN(serviceData.price) || parseFloat(serviceData.price) <= 0) {
    errors.push('Le prix doit être un nombre positif');
  }

  return errors;
}

export function validateQuote(quoteData) {
  const errors = [];

  if (!quoteData.clientId) {
    errors.push('Client requis');
  }

  if (!quoteData.serviceId) {
    errors.push('Prestation requise');
  }

  if (!quoteData.date) {
    errors.push('Date requise');
  }

  if (isNaN(quoteData.price) || parseFloat(quoteData.price) <= 0) {
    errors.push('Prix invalide');
  }

  return errors;
}

export function validateNote(noteData) {
  const errors = [];

  if (!noteData.title || noteData.title.trim() === '') {
    errors.push('Le titre est requis');
  }

  if (!noteData.content || noteData.content.trim() === '') {
    errors.push('Le contenu est requis');
  }

  return errors;
}
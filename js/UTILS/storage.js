export function exportData() {
  const data = {
    clients: state.clients,
    properties: state.properties,
    services: state.services,
    quotes: state.quotes,
    schedule: state.schedule,
    notes: state.notes,
    settings: {
      darkMode: state.darkMode,
      compactView: state.compactView
    }
  };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);

    // Validation basique
    if (!data.clients || !Array.isArray(data.clients)) {
      throw new Error('Données clients invalides');
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Données invalides: ' + error.message
    };
  }
}
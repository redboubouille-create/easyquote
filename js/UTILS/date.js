export function formatDate(date, options = {}) {
  const defaults = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const mergedOptions = { ...defaults, ...options };
  return new Date(date).toLocaleDateString('fr-FR', mergedOptions);
}

export function getWeekRange(date = new Date()) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getCurrentWeek() {
  return getWeekRange();
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
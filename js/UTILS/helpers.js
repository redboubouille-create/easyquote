export function calculateQuoteTotal(price, discount = 0) {
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}

export function getInitials(name) {
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
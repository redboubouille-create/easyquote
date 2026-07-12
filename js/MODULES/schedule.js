import { state, saveState } from '../core/state.js';

export function addScheduleItem(scheduleItem) {
  const newItem = {
    id: Date.now().toString(),
    ...scheduleItem,
    createdAt: new Date().toISOString()
  };

  state.schedule.push(newItem);
  saveState();
  return newItem;
}

export function getScheduleForWeek(weekStart) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return state.schedule.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });
}

export function getUpcomingSchedule() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...state.schedule]
    .filter(item => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
}

export function deleteScheduleItem(itemId) {
  state.schedule = state.schedule.filter(item => item.id !== itemId);
  saveState();
}

export function updateScheduleItem(itemId, updatedData) {
  const index = state.schedule.findIndex(item => item.id === itemId);
  if (index !== -1) {
    state.schedule[index] = {
      ...state.schedule[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return state.schedule[index];
  }
  return null;
}
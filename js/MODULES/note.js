import { state, saveState } from '../core/state.js';

export function addNote(noteData) {
  const newNote = {
    id: Date.now().toString(),
    ...noteData,
    createdAt: new Date().toISOString()
  };

  state.notes.push(newNote);
  saveState();
  return newNote;
}

export function getNotes() {
  return [...state.notes];
}

export function getNotesByClient(clientId) {
  return state.notes.filter(note => note.clientId === clientId);
}

export function deleteNote(noteId) {
  state.notes = state.notes.filter(note => note.id !== noteId);
  saveState();
}

export function updateNote(noteId, updatedData) {
  const index = state.notes.findIndex(note => note.id === noteId);
  if (index !== -1) {
    state.notes[index] = {
      ...state.notes[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return state.notes[index];
  }
  return null;
}

import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { Note } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes-app-data', []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const handleNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      lastModified: Date.now(),
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  }, [setNotes]);

  const handleDeleteNote = useCallback((idToDelete: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
    if (activeNoteId === idToDelete) {
      const remainingNotes = notes.filter(note => note.id !== idToDelete);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
  }, [notes, activeNoteId, setNotes]);
  
  const handleUpdateNote = useCallback((updatedFields: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === activeNoteId
          ? { ...note, ...updatedFields, lastModified: Date.now() }
          : note
      )
    );
  }, [activeNoteId, setNotes]);

  const getActiveNote = (): Note | null => {
    return notes.find(note => note.id === activeNoteId) || null;
  };
  
  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onNewNote={handleNewNote}
        onSelectNote={setActiveNoteId}
        onDeleteNote={handleDeleteNote}
      />
      <main className="flex-1">
        <Editor
          activeNote={getActiveNote()}
          onUpdateNote={handleUpdateNote}
        />
      </main>
    </div>
  );
};

export default App;

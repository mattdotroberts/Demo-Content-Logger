
import React from 'react';
import { Note } from '../types';
import { PlusIcon, TrashIcon } from './icons';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNewNote: () => void;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ notes, activeNoteId, onNewNote, onSelectNote, onDeleteNote }) => {
  const sortedNotes = [...notes].sort((a, b) => b.lastModified - a.lastModified);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteNote(id);
  };
  
  return (
    <div className="w-full md:w-80 border-r border-border h-screen bg-secondary/40 flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Notes</h1>
        <button
          onClick={onNewNote}
          className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label="Create new note"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedNotes.length > 0 ? (
          <ul>
            {sortedNotes.map((note) => (
              <li
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`
                  group
                  cursor-pointer p-4 border-b border-border
                  ${note.id === activeNoteId ? 'bg-accent' : 'hover:bg-accent/50'}
                  transition-colors duration-150
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-foreground truncate">{note.title || "Untitled Note"}</h2>
                    <p className="text-sm text-muted-foreground truncate">{note.content ? note.content.substring(0, 30) : 'No content'}</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, note.id)}
                    className="p-1 rounded-md text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete note: ${note.title}`}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No notes yet.</p>
            <p>Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

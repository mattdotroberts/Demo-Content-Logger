
import React, { useState, useEffect } from 'react';
import { Note } from '../types';

interface EditorProps {
  activeNote: Note | null;
  onUpdateNote: (updatedNote: Partial<Note>) => void;
}

const Editor: React.FC<EditorProps> = ({ activeNote, onUpdateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onUpdateNote({ title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onUpdateNote({ content: e.target.value });
  };

  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-background">
        <div className="text-center text-muted-foreground">
          <h2 className="text-2xl font-semibold">Select a note</h2>
          <p>Or create a new one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      <div className="p-4 border-b border-border">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="w-full text-2xl font-bold bg-transparent outline-none text-foreground placeholder-muted-foreground"
        />
      </div>
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="w-full h-full text-lg bg-transparent outline-none resize-none text-foreground placeholder-muted-foreground"
        />
      </div>
    </div>
  );
};

export default Editor;

import React from 'react';
import Note from './Note';

interface NoteListProps {
  notes: {
    id: string;
    title: string;
    message: string;
  }[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newMessage: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onUpdate }) => {
  return (
    <div>
      <h2>Notes</h2>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default NoteList;
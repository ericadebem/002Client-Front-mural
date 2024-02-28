import React, { useState } from "react";

interface NoteProps {
  note: {
    id: string;
    title: string;
    message: string;
  };
  onDelete: (id: string) => void;
  onUpdate: (id: string, newMessage: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newMessage, setNewMessage] = useState(note.message);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(note.id, newMessage);
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <strong>{note.title}</strong>: {note.message}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Note;

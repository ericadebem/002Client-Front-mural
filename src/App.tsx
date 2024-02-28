import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [notes, setNotes] = useState<{
    id: string;
    title: string;
    message: string;
  }[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, message: string) => {
    const newNote = {
      id: uuidv4(),
      title,
      message,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const updateNote = (id: string, newMessage: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, message: newMessage } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1 className="app-title">React Mural</h1>
      <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
      <div className="note-input">
        <h2>Add a Note</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const title = form.elements.namedItem('title') as HTMLInputElement;
            const message = form.elements.namedItem('message') as HTMLInputElement;
            if (title && message) {
              addNote(title.value, message.value);
              form.reset();
            }
          }}
        >
          <label>Title:</label>
          <input type="text" name="title" className="input-field" required />
          <br />
          <label>Message:</label>
          <textarea name="message" className="input-field" required></textarea>
          <br />
          <button type="submit" className="submit-button">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default App;
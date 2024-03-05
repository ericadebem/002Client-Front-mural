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
      <h1 className="app-title">Angebot Mural</h1>
      <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
      <div className="note-input">
        <h2>Was möchten Sie anbieten?</h2>
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
          <label>Titel:</label>
          <input type="text" name="title" className="input-field" required />
          <br />
          <label>Angebot:</label>
          <textarea name="message" className="input-field" required></textarea>
          <br />
          <button type="submit" className="submit-button">Speichern</button>
        </form>
      </div>
    </div>
  );
};

export default App;
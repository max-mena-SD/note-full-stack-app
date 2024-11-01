import { useState } from "react";
import "./App.css";

const App = () => {
  type Note = {
    id: number;
    title: string;
    content: string;
  };
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Note Title 1", content: "Note Content 1" },
    { id: 2, title: "Note Title 2", content: "Note Content 2" },
    { id: 3, title: "Note Title 3", content: "Note Content 3" },
    { id: 4, title: "Note Title 4", content: "Note Content 4" },
  ]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) return;

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotes);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (noteId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedNotes = notes.filter( (note) => note.id !== noteId)
    setNotes(updatedNotes)
  }

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(
          event,
        ) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        >
        </textarea>

        {selectedNote
          ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={() => handleCancel()}>Cancel</button>
            </div>
          )
          : <button type="submit">Add note</button>}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            className="note-item"
            onClick={() => handleClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) => deleteNote(note.id, event) } >x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

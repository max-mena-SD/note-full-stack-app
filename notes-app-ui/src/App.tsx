import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  type Note = {
    id: number;
    title: string;
    content: string;
  };
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
      );
      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (noteId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "DELETE",
      });

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

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
              <button onClick={(event) => deleteNote(note.id, event)}>x</button>
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

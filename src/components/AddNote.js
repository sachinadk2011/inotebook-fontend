import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alerts/AlertContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const alertContext = useContext(AlertContext);
  const { displayAlert, clearAlert } = alertContext;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const addingNotes = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    displayAlert("success", "Note added successfully");

    setNote({ title: "", description: "", tag: "" });
  };
  const ochange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const HandleClear = (e) => {
    e.preventDefault();
    setNote({ title: "", description: "", tag: "" });
    displayAlert("success", "Detail of notes has been cleared successfully");
  };
  // Use effect to handle password validation and alert
  useEffect(() => {
    if (
      note.description.length > 0 &&
      note.description.length < 5 &&
      note.title.length > 0 &&
      note.title.length < 5
    ) {
      displayAlert(
        "info",
        "Description and Title must be at least 5 characters."
      );
    } else if (note.description.length > 0 && note.description.length < 5) {
      displayAlert("info", "Description must be at least 5 characters.");
    } else if (note.title.length > 0 && note.title.length < 5) {
      displayAlert("info", "Title must be at least 5 characters.");
    } else  {
      clearAlert();
    } 
  }, [note.description, note.title, displayAlert, clearAlert]);
  return (
    <div>
      <h2 className="container my-3">Add Note </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={ochange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={ochange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={ochange}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={addingNotes}
        >
          {" "}
          Add
        </button>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="clear"
          className="btn btn-primary mx-3"
          onClick={HandleClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
}

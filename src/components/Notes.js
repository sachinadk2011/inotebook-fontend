import React, { useContext, useEffect, useRef, useState } from "react";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id : " ", title: "", description:"", tag:"default" })
  const navigate  = useNavigate();
  
 
  const ochange =(e) =>{
    setNote({...note, [e.target.name]:e.target.value });
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
  }else{
    navigate('/login.js')
  }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
       tag: currentNote.tag
      });
  };

  const handleUpdate = ()=>{
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    props.displayAlert("success","Note updated successfully" )
  }

  return (
    <>
      <AddNote displayAlert={props.displayAlert} />
      {/* Button trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
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

                
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.title.length<5 || note.description.length<=5} type="button" className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Yours Notes</h2>
        <div className="mx-2">

        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem key={note._id} displayAlert={props.displayAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

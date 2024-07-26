import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote() {
    const context = useContext(NoteContext)
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description:"", tag:"default" })

  const addingNotes = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  const ochange =(e) =>{
    setNote({...note, [e.target.name]:e.target.value });
  }
  return (
    <div>
    <h2>Add Note </h2>
    <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title" onChange={ochange} minLength={5} required />
  
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name="description" onChange={ochange} minLength={5} required />
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name="tag" onChange={ochange} />
</div>

<button disabled={note.title.length<5 || note.description.length<=5} type="submit" className="btn btn-primary" onClick={addingNotes}> Add</button>
</form>
</div>
  )
}

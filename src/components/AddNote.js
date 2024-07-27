import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote(props) {
    const context = useContext(NoteContext)
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description:"", tag:"" })

  const addingNotes = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.displayAlert("success","Note added successfully" )
    setNote({title: "", description:"", tag:"" });
  }
  const ochange =(e) =>{
    setNote({...note, [e.target.name]:e.target.value });
  }
  return (
    <div>
    <h2 className="container my-3">Add Note </h2>
    <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={ochange} minLength={5} required />
  
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={ochange} minLength={5} required />
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={ochange} />
</div>

<button disabled={note.title.length<5 || note.description.length<=5} type="submit" className="btn btn-primary" onClick={addingNotes}> Add</button>
</form>
</div>
  )
}

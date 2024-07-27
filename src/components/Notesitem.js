import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertContext from '../context/alerts/AlertContext'


function Notesitem(props) {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const alertContext = useContext(AlertContext)
  const {displayAlert} = alertContext;
    const {note, updateNote} = props;
   

  return (
    <div className='col-md-3 '>
     

    <div className="card my-3">
  
  <div className="card-body">
    <div className='d-flex align-items-center'>

    <h5 className="card-title">{note.title} </h5>
    <i className="fa-solid fa-trash-can mx-2" onClick={async() => {await deleteNote(note._id);  displayAlert("success","Note deleted successfully" )}} ></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
    {/* <i className="fa-solid fa-expand mx-2"></i> */}
    </div>
    <p className="card-text">{note.description} </p>
  </div>
</div>
    </div>
  )
}

export default Notesitem
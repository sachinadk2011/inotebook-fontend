
import React, {useEffect} from "react";
import AlertState from '../alerts/AlertState';
import NoteContext from './NoteContext'
import { useState } from 'react'
import AuthState from "../authentication/AuthState";


export const NoteState = (props) => {
  
  const host = process.env.REACT_APP_URL;
    const noteIntialize = []
    const [notes, setNotes] = useState(noteIntialize);
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : { flow: "", email: "", name: " " }; // Initialize with localStorage data if available
    });
    useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }, [user]);  // Run when `user` state changes
        





//gets all notes
const getNotes = async ()=>{
   try {// API call 
  const response = await fetch(`${host}/api/notes/fetchallnote`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  });
  const allNotes =await response.json();
  
  setNotes(allNotes);
  }catch (error) {
    console.error('Error:', error.message);
    // Handle the error appropriately in your UI
  }
}
//add notes
const addNote = async (title, description, tag)=>{
  // API call 
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    body: JSON.stringify({title, description, tag}),
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  });
  const note = await response.json();
 
 
  setNotes(notes.concat(note))
}

//delete notes
const deleteNote = async (id)=>{
   try { // API call 
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  await response.json();
  
  const newNote = await notes.filter((note)=>{return note._id!==id}) 
  setNotes(newNote);
}catch (error) {
  console.error('Error:', error.message);
  // Handle the error appropriately in your UI
}
}



//edit notes
const editNote = async (id, title, description, tag)=>{
    try {// API call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    body: JSON.stringify({title, description, tag}),
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  });
  if (!response.ok) {
    const errorText = await response.text(); // Log the response text for debugging
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText} `);
  }

 await response.json();
 

  let newNotes = JSON.parse(JSON.stringify(notes))

  //logicc to connect cclient
  for(let index= 0; index< newNotes.length; index++){
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      setNotes(newNotes);
      break;
    }
  }}catch (error) {
    console.error('Error:', error.message);
    // Handle the error appropriately in your UI
  }
}
  return (
    <AuthState >
    <AlertState>

    <NoteContext.Provider value={{notes, user, setUser,addNote, deleteNote,editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    </AlertState>
    </AuthState>
   
  )
}


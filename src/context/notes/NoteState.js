//using context and setting  state to use everywhere

import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)




  //While writing differnt functions we first do it with backend using API call and then we do it in frontend using react





  

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTU0ZWQwZDM3YWNjZWU3ODQ1YTU1In0sImlhdCI6MTY1ODQ3OTY3Mn0.ZMAvhQLJWw5U0G7VHw93oILoF02h-ZIuGbzof50MclQ"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTU0ZWQwZDM3YWNjZWU3ODQ1YTU1In0sImlhdCI6MTY1ODQ3OTY3Mn0.ZMAvhQLJWw5U0G7VHw93oILoF02h-ZIuGbzof50MclQ"
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note =await response.json();
    // console.log(json);
    setNotes(notes.concat(note))
  }
  
  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTU0ZWQwZDM3YWNjZWU3ODQ1YTU1In0sImlhdCI6MTY1ODQ3OTY3Mn0.ZMAvhQLJWw5U0G7VHw93oILoF02h-ZIuGbzof50MclQ"
      },
    });
    
    
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  
  
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTU0ZWQwZDM3YWNjZWU3ODQ1YTU1In0sImlhdCI6MTY1ODQ3OTY3Mn0.ZMAvhQLJWw5U0G7VHw93oILoF02h-ZIuGbzof50MclQ"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    
    // Logic to edit in client
    let newNotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
    }
    setNotes(newNotes);
  }

  // const json =await response.json();
  // console.log(json);
  
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
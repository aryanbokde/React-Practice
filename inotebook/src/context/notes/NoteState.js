import { useState } from "react";
import NoteContent from "./noteContext";


const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    //Get all Notes
    const getNotes = async () => {
        //Todo Api calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
            
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNote = async (title, desc, tag) => {
        //Todo Api calls
        const response = await fetch(`${host}/api/notes/addnote`, {            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag }) 
        });

        const note = await response.json();
        setNotes(notes.concat(note));
        
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //Todo Api calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {            
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();  
        console.log(json);      
        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote);
    }
    
    //Edit a Note
    const editNote = async (id, title, desc, tag) => {
        //Todo Api calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, desc, tag}) 
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].desc = desc;
                newNotes[index].tag = tag;
                break;   
            }                     
        }
        setNotes(newNotes);
    }

    return (
        <NoteContent.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContent.Provider>
    )

}

export default NoteState;
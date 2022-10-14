import React, { useContext } from 'react';
import noteContent from "../context/notes/noteContext";

const Noteitem = (props) => {
  const {deleteNote} = useContext(noteContent);
  const {note, updateNote} = props;
  return (          
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
            <p className="card-text">{note.desc}</p>    
            <span className='hcursor' onClick={() => {updateNote(note)}}>Edit</span> 
            {/* Onclick run a function to send note id. */}
            <span className='hcursor' onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "success")}}>Delete</span>
        </div>
    </div>  
  )
}

export default Noteitem

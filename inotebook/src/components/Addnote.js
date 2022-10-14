import React, { useContext, useState } from 'react';
import noteContent from "../context/notes/noteContext";

const Addnote = (props) => {
    const data = useContext(noteContent);
    const {addNote} = data;

    const [note, setNote] = useState({title:"", desc:"", tag:""});

    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.desc, note.tag);
      props.showAlert("Note added successfully", "success");
      setNote({title:"", desc:"", tag:""});
    }

    const onChnage = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div className='container'>
      <h2>Add a Note</h2>   
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title"  name="title" value={note.title} onChange={onChnage} minLength={5} required/>          
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="desc"  name="desc" value={note.desc} onChange={onChnage} minLength={5} required/>          
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChnage} minLength={5} required/>          
        </div>
        <button disabled={note.title.length<5 || note.desc.length<5 || note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default Addnote

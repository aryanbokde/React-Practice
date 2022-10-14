import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContent from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
    let navigate = useNavigate();
    const data = useContext(noteContent);    
    const { notes, getNotes, editNote} = data;
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        }else{
            navigate("/login");
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id:"", etitle:"", edesc:"", etag:""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id:currentNote._id, etitle:currentNote.title, edesc:currentNote.desc, etag:currentNote.tag });          
    };

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edesc, note.etag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");   
    }

    const onChnage = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> Edit Note </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle"  name="etitle" value={note.etitle} onChange={onChnage} data={note.id} minLength={5} required/>          
                        </div>
                        <div className="mb-3">
                        <label htmlFor="edesc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edesc"  name="edesc" value={note.edesc} onChange={onChnage} minLength={5} required/>          
                        </div>
                        <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag"  name="etag" value={note.etag} onChange={onChnage} minLength={5} required/>          
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<5 || note.edesc.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>
            <div className="container" style={{ paddingTop: "50px" }}>
                <h4>Yours Notes</h4>
                <div className="row">
                    <div className="container">
                    {notes.length === 0 && "No notes to display"}
                    </div>
                    {notes.map((note) => {
                        return (
                        <div key={note._id} className={`col-lg-3 my-3 ${note._id}`}>
                            <Noteitem note={note} updateNote={updateNote} showAlert={props.showAlert}/>
                        </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;

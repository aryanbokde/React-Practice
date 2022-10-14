const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../modules/Note.js");
const { body, validationResult } = require("express-validator");


//ROUTE 01 : Get all the Notes Using GET "/api/notes/fetchallnotes". login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        // console.log({notes})
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
  
});


//ROUTE 02 : Add A new Note Using POST "/api/notes/addnote". login required.
router.post("/addnote",[
    body("title", "Enter a title..!").isLength({ min: 3 }),
    body("desc", "Enter description..!").isLength({ min: 5 }),
    body("tag", "Please enter tag..!").isLength({ min: 2 }),
    ], fetchuser, async (req, res) => {

        try {

            const { title, desc, tag } = req.body;    
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }        
            const note = new Note({
                title, desc, tag, user:req.user.id
            });        
            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {

            console.log(error.message);
            res.status(500).send("Internal server error");

        }

});


//ROUTE 03 : Update and Existing Note Using PUT "/api/notes/updatenote/:id". login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, desc, tag } = req.body;
    try {        
        //Create a new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (desc) { newNote.desc = desc }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id ) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set:newNote }, { new: true});
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

});


//ROUTE 04 : Delete Note Using Delete "/api/notes/deletenote". login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
 
    try {
        // Find the note to be deleted and deleted it.
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id ) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note:note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

});

module.exports = router;

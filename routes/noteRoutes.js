const express= require("express");
const router = express.Router();
const Note = require("../models/note-model");
const authMiddleware = require("../middleware/authMiddleware");

//apply middleware
router.use(authMiddleware);

//create note
router.post("/create", async function(req, res){
    const {title, content} = req.body;

   const note = await Note.create({
    title,
    content,
    user: req.user.id   
});
    res.send(note);
});

//get all notes
router.get("/", async (req,res) => {
    const notes = await Note.find({ user : req.user.id});
    res.send(notes);
    });


//Update Notes
router.put("/update/:id", async (req,res) => {
    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new : true}
    );
    res.send(note);
});


//Delete note
router.delete("/delete/:id", async (req, res) => {
    await Note.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    res.send("Note deleted successfully");
});

module.exports = router; 
const express = require("express");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();
const Note = require("./../models/Note.schema");

noteRouter.get("/add", auth.ensureAuth, (req, res) => {
    res.render("note/add");
});
noteRouter.post("/add", auth.ensureAuth, async (req, res) => {
    const note = req.body;
    note.user = req.user._id;
    try {
        await Note.create(note);
        res.redirect("/dashboard");
    } catch (error) {
        console.log(`error saving data in DB ${error}`);
    }
});
noteRouter.delete("/delete/:id", auth.ensureAuth, async (req, res) => {
    try {
        await Note.remove({ _id: req.params.id });
        res.redirect("/dashboard");
    } catch (error) {
        console.log(`error saving data in DB ${error}`);
    }
});
noteRouter.get("/edit/:id", auth.ensureAuth, async (req, res) => {
    try {
        const noteData = await Note.find({ _id: req.params.id }).lean();
        res.render("note/edit", { noteData: noteData });
    } catch (error) {
        console.log(`error saving data in DB ${error}`);
    }
});
noteRouter.put("/edit/:id", auth.ensureAuth, async (req, res) => {
    try {
        await Note.updateOne(
            { _id: req.params.id },
            {
                title: req.body.title,
                body: req.body.body,
            }
        );
        res.redirect("/dashboard");
    } catch (error) {
        console.log(`error saving data in DB ${error}`);
    }
});

module.exports = noteRouter;

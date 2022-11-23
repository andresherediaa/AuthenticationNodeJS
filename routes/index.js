const express = require("express");
const router = express.Router();
const auth = require("./../middlewares/auth");
const Note = require("./../models/Note.schema");

router.get("/", auth.ensureGuest, (req, res) => {
    return res.render("login", {
        layout: "login",
    });
});
router.get("/dashboard", auth.ensureAuth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }, { __v: 0 }).lean();
        return res.render("dashboard", {
            layout: "main",
            name: req.user.displayName,
            notes: notes,
        });
    } catch (error) {
        console.log(`*error getting saved notes`);
    }
});

module.exports = router;

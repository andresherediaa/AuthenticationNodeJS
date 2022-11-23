const express = require("express");

const router = require("./index");
const authRouter = require("./authRouter");
const noteRouter = require("./notesRouter");

const api = express.Router();

api.use("/", router);
api.use("/auth", authRouter);
api.use("/note", noteRouter);

module.exports = api;

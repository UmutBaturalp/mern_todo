const express = require("express");
const router = express.Router();
const NoteModel = require("../models/noteModel");
const authControl = require("../middlewares/authControl");
const {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNote,
  patchNote,
} = require("../controller/noteController");

router.use(authControl);

// GET
router.get("/", getAllNotes);

// GET by id
router.get("/:id", getNoteById);

// POST
router.post("/", createNote);

// DELETE
router.delete("/:id", deleteNote);

// PATCH
router.patch("/:id", patchNote);

module.exports = router;

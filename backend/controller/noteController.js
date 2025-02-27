const NoteModel = require("../models/noteModel");
const mongoose = require("mongoose");
const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await NoteModel.create({ 
      title, 
      description,
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNotes = async (req, res) => {
  const notes = await NoteModel.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id not valid" });
  }

  const note = await NoteModel.findOne({
    _id: id,
    user: req.user._id
  });

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.status(200).json(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id not valid" });
  }
  
  const note = await NoteModel.findOneAndDelete({ 
    _id: id,
    user: req.user._id
  });
  
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.status(200).json(note);
};

const patchNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id not valid" });
  }
  
  const note = await NoteModel.findOneAndUpdate(
    { 
      _id: id,
      user: req.user._id
    },
    { ...req.body },
    { new: true }
  );
  
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.status(200).json(note);
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNote,
  patchNote,
};

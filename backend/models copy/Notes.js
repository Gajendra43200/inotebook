const mongoose = require('mongoose');
const NotesSchema = new Schema({
   title: {
    type: String,
    require: true
   },
   discription: {
    type: String,
    unique: true
   },
   EventTarget: {
    type: String,
    default: "general"
   },
   date: {
    type: Date,
    default: Date.new
   }
  });
  module.exports = mongoose.model("notes", NotesSchema )
const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true},
  createdAt: { type: Date },
},);

module.exports = mongoose.model("Habit", HabitSchema);

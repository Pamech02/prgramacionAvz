const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  days: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Habit", HabitSchema);

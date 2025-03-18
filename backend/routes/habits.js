const express = require("express");
const Habit = require("../models/Habit");

const router = express.Router();

router.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo habitos" });
  }
});

router.post("/habits", async (req, res) => {
  try {
    const {title, description} = req.body;
    const habit = new Habit({title, description})
    await habit.save();
    res.json(habit);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error posteando habitos" });
  }
});

router.delete("/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id)
    res.json({message:'Habit borrado'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error borrando habitos" });
  }
});

module.exports = router;

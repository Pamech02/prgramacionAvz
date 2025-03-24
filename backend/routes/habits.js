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

router.patch("/habits/markasdone/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
    const now = new Date()
    const lastUpdated = new Date(habit.updatedAt);
    const difference = timeDifferenceinHours(now, lastUpdated)
    if (difference < 24){
      habit.days = habit.days + 1
      await habit.save()
      return res.status(200).json({ message: "Habito actualizado" });
    }else{
      habit.days = 1
      await habit.save()
      return res.status(200).json({ message: "Habito reiniciado" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error editando habito" });
  }
});

const timeDifferenceinHours = (date1, date2)=>{
  const diferenceMs = Math.abs(date1 - date2);
  return (diferenceMs/(1000 * 60 * 60)).toFixed(2)
}

module.exports = router;

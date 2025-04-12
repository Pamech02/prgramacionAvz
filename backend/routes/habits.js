const express = require("express");
const Habit = require("../models/Habit");
const jwt = require("jsonwebtoken");
const moongose = require("mongoose")

const router = express.Router();

const checkToken = (req, res, next)=>{
  const token = req.header('Authorization')
  if(!token) return res.status(401).json({message:'Acceso denegado'})
    try {
      const formattedToken = token.replace('Bearer ', '');
      const verified = jwt.verify(formattedToken, process.env.JWT_SECRET);
      req.user = verified;
      console.log('middleware',req.user)
      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: 'Acceso denegado' });
    }
}

router.get("/habits", checkToken, async (req, res) => {
  try {
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({message:'Error obteniendo habitos'})
    const habits = await Habit.find({'userId': new moongose.Types.ObjectId(userId)});
    res.json(habits);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error obteniendo habitos" });
  }
});

router.post("/habits", checkToken, async (req, res) => {
  try {
    const {title, description} = req.body;
    const userId = req.user.userId; 
    const habit = new Habit({ title, description, userId });
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

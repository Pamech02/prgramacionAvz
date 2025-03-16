const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/altas", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
});

router.get("/bajas", (req, res) => {
  console.log("Altas y bajas");
  res.json({ message: "Ruta /bajas funcionando correctamente" });
});

router.get("/cambio-habitos", (req, res) => {
  console.log("Cambios y hábitos");
  res.json({ message: "Ruta /cambio-habitos funcionando correctamente" });
});

module.exports = router;

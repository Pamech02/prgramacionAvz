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

router.get("/bajas", async (req, res) => {
    console.log('Altas y bajas')

  });

  router.get("/cambio-habitos", async (req, res) => {
   console.log('Cambios y habitos')
  });

// router.post("/", async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error creando usuario" });
//   }
// });

module.exports = router;

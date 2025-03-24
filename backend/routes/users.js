const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs")

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({username, password:hashedPassword})
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creando usuario" });
  }
});

module.exports = router;

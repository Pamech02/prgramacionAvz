const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

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
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear y guardar el nuevo usuario
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // (Opcional) Establecer la cookie
    res.cookie("habitToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    // Enviar el token en la respuesta
    res.status(201).json({ message: "Usuario creado exitosamente", token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creando usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({error:'Usuario no encontrado'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({error:'Credenciales incorrectas'});

    //generamos el token
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
    res.cookie('habitToken', token, {
      httpOnly:false,
      secure:process.env.NODE_ENV === 'production',
      sameSite:'Strict',
      maxAge:7*24*60*60*1000
    })
    res.json({message:'Inicio de sesion exitoso', token})
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error en el login" });
  }
});

module.exports = router;

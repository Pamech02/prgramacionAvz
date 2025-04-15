const express = require("express");
const connectDB = require("./db");
const habitRoutes = require("./routes/habits");
const userRoutes = require("./routes/users");

const cors = require("cors");

require("dotenv").config();

const server = express();

server.use(cors());

server.use(express.json());
connectDB();

server.get('/', (req,res)=>{
  res.send("Programacion Avanzada")
})

server.use("/api", habitRoutes);
server.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

module.exports = server;
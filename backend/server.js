const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/habits");

require("dotenv").config();

const server = express();

server.use(express.json());
connectDB();

server.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

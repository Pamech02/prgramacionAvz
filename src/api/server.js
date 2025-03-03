const express = require("express");
const next = require("next");
const connectDB = require("./db");
const userRoutes = require("./routes/users");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json()); 
  connectDB(); 

  server.use("/api/users", userRoutes);

  // Manejar todas las rutas 
  server.all("*", (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
});

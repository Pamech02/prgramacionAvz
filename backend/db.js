const mongoose = require("mongoose");
require('dotenv').config();
const MONGO = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

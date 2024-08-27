const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes"); // Importar el index.js desde la carpeta routes
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Usar las rutas importadas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

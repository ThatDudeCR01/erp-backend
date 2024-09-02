const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Usar las rutas importadas
app.use(routes);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

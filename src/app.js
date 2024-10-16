const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
const auth = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();

const app = express();
// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

connectDB();

app.route("/").get((req, res) => {
  res.send("API running");
});

app.use(routes);
app.use(cors(corsOptions));

// const PORT = process.env.PORT;
const PORT = process.env.NODE_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

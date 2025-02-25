const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/userRoutes");
const cors = require("cors")

const App = express();

const PORT = 8080;

// middleware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors())

// db connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/curd",
  console.log("db successfully connected")
);

// routes
App.use("/api/v1", usersRoutes);

App.listen(PORT, () => console.log(`server is running on port ${PORT}`));

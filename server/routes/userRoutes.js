const express = require("express");
const {
  createUserController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
  SearchAndPaginationController,
} = require("../controllers/userController");
const expressFormidable = require("express-formidable");

const usersRoutes = express.Router();

usersRoutes.post("/", expressFormidable(), createUserController);

usersRoutes.get("/", SearchAndPaginationController);

usersRoutes.get("/:id", getSingleUserController);

usersRoutes.put("/:id", expressFormidable(), updateUserController);

usersRoutes.delete("/:id", deleteUserController);

// search and pagination

module.exports = usersRoutes;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;

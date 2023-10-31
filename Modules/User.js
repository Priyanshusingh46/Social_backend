const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  roll: {
    type: Number,
    unique: true,
  },
  name: String,
  password: String,
  profilpic: String,
  isValid: Boolean,
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { name: String, image: String },
  { strict: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;

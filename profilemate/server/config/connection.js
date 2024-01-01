const mongoose = require("mongoose");
function connectDB() {
  mongoose.connect("mongodb://127.0.0.1:27017/userprofile").then(() => {
    console.log("MongoDB connected");
  });
}

module.exports = connectDB;

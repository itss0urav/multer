const express = require("express");
const connectDB = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use("/api/user", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running On PORT:${PORT}`);
});

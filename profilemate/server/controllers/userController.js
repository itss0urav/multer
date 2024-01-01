const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/files", { recursive: true }, (err) => {
      if (err) throw err;
    });

    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadUser = upload.single("photo");

exports.createUser = (req, res) => {
  const { name } = req.body;
  const image = req.file.filename;

  const user = new User({ name, image });
  user
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

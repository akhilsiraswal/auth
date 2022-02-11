const User = require("../models/user");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.find({ email }).then((usr, err) => {
    if (err || usr.length === 0) {
      return res.status(404).json({
        error: err || "User Not found",
      });
    }
    bcrypt.compare(password, usr[0].encryptedPassword, (err, hash) => {
      if (err || !hash) {
        return res.status(500).json({
          error: err || "hash not found",
        });
      }

      const token = jwt.sign({ data: usr[0]._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token);

      return res.status(200).json({
        token,
        user: usr,
      });
    });
  });

  const user = new User(req.body);
};
exports.signup = (req, res) => {
  console.log("inside signup");
  console.log(req.body);
  const { username, email, password } = req.body;
  User.find({ email: email }).then((usr, err) => {
    if (err || usr.length !== 0) {
      return res.status(404).json({
        error: err || "User already registered",
      });
    }
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      if (err) {
        return res.json({
          error: err || "Encryption error",
        });
      }
      const user = new User({ username, email, encryptedPassword });
      user.save().then((user, err) => {
        if (err || !user) {
          return res.status(500).json({
            error: "User not created",
          });
        }
        res.status(200).json({
          message: "User Created",
        });
      });
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout successful",
  });
};

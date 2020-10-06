const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("./auth-model");
const { isUserValid, isLoginValid, generateToken } = require("./auth-service");
const configVars = require("../config/vars");

// Register a new user
router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isUserValid(credentials)) {
    // hash it up
    const hash = bcryptjs.hashSync(credentials.password, configVars.rounds);
    credentials.password = hash;

    // save user to db
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ message: "Success" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide all the proper credentials. Be sure they are alphanumeric.",
    });
  }
});

// Login as a user

// Login as a director

// Login as an administrator ??? Is this one really necessary or could the code be in the web app?

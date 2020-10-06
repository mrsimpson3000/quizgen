const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("./auth-model");
const { isUserValid, isLoginValid, generateToken } = require("./auth-service");
const configVars = require("../config/vars");
const Questions = require("../questions/questions-model");

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

// Login as a user. Use role in browser to show certain fields.
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isLoginValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        // compare the password to the hash stored in the db
        if (user && bcryptjs.compareSync(password, user.password)) {
          // produce (sign) and send the token
          const token = generateToken(user);

          res.status(200).json({
            message: "Successful login.",
            token,
            userId: user.id,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials " });
        }
      })
      .catch((err) => {
        res.status({ message: err.message });
      });
  } else {
    status(400).json({
      message:
        "Please provide all the proper credentials. Be sure that they are alphanumeric.",
    });
  }
});

// Get published questions only
router.get("/questions", (req, res) => {
  Questions.findBy(req.body)
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;

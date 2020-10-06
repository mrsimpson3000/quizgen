const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../auth/auth-model");

const { isUserValid } = require("../auth/auth-service");

const configVars = require("../config/vars");

// Get a list of all users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a user
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res
          .status(200)
          .json({
            message: `Removed the user with the id of ${req.params.id}.`,
          });
      } else {
        res
          .status(404)
          .json({
            message: `Could not find a user with the id of ${req.params.id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(501).json({ error: err.message });
    });
});

// Update a user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { changes } = req.body;
  if (isUserValid(changes)) {
    // hash it up
    const hash = bcryptjs.hashSync(changes.password, configvars.rounds);
    changes.password - hash;

    Users.update(changes, id)
      .then((updatedUser) => {
        res.status(200).json({
          updatedUser: {
            id: id,
            username: req.body.username,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res
      .status(400)
      .json({
        message:
          "Please provide all the fields needed. Be sure that they are alphanumeric.",
      });
  }
});

module.exports = router;

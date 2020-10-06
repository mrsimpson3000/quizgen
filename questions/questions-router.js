const router = require("express").Router();

const Questions = require("./questions-model");

// GET all questions (published and unpublished)
router.get("/", (req, res) => {
  Questions.find()
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/questions", (req, res) => {
  Questions.findBy(req.body)
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

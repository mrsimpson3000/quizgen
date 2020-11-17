'use strict';
const router = require("express").Router();

const Questions = require("./questions-model");

const { convertExcel } = require("./questions-service")

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

// GET questions based on params sent
router.get("/questions", (req, res) => {
  Questions.findBy(req.body)
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// DELETE all questions
router.delete("/", (req, res) => {
  Questions.removeAll()
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: `Successfully deleted all questions.`})
      } else {
        res.status(404).json({ message: `Could not find any questions to delete.`})
      }
    })
})

// GET the total number of questions
router.get("/count", (req, res) => {
  Questions.count()
    .then((count) => {
      res.status(200).json({ message: count})
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

// POST all the questions to the database
router.post("/", (req, res) => {
    const data = convertExcel(req.body.filepath)
      Questions.addQuestions(data)
      .then((data) => {
        // console.log(data)
        res.status(200).json({ message: `There are now ${data.rowCount} questions in the database.` })
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
})

// PUT a question update in the database
router.put("/:id", (req, res) => {
  const { id } = req.params
  const changes = req.body

  Questions.update(changes, id)
    .then((updatedQuestion) => {
      res.status(200).json(updatedQuestion)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router;

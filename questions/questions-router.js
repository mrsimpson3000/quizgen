'use strict';
const router = require("express").Router();

const Questions = require("./questions-model");

const excelToJson = require('convert-excel-to-json')

const filepath = 'C:/Users/mrsim/Google Drive/MT Questions/MC Matthew (BSB) rev2 Chad.xlsx'


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

router.get("/questions/count", (req, res) => {
  Questions.count()
    .then((count) => {
      res.status(200).json({ message: count})
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

router.post("/", (req, res) => {
  const result = excelToJson({
    sourceFile: filepath,
    header: {
      rows: 1
    },
    sheets: ['Sheet1'],
    columnToKey: {
      // A: 'id',
      B: 'book',
      C: 'chapter',
      D: 'verse',
      E: 'series',
      F: 'type',
      G: 'question',
      H: 'answer'
    }
  }) 
    // res.status(200).json(result.Sheet1)
    Questions.addQuestions(result.Sheet1)
    .then((result) => {
      res.status(200).json({ message: `Successfully added the questions.`})
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})  



module.exports = router;

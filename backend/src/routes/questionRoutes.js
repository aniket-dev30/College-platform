const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions,
  addAnswer
} = require("../controllers/questionController");

router.get("/", getQuestions);
router.post("/", addQuestion);
router.post("/:id/answer", addAnswer);

module.exports = router;
let questions = require("../data/questions");

// Add question
exports.addQuestion = (req, res) => {
  const { text } = req.body;

  const newQ = {
    id: Date.now(),
    text,
    answers: []
  };

  questions.push(newQ);
  res.json(newQ);
};

// Get all questions
exports.getQuestions = (req, res) => {
  res.json(questions);
};

// Add answer
exports.addAnswer = (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  const q = questions.find(q => q.id == id);
  if (!q) return res.status(404).json({ message: "Not found" });

  q.answers.push(answer);
  res.json(q);
};
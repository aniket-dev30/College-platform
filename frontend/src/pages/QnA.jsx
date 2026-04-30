import { useEffect, useState } from "react";
import axios from "axios";

function QnA() {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  const fetchQuestions = () => {
    axios.get("http://localhost:5000/api/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error("GET ERROR:", err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const addQuestion = () => {
    if (!text.trim()) return;

    axios.post("http://localhost:5000/api/questions", { text })
      .then(() => {
        setText("");
        fetchQuestions();
      })
      .catch(err => console.error("POST ERROR:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Q&A Section</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question"
        />
        <button onClick={addQuestion} className="bg-black text-white px-4">
          Ask
        </button>
      </div>

      {questions.length === 0 && <p>No questions yet</p>}

      {questions.map(q => (
        <div key={q.id} className="mb-4 border p-3 rounded">
          <p className="font-semibold">{q.text}</p>

          <button
            onClick={() => {
              const ans = prompt("Enter answer");
              if (ans) {
                axios.post(`https://college-platform-4xz6.onrender.com/api/questions/${q.id}/answer`, { answer: ans })
                  .then(fetchQuestions)
                  .catch(err => console.error("ANSWER ERROR:", err));
              }
            }}
            className="text-blue-500 mt-2"
          >
            Answer
          </button>

          <div className="ml-4 mt-2">
            {q.answers && q.answers.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QnA;
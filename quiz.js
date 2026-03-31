import { useState } from "react";

export default function Quiz({ level, onFinish }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const question = level.questions[index];

  function handleAnswer(option) {
    if (option === question.answer) {
      setFeedback({
        type: "correct",
        message: "✅ Correct!"
      });
    } else {
      setFeedback({
        type: "wrong",
        message: `❌ Wrong! ${question.explanation}`
      });
    }
  }

  function nextQuestion() {
    setFeedback(null);

    if (index < level.questions.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  }

  return (
    <div className="quiz-container">
      <h2>{level.title}</h2>
      <p className="question">{question.question}</p>

      <div className="options">
        {question.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`popup ${feedback.type}`}>
          <p>{feedback.message}</p>
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

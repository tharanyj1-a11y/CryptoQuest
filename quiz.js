import { useState, useEffect } from "react";

export default function Quiz({ level, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const [timeLeft, setTimeLeft] = useState(10);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  // 🎲 Shuffle questions on start
  useEffect(() => {
    const shuffled = [...level.questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [level]);

  // ⏱️ Timer logic
  useEffect(() => {
    if (!questions.length || feedback) return;

    if (timeLeft === 0) {
      handleWrong("⏰ Time’s up!");
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, questions, feedback]);

  if (!questions.length) return <p>Loading...</p>;

  const question = questions[index];

  // ✅ ANSWER HANDLER
  function handleAnswer(option) {
    if (feedback) return; // prevent double click

    if (option === question.answer) {
      handleCorrect();
    } else {
      handleWrong(`❌ ${question.explanation}`);
    }
  }

  function handleCorrect() {
    const gainedXP = 10 + streak * 2;

    setXp((prev) => prev + gainedXP);
    setStreak((prev) => prev + 1);

    setFeedback({
      type: "correct",
      message: `✅ Correct! +${gainedXP} XP`
    });
  }

  function handleWrong(message) {
    setLives((prev) => prev - 1);
    setStreak(0);

    setFeedback({
      type: "wrong",
      message
    });
  }

  // ✅ NEXT BUTTON HANDLER (THIS IS THE FIX)
  function nextQuestion() {
    setFeedback(null);
    setTimeLeft(10);

    // ❌ Game Over condition
    if (lives - (feedback?.type === "wrong" ? 1 : 0) <= 0) {
      alert("Game Over!");
      onFinish(); // ✅ RETURN TO DASHBOARD
      return;
    }

    // ✅ Move to next question
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      // ✅ LEVEL COMPLETE (THIS WAS YOUR MISSING PIECE)
      alert("Level Complete!");
      onFinish(); // ✅ THIS IS CRITICAL
    }
  }

  return (
    <div className="quiz-container">
      <h2>{level.title}</h2>

      {/* HUD */}
      <div className="hud">
        <p>⏱️ {timeLeft}s</p>
        <p>❤️ {lives}</p>
        <p>🔥 {streak}</p>
        <p>⭐ XP: {xp}</p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(index / questions.length) * 100}%` }}
        />
      </div>

      <p className="question">{question.question}</p>

      <div className="options">
        {question.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div className={`popup ${feedback.type}`}>
          <p>{feedback.message}</p>
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

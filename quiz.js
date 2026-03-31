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

  // ⏱️ Timer
  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft === 0) {
      handleWrong("⏰ Time’s up!");
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, questions]);

  if (!questions.length) return <p>Loading...</p>;

  const question = questions[index];

  function handleAnswer(option) {
    if (feedback) return;

    if (option === question.answer) {
      handleCorrect();
    } else {
      handleWrong(`❌ ${question.explanation}`);
    }
  }

  function handleCorrect() {
    const gainedXP = 10 + streak * 2;

    setFeedback({
      type: "correct",
      message: `✅ Correct! +${gainedXP} XP`
    });

    setXp(xp + gainedXP);
    setStreak(streak + 1);
  }

  function handleWrong(message) {
    setFeedback({
      type: "wrong",
      message
    });

    setLives(lives - 1);
    setStreak(0);
  }

  function nextQuestion() {
    if (lives <= 0) {
      alert("Game Over!");
      onFinish();
      return;
    }

    setFeedback(null);
    setTimeLeft(10);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
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

      {/* Progress Bar */}
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

      {feedback && (
        <div className={`popup ${feedback.type}`}>
          <p>{feedback.message}</p>
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

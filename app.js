import { useState } from "react";
import { levels } from "./data/questions";
import Quiz from "./components/Quiz";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [progress, setProgress] = useState(1);
  const [coins, setCoins] = useState([]);

  // ✅ LOGIN SCREEN
  if (!user) {
    return (
      <div className="login">
        <h1>Crypto Quest</h1>
        <button
          onClick={() => {
            console.log("Login clicked");
            setUser("Player");
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // ✅ QUIZ SCREEN
  if (currentLevel) {
    return (
      <Quiz
        level={currentLevel}
        onFinish={() => {
          setCoins((prev) => [...prev, currentLevel.reward]);
          setProgress((prev) => prev + 1);
          setCurrentLevel(null);
        }}
      />
    );
  }

  // ✅ MAIN DASHBOARD
  return (
    <div className="container">
      <h1 className="title">Crypto Quest</h1>

      <div className="top-bar">
        <p>👤 {user}</p>
        <p>💰 Coins: {coins.length}</p>
        <p>
          📊 Progress: {progress}/{levels.length}
        </p>
      </div>

      <div className="grid">
        {levels.map((level) => {
          const unlocked = level.id <= progress;

          return (
            <div
              key={level.id}
              className={`card ${!unlocked ? "locked" : ""}`}
              onClick={() => {
                if (unlocked) {
                  setCurrentLevel(level);
                }
              }}
            >
              <h3>{level.title}</h3>
              <p>Reward: {level.reward}</p>

              <button disabled={!unlocked}>
                {unlocked ? "Start" : "Locked"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

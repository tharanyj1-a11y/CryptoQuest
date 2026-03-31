import { useState } from "react";
import { levels } from "./data/questions";
import Quiz from "./components/Quiz";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [progress, setProgress] = useState(1);
  const [coins, setCoins] = useState([]);

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="login">
        <h1>Crypto Quest</h1>
        <button onClick={() => setUser("Player")}>Login</button>
      </div>
    );
  }

  // QUIZ SCREEN
  if (currentLevel) {
    return (
      <Quiz
        level={currentLevel}
        onFinish={() => {
          setCoins([...coins, currentLevel.reward]);
          setProgress(progress + 1);
          setCurrentLevel(null);
        }}
      />
    );
  }

  // MAIN DASHBOARD
  return (
    <div className="container">
      <h1 className="title">Crypto Quest</h1>

      <div className="top-bar">
        <p>👤 {user}</p>
        <p>💰 Coins: {coins.length}</p>
        <p>📊 Progress: {progress}/{levels.length}</p>
      </div>

      <div className="grid">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`card ${level.id > progress ? "locked" : ""}`}
            onClick={() => level.id <= progress && setCurrentLevel(level)}
          >
            <h3>{level.title}</h3>
            <p>Reward: {level.reward}</p>
            <button disabled={level.id > progress}>
              {level.id <= progress ? "Start" : "Locked"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

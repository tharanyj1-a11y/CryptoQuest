// ==========================
// GLOBAL VARIABLES
// ==========================
let currentQuestion = 0;
let questions = [];
let answered = false;

// ==========================
// CRYPTO REWARDS
// ==========================
const rewards = [
  "Bitcoin 🪙",
  "Ethereum ⚡",
  "Litecoin 💡",
  "Cardano 🔷",
  "Solana 🚀",
  "Polkadot 🎯",
  "Chainlink 🔗",
  "Uniswap 🌀",
  "Monero 🕶️",
  "Tezos 🔺",
  "Avalanche ❄️",
  "Polygon 🔷"
];

// ==========================
// STORY DATA (SHORTENED HERE FOR SPACE)
// ==========================
const stories = {
  "1": {
    title: "The Beginning of Crypto",
    text: "You discover Bitcoin — a digital currency powered by blockchain. It is decentralized and uses wallets with private keys."
  },
  "2": {
    title: "Global Power",
    text: "Crypto allows fast global transactions with low fees."
  },
  "3": {
    title: "The Risks",
    text: "Prices are volatile and losing keys means losing funds."
  },
  "4": {
    title: "The Scammers",
    text: "Fake giveaways and phishing attacks exist everywhere."
  },
  "5": {
    title: "Security Mastery",
    text: "Strong passwords and 2FA protect your crypto."
  },
  "6": {
    title: "Smart Investing",
    text: "Research and avoid emotional decisions."
  },
  "7": {
    title: "NFT World",
    text: "NFTs represent unique digital ownership."
  },
  "8": {
    title: "DeFi Universe",
    text: "Smart contracts replace banks."
  },
  "9": {
    title: "Privacy Coins",
    text: "Some coins hide transactions."
  },
  "10": {
    title: "Energy Debate",
    text: "Mining uses energy, but greener options exist."
  },
  "11": {
    title: "Keys to Power",
    text: "Private keys control everything."
  },
  "12": {
    title: "Final Test",
    text: "Crypto laws and taxes must be followed."
  }
};

// ==========================
// LOGIN
// ==========================
function login() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Enter username");

  localStorage.setItem("user", username);

  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify({ level: 1 }));
  }

  localStorage.setItem("level", "1");
  window.location.href = "dashboard.html";
}

// ==========================
// LOAD PAGE
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // DASHBOARD
  if (document.getElementById("levels")) {
    const username = localStorage.getItem("user");
    const userData = JSON.parse(localStorage.getItem(username));
    const currentLevel = userData.level;

    document.getElementById("progress").innerText =
      `Progress: ${currentLevel - 1}/12`;

    const levelsDiv = document.getElementById("levels");

    for (let i = 1; i <= 12; i++) {
      let locked = i > currentLevel;

      let div = document.createElement("div");
      div.innerHTML = `
        <h3>Level ${i}</h3>
        <button ${locked ? "disabled" : ""} onclick="startLevel(${i})">
          ${locked ? "🔒 Locked" : "Start"}
        </button>
      `;
      levelsDiv.appendChild(div);
    }
  }

  // STORY
  if (document.getElementById("story-box")) {
    let level = localStorage.getItem("level") || "1";

    document.getElementById("level-title").innerText = "Level " + level;

    const story = stories[level];

    document.getElementById("story-box").innerHTML = `
      <h2>${story.title}</h2>
      <p>${story.text}</p>
    `;

    fetch("questions.json")
      .then(res => res.json())
      .then(data => {
        questions = data[level];
      });
  }

});

// ==========================
// START LEVEL
// ==========================
function startLevel(level) {
  localStorage.setItem("level", String(level));
  window.location.href = "level.html";
}

// ==========================
// START QUESTIONS
// ==========================
function startQuestions() {
  document.getElementById("story-box").style.display = "none";
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("question-section").style.display = "block";

  currentQuestion = 0;
  loadQuestion();
}

// ==========================
// LOAD QUESTION
// ==========================
function loadQuestion() {
  const q = questions[currentQuestion];

  answered = false;

  document.getElementById("question-box").innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) =>
      `<button onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;

  document.getElementById("next-btn").disabled = true;
}

// ==========================
// ANSWER (MUST BE CORRECT)
// ==========================
function answer(choice) {
  if (answered) return;

  const q = questions[currentQuestion];

  if (choice === q.answer) {
    answered = true;
    showPopup("✅ Correct!");
    document.getElementById("next-btn").disabled = false;
  } else {
    showPopup("❌ " + q.explanation);
    // ❌ DO NOT ENABLE NEXT BUTTON
  }
}

// ==========================
// NEXT QUESTION
// ==========================
function nextQuestion() {
  if (!answered) {
    alert("You must select the correct answer!");
    return;
  }

  currentQuestion++;

  if (currentQuestion >= 5) {
    completeLevel();
  } else {
    loadQuestion();
  }
}

// ==========================
// COMPLETE LEVEL (REWARD)
// ==========================
function completeLevel() {
  const username = localStorage.getItem("user");
  const level = parseInt(localStorage.getItem("level"));

  let userData = JSON.parse(localStorage.getItem(username));

  userData.level = Math.min(level + 1, 12);
  localStorage.setItem(username, JSON.stringify(userData));

  // 🪙 REWARD POPUP
  showPopup("🎉 You collected " + rewards[level - 1] + "!");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2000);
}

// ==========================
// POPUP
// ==========================
function showPopup(msg) {
  document.getElementById("popup-text").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ==========================
// GLOBAL VARIABLES
// ==========================
let currentQuestion = 0;
let questions = [];
let answered = false;

// ==========================
// STORY DATA
// ==========================
const stories = {
  "1": {
    title: "The Beginning of Crypto",
    text: "You enter a digital world where money is no longer physical. Bitcoin appears — a decentralized currency powered by blockchain. No banks control it. You must learn how it works to survive this new system."
  },
  "2": {
    title: "Global Power",
    text: "Crypto allows instant global transactions. You realize people can send money across borders without banks. This power changes everything."
  },
  "3": {
    title: "The Risks",
    text: "The market is unpredictable. Prices swing wildly, and danger lurks everywhere. One wrong move could cost everything."
  },
  "4": {
    title: "The Scammers",
    text: "Fake giveaways and phishing attacks are everywhere. You must learn to recognize traps before it’s too late."
  },
  "5": {
    title: "Security Mastery",
    text: "You strengthen your defenses — strong passwords, 2FA, and backups. You are becoming secure."
  },
  "6": {
    title: "Smart Investing",
    text: "You learn patience. Research is key. Emotional decisions lead to loss."
  },
  "7": {
    title: "NFT World",
    text: "Digital ownership becomes real. NFTs represent unique items on the blockchain."
  },
  "8": {
    title: "DeFi Universe",
    text: "Banks disappear. Smart contracts take over financial systems."
  },
  "9": {
    title: "Privacy Coins",
    text: "Some coins hide transactions. Privacy is power — but controversial."
  },
  "10": {
    title: "Energy Debate",
    text: "Crypto mining consumes energy. The world debates its environmental impact."
  },
  "11": {
    title: "Keys to Power",
    text: "Your private key controls everything. Lose it, and everything is gone."
  },
  "12": {
    title: "The Final Test",
    text: "Regulations, taxes, and laws define the crypto world. You must master them all."
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
// DASHBOARD
// ==========================
if (document.getElementById("levels")) {
  const username = localStorage.getItem("user");

  if (!username) {
    window.location.href = "index.html";
  } else {
    const userData = JSON.parse(localStorage.getItem(username));
    const currentLevel = userData.level;

    document.getElementById("progress").innerText =
      `Progress: ${currentLevel - 1}/12`;

    const levelsDiv = document.getElementById("levels");
    levelsDiv.innerHTML = "";

    for (let i = 1; i <= 12; i++) {
      let locked = i > currentLevel;

      let div = document.createElement("div");
      div.innerHTML = `
        <h3>Level ${i}</h3>
        <button ${locked ? "disabled" : ""} onclick="startLevel(${i})">
          ${locked ? "Locked 🔒" : "Start"}
        </button>
      `;
      levelsDiv.appendChild(div);
    }
  }
}

// ==========================
// START LEVEL
// ==========================
function startLevel(level) {
  localStorage.setItem("level", String(level));
  window.location.href = "level.html";
}

// ==========================
// LEVEL PAGE (STORY LOAD)
// ==========================
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
  if (!q) return;

  answered = false;

  document.getElementById("question-box").innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) =>
      `<button class="option-btn" onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;

  document.getElementById("next-btn").disabled = true;
}

// ==========================
// ANSWER
// ==========================
function answer(choice) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];

  if (choice === q.answer) {
    showPopup("✅ Correct!");
  } else {
    showPopup("❌ Wrong! " + q.explanation);
  }

  document.getElementById("next-btn").disabled = false;
}

// ==========================
// NEXT QUESTION
// ==========================
function nextQuestion() {
  if (!answered) {
    alert("You must answer the question first!");
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
// COMPLETE LEVEL
// ==========================
function completeLevel() {
  const username = localStorage.getItem("user");
  const level = parseInt(localStorage.getItem("level"));

  let userData = JSON.parse(localStorage.getItem(username));

  if (level >= userData.level) {
    userData.level = Math.min(level + 1, 12);
    localStorage.setItem(username, JSON.stringify(userData));
  }

  alert("Level Complete!");

  window.location.href = "dashboard.html";
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

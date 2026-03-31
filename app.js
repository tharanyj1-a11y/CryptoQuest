// ==========================
// GLOBAL VARIABLES
// ==========================
let currentQuestion = 0;
let questions = [];
let answered = false;

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
// LEVEL PAGE
// ==========================
if (document.getElementById("question-box")) {
  let level = localStorage.getItem("level");

  if (!level) {
    level = "1";
    localStorage.setItem("level", "1");
  }

  level = String(level);

  document.getElementById("level-title").innerText = "Level " + level;

  fetch("questions.json")
    .then(res => res.json())
    .then(data => {
      questions = data[level];

      if (!questions || questions.length === 0) {
        alert("No questions found");
        return;
      }

      currentQuestion = 0;
      loadQuestion();
    })
    .catch(() => {
      alert("Error loading questions");
    });
}

// ==========================
// LOAD QUESTION
// ==========================
function loadQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;

  // 🔥 RESET ANSWER STATE
  answered = false;

  document.getElementById("question-box").innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) =>
      `<button class="option-btn" onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;

  // 🔥 FORCE DISABLE NEXT BUTTON
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.disabled = true;
}

// ==========================
// ANSWER
// ==========================
function answer(choice) {
  // 🔥 PREVENT MULTIPLE ANSWERS
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];

  if (choice === q.answer) {
    showPopup("✅ Correct!");
  } else {
    showPopup("❌ Wrong! " + q.explanation);
  }

  // 🔥 ENABLE NEXT BUTTON ONLY AFTER ANSWER
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.disabled = false;
}

// ==========================
// NEXT QUESTION (HARD BLOCK)
// ==========================
function nextQuestion() {
  // 🔥 ABSOLUTE BLOCK
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

  const rewards = [
    "Bitcoin","Ethereum","Litecoin","Cardano",
    "Solana","Polkadot","Chainlink","Uniswap",
    "Monero","Tezos","Avalanche","Polygon"
  ];

  alert("You earned " + rewards[level - 1]);

  if (level >= userData.level) {
    userData.level = Math.min(level + 1, 12);
    localStorage.setItem(username, JSON.stringify(userData));
  }

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

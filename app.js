// ==========================
// LOGIN PAGE
// ==========================
function login() {
  const usernameInput = document.getElementById("username");
  if (!usernameInput) return;

  const username = usernameInput.value.trim();
  if (!username) {
    alert("Enter username");
    return;
  }

  localStorage.setItem("user", username);

  // Initialize user progress if new
  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify({ level: 1 }));
  }

  window.location.href = "dashboard.html";
}

// ==========================
// DASHBOARD PAGE
// ==========================
if (document.getElementById("levels")) {
  const username = localStorage.getItem("user");

  if (!username) {
    alert("Please login first");
    window.location.href = "index.html";
  } else {
    const userData = JSON.parse(localStorage.getItem(username));
    const currentLevel = userData.level;

    // Show progress
    const progressText = document.getElementById("progress");
    progressText.innerText = `Progress: ${currentLevel - 1}/12`;

    const levelsDiv = document.getElementById("levels");
    levelsDiv.innerHTML = "";

    // Create levels
    for (let i = 1; i <= 12; i++) {
      const locked = i > currentLevel;

      const div = document.createElement("div");
      div.className = "level";

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
  localStorage.setItem("level", level);
  window.location.href = "level.html";
}

// ==========================
// LEVEL PAGE
// ==========================
let currentQuestion = 0;
let questions = [];

if (document.getElementById("question-box")) {
  const level = localStorage.getItem("level");

  if (!level) {
    alert("No level selected");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("level-title").innerText = "Level " + level;

    // ✅ LOAD QUESTIONS (CRITICAL LINE)
    fetch("questions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("questions.json not found");
        }
        return response.json();
      })
      .then(data => {
        questions = data[level];

        if (!questions || questions.length === 0) {
          alert("No questions found for this level");
          return;
        }

        currentQuestion = 0;
        loadQuestion();
      })
      .catch(error => {
        console.error(error);
        alert("Error loading questions.json");
      });
  }
}

// ==========================
// LOAD QUESTION
// ==========================
function loadQuestion() {
  const q = questions[currentQuestion];

  const box = document.getElementById("question-box");
  if (!box) return;

  box.innerHTML = `
    <p>${q.question}</p>
    ${q.options
      .map(
        (opt, i) =>
          `<button onclick="answer(${i})">${opt}</button>`
      )
      .join("")}
  `;
}

// ==========================
// ANSWER HANDLING
// ==========================
function answer(choice) {
  const correct = questions[currentQuestion].answer;

  if (choice === correct) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

// ==========================
// NEXT QUESTION
// ==========================
function nextQuestion() {
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

  // Unlock next level
  if (level >= userData.level) {
    userData.level = level + 1;

    // Prevent going above 12
    if (userData.level > 12) {
      userData.level = 12;
    }

    localStorage.setItem(username, JSON.stringify(userData));
  }

  window.location.href = "dashboard.html";
}

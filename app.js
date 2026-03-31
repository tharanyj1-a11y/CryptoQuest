// LOGIN
function login() {
  let username = document.getElementById("username").value;
  if (!username) return alert("Enter username");

  localStorage.setItem("user", username);

  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify({ level: 1 }));
  }

  window.location = "dashboard.html";
}

// DASHBOARD
if (window.location.pathname.includes("dashboard")) {
  let username = localStorage.getItem("user");
  let userData = JSON.parse(localStorage.getItem(username));

  let currentLevel = userData.level;

  document.getElementById("progress").innerText =
    `Progress: ${currentLevel - 1}/12`;

  let levelsDiv = document.getElementById("levels");

  for (let i = 1; i <= 12; i++) {
    let locked = i > currentLevel;

    let div = document.createElement("div");
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

function startLevel(level) {
  localStorage.setItem("level", level);
  window.location = "level.html";
}

// LEVEL PAGE
let currentQuestion = 0;
let questions = [];

if (window.location.pathname.includes("level")) {
  let level = localStorage.getItem("level");
  document.getElementById("level-title").innerText = "Level " + level;

  fetch("questions.json")
    .then(res => res.json())
    .then(data => {
      questions = data[level];
      loadQuestion();
    });
}

function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question-box").innerHTML = `
    <p>${q.question}</p>
    ${q.options.map((opt, i) =>
      `<button onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;
}

function answer(choice) {
  if (choice === questions[currentQuestion].answer) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= 5) {
    completeLevel();
  } else {
    loadQuestion();
  }
}

function completeLevel() {
  let username = localStorage.getItem("user");
  let level = parseInt(localStorage.getItem("level"));

  let userData = JSON.parse(localStorage.getItem(username));

  let rewards = [
    "Bitcoin","Ethereum","Litecoin","Cardano",
    "Solana","Polkadot","Chainlink","Uniswap",
    "Monero","Tezos","Avalanche","Polygon"
  ];

  alert("You earned " + rewards[level - 1]);

  if (level >= userData.level) {
    userData.level = level + 1;
    localStorage.setItem(username, JSON.stringify(userData));
  }

  window.location = "dashboard.html";
}

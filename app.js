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
    text: `
    You wake up in a futuristic digital world 🌐.

    A guide appears: "Welcome, explorer. This is the world of cryptocurrency."

    You discover Bitcoin — a type of digital money. Unlike cash, it doesn't exist physically.
    Instead, it exists online and is powered by something called a blockchain.

    "There are no banks here," the guide explains. "Everything is decentralized."

    <h2>You learn:</h2>
    <ul>
    <li>Crypto is digital</li>
    <li>It runs on blockchain</li>
    <li>Wallets store private keys (NOT the coins)</li>
    </ul>
    
    Remember this — you will need it to survive the next challenge.
    `
  },
  "2": {
    title: "Global Power",
    text: `
    You travel across digital borders instantly.

    "Crypto has no limits," your guide says.

    You send money across the world in seconds — no bank, no waiting.

    <h2>You realize:</h2>
    <ul>
    <li>Crypto is global 🌍</li>
    <li>Transactions are fast ⚡</li>
    <li>Fees are often lower than banks</li>
    </ul>

    "This power connects the entire world," the guide warns.
    `
  },
  "3": {
    title: "The Risks",
    text: `
    The environment becomes unstable.

    Prices rise 📈... then crash 📉.

    "Crypto is volatile," the guide says.

    You see people losing money quickly.

    <h2>You learn:</h2>
    <ul>
    <li>Prices change fast</li>
    <li>Losing your private key = losing everything</li>
    <li>Crypto is risky ⚠️</li>
    </ul>

    You must stay alert.
    `
  },
  "4": {
    title: "The Scammers",
    text:`
    You enter a dark marketplace.

    Messages appear:
    "Send 1 Bitcoin, get 2 back!"

    The guide shakes their head: "Scam."

    <h2>You learn:</h2>
     <ul>
    <li>Fake giveaways are common</li>
    <li>Phishing steals your info</li>
    <li>Never trust random links</li>
     </ul>
     
    ⚠️ Trust nothing without proof.
    `
  },
  "5": {
    title: "Security Mastery",
    text:`
    You upgrade your defences.

    <h2>You activate:</h2>
    <ul>
    <li>Strong passwords 🔒</li>
    <li>2FA authentication</li>
    <li>Wallet backups</li>
    </ul>
    
    The guide says: "Security is everything."

    <h2>You learn:</h2>
    <ul>
    <li>Never share private keys</li>
    <li>Always protect your account</li>
    </ul>
    `
  },
  "6": {
    title: "Smart Investing",
    text: `
    You begin trading.

    People panic-buy and lose everything.

    You stay calm.

    <h2>You learn:</h2>
    <ul>
    <li>Research before investing</li>
    <li>Avoid FOMO</li>
    <li>Diversify your assets</li>
    </ul>

    Smart decisions = survival.
    `
  },
  "7": {
    title: "NFT World",
    text: `
    You enter a gallery of digital art 🎨.

    Each piece is unique.

    "These are NFTs," the guide explains.

    <h2>You learn:</h2>
    <ul>
    <li>NFTs are unique digital assets</li>
    <li>They represent ownership</li>
    <li>Anyone can view them, but ownership is recorded</li>
    </ul>

    Ownership matters.
    `
  },
  "8": {
    title: "DeFi Universe",
    text: `
    Banks vanish.

    Smart contracts take over.

    You lend and borrow without a middleman.

    <h2>You learn:</h2>
    <ul>
    <li>DeFi = decentralized finance</li>
    <li>Smart contracts run automatically</li>
    <li>No banks needed</li>
    </ul>
    
    The system is evolving.
    `
  },
  "9": {
    title: "Privacy Coins",
    text: `
    You enter a hidden network.

    Transactions cannot be traced.

    <h2>You learn:</h2>
    <ul>
    <li>Privacy coins hide data</li>
    <li>Not all crypto is transparent</li>
    <li>Some are restricted</li>
    </ul>
    
    Privacy = power ⚡
    `
  },
  "10": {
    title: "Energy Debate",
    text: `
    You see massive mining machines ⚙️.

    They consume energy.

    <h2>You learn:</h2>
    <ul>
    <li>Mining uses electricity</li>
    <li>Some crypto is energy-heavy</li>
    <li>New eco-friendly solutions exist</li>

    The future depends on sustainability.
    `
  },
  "11": {
    title: "Keys to Power",
    text: `
    A vault appears.

    The guide says: "This is your private key."

    <h2>You learn:</h2>
    <ul>
    <li>Private keys control access</li>
    <li>If stolen → funds are gone</li>
    <li>Never share them</li>
    </ul>

    Protect it at all costs.
    `
  },
  "12": {
    title: "Final Test",
    text: `
    You reach the final stage.

    Governments appear.

    <h2>You learn:</h2>
    <ul>
    <li>Crypto laws vary</li>
    <li>Taxes apply</li>
    <li>Regulation exists</li>
    </ul>

    "To master crypto, you must follow the rules."

    You are ready.
    `
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

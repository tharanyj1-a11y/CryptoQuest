  if (currentQuestion >= 5) {
    completeLevel();
  } else {
    loadQuestion();
  }
}

function completeLevel() {
  let level = localStorage.getItem("level");

  let rewards = [
    "Bitcoin", "Ethereum", "Litecoin", "Cardano",
    "Solana", "Polkadot", "Chainlink",
    "Uniswap", "Monero", "Tezos",
    "Avalanche", "Polygon"
  ];

  alert("You earned " + rewards[level - 1]);

  window.location = "dashboard.html";
}

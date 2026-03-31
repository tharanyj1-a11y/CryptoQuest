let username = localStorage.getItem("user");
  let level = parseInt(localStorage.getItem("level"));

  let rewards = [
    "Bitcoin","Ethereum","Litecoin","Cardano",
    "Solana","Polkadot","Chainlink","Uniswap",
    "Monero","Tezos","Avalanche","Polygon"
  ];

  alert("You earned " + rewards[level - 1]);

  fetch("/progress", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username,
      level: level + 1
    })
  }).then(() => {
    window.location = "dashboard.html";
  });
}

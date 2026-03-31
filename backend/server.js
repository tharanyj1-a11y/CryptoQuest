const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/../frontend"));

function getUsers() {
  return JSON.parse(fs.readFileSync(__dirname + "/users.json"));
}

function saveUsers(data) {
  fs.writeFileSync(__dirname + "/users.json", JSON.stringify(data, null, 2));
}

app.get("/progress/:username", (req, res) => {
  let users = getUsers();
  let user = users[req.params.username] || { level: 1 };
  res.json(user);
});

app.post("/progress", (req, res) => {
  let users = getUsers();
  let { username, level } = req.body;

  users[username] = { level };
  saveUsers(users);

  res.json({ status: "saved" });
});

app.get("/questions", (req, res) => {
  res.sendFile(__dirname + "/questions.json");
});

app.listen(3000, () => console.log("http://localhost:3000"));

const express = require("express");
const app = express();

app.use(express.static("../frontend"));

app.get("/backend/questions.json", (req, res) => {
  res.sendFile(__dirname + "/questions.json");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

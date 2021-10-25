const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

const users = [
  {
    id: "asd123",
    name: "cocoon",
    email: "kjy2532@gmail.com",
  },
  {
    id: "czx312",
    name: "jenny",
    email: "oasis21hd@gmail.com",
  },
];

server.get("/api/user", (req, res) => {
  res.json(users);
});

server.post("/api/user", (req, res) => {
  users.push(req.body);
  res.json(users);
});

server.listen(3000, () => {
  console.log("server is running");
});

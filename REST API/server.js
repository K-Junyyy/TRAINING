const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });
const User = require("./models/User");

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

server.get("/", (req, res) => {
  const newUser = new User();
  newUser.email = "kjy1787@gmail.com";
  newUser.name = "cocoon";
  newUser.age = 25;
  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.json({
        message: "User created Successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "User was not created Successfully",
      });
    });
});

server.get("/api/user", (req, res) => {
  res.json(users);
});

server.get("/api/user/:id", (req, res) => {
  const user = users.find((u) => {
    return u.id === req.params.id;
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ errorMessage: "User was not found" });
  }
});

server.post("/api/user", (req, res) => {
  users.push(req.body);
  res.json(users);
});

server.put("/api/user/:id", (req, res) => {
  let foundIndex = users.findIndex((u) => u.id === req.params.id);
  if (foundIndex === -1) {
    res.status(404).json({ errorMessage: "User was not found" });
  } else {
    users[foundIndex] = { ...users[foundIndex], ...req.body };
    res.json(users[foundIndex]);
  }
});

server.delete("/api/user/:id", (req, res) => {
  let foundIndex = users.findIndex((u) => u.id === req.params.id);
  if (foundIndex === -1) {
    res.status(404).json({ errorMessage: "User was not found" });
  } else {
    let foundUser = users.splice(foundIndex, 1);
    res.json(foundUser[0]);
  }
});

server.listen(3000, (err) => {
  if (err) {
    console.log("server is error");
  } else {
    console.log("server is running");
    mongoose.connect(
      process.env.MONGODB_URL,
      { useNewUrlParser: true },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to database successfulyy");
        }
      }
    );
  }
});

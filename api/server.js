const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/auth-middleware");

// auth and routers go here
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const questionsRouter = require("../questions/questions-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use with endpoints here
server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/questions", authenticate, questionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;

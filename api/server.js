const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/auth-middleware");

// auth and routers go here
// const authRouter =
// const usersRouter =

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use with endpoints here

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;

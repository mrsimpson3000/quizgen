const jwt = require("jsonwebtoken");
const configVars = require("../config/vars");

module.exports = {
  isUserValid,
  isLoginValid,
  generateToken,
};

function isUserValid(user) {
  return Boolean(
    user.username &&
      typeof user.username === "string" &&
      user.password &&
      typeof user.password === "string" &&
      user.email &&
      typeof user.email === "string" &&
      user.firstname &&
      typeof user.firstname === "string" &&
      user.lastname &&
      typeof user.lastname === "string" &&
      user.question &&
      typeof user.question === "string" &&
      user.answer &&
      typeof user.answer === "string"
  );
}

function isLoginValid(user) {
  return Boolean(
    user.username &&
      typeof user.username === "string" &&
      user.password &&
      typeof user.password === "string"
  );
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    userName: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, configVars.jwtSecret, options);
}

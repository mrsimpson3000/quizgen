const jwt = require("jsonwebtoken");
const configVars = require("../config/vars");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, configVars.jwtSecret, (err, decodedToken) => {
    if (token) {
      if (err) {
        // The token is not valid
        res.status(401).json({ message: "Please log in first." });
      } else {
        // The token is valid
        req.jwt = decodedToken;
        next();
      }
    } else {
      res
        .status(400)
        .json({ message: "Please provide the authentication information." });
    }
  });
};

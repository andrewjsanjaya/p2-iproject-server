const jwt = require("jsonwebtoken");
const secretPass = process.env.SECRET;

function createToken(payload) {
  return jwt.sign(payload, secretPass, { expiresIn: "1h" });
}

function checkToken(token) {
  return jwt.verify(token, secretPass);
}

module.exports = { createToken, checkToken };

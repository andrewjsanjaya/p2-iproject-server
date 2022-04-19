const bcrypt = require("bcryptjs");

function createPassword(password) {
  return bcrypt.hashSync(password, 5);
}

function readPassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = { createPassword, readPassword };

const express = require("express");
const router = express.Router();
const User = require("./routeUser");

router.use("/users", User);

module.exports = router;

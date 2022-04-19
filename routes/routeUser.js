const express = require("express");
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", Controller.register);

router.post("/login", Controller.login);

router.use(authentication);

router.get("/verification", Controller.getVerificationCode);

module.exports = router;

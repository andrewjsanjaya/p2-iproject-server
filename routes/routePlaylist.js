const express = require("express");
const Controller = require("../controllers/playlistController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.use(authentication);

router.get("/", Controller.playlist);

router.get("/favorite", Controller.playlist);

router.post("/favorite", Controller.addFavorite);

module.exports = router;

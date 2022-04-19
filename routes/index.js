const express = require("express");
const router = express.Router();
const User = require("./routeUser");
const Playlist = require("./routePlaylist");

router.use("/users", User);
router.use("/playlists", Playlist);

module.exports = router;

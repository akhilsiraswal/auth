const express = require("express");
const {
  getPlaylistById,
  getAllPlaylist,
  addToPlaylist,
  createPlaylist,
} = require("../controllers/playlist");
const router = express.Router();

router.param("/:playlistId", getPlaylistById);
router.get("/allPlaylist", getAllPlaylist);
router.post("/addPlaylist", addToPlaylist);
router.post("/createPlaylist", createPlaylist);

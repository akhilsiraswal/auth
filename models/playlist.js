const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  songs: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);

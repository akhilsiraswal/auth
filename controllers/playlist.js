const Playlist = require("../models/playlist");

exports.getPlaylistById = (req, res, next, _id) => {
  Playlist.findById({ _id })
    .then((playlist, err) => {
      if (err || !playlist) {
        return res.status(500).json({
          error: err || "Playlist not found",
        });
      }
      res.playlist = playlist;
      next();
    })
    .catch();
};
exports.addToPlaylist = (req, res) => {
  const song = req.body;
  const { _id, songs } = res.playlist;

  let ts = [...songs, ...song];
  const total_songs = ts.filter((item, pos) => ts.indexOf(item) === pos);
  songs = tota_songs;
  //   console.log(total_songs);

  Playlist.findOneAndUpdate({ _id }, { $push: { songs: songs } })
    .then((playlist, err) => {
      if (err || !playlist) {
        return res.status(500).json({
          error: err || "Playlist not found",
        });
      }
    })
    .catch();
};
exports.deletePlaylist = (req, res) => {
  const { _id } = res.playlist;
  Playlist.findOneAndDelete({ id }).then((deletedPlaylist, err) => {
    if (err || !deletedPlaylist) {
      return res.status(500).json({
        error: err || "playlist deletion failed",
      });
    }

    return res.status(200).json({
      message: "playlist delted successfully",
    });
  });
};
exports.getAllPlaylist = (req, res) => {
  Playlist.find().then((playlists, err) => {
    if (err || !playlists) {
      return res.status(500).json({
        error: err || "Playlists not found",
      });
    }

    return res.status(200).json(playlists);
  });
};
exports.createPlaylist = (req, res) => {
  const { playlistName } = req.body;
  Playlist.find({ playlistName }).then((playlist, err) => {
    if (err || playlist) {
      return res.status(500).json({
        error: err || "playlist already created",
      });
    }

    const playlist = new Playlist(req.body);
    playlist.save().then((playlist, err) => {
      if (err || !playlsit) {
        return res.status(500).json({
          error: err || "playlist cannot be saved",
        });
      }
      return res.status(200).json(playlist);
    });
  });
};

exports.removeSongFromPlaylist = (req, res) => {
  const { _id, songs } = req.playlist;
  const { song } = req.body;
  songs = songs.filter((item, pos) => item != song);
  Playlist.findOneAndUpdate({ _id }, { $push: { songs: songs } }).then(
    (updatedPlaylist, err) => {
      if (err || !updatedPlaylist) {
        return res.status(500).json({
          error: err || "Playlist cannot be updated at this moment",
        });
      }
    }
  );
};

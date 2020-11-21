const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artistname: { type: String, required: true },
  url: { type: String, required: true }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;

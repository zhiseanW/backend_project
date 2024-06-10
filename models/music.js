const { text } = require("express");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const musicSchema = new Schema({
  musicName: {
    type: String,
    required: true,
  },
  music_url: {
    type: String,
    required: true,
  },
  description: String,
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  soldNumber: {
    type: Number,
    default: 0,
  },
});

const Music = model("Music", musicSchema);
module.exports = Music;

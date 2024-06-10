const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Artist = model("Artist", artistSchema);
module.exports = Artist;

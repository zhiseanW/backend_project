const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  music: {
    type: Schema.Types.ObjectId,
    ref: "Music",
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

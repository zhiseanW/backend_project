const Music = require("../models/music");
const User = require("../models/user");

const Comment = require("../models/comment");

const createComment = async (user, music, comment) => {
  try {
    const newComment = new Comment({
      user: user,
      music: music,
      comment: comment,
    });
    await newComment.save();
    res.status(200).send(newComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getComments = async () => {
  const comments = await Comment.find().sort({ name: 1 });
  return comments;
};

const getComment = async (comment_id) => {
  const comment = await Music.findById(comment_id);
  return comment;
};

const updateComment = async (comment_id, user, music, comment) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      comment_id,
      {
        user: user,
        music: music,
        comment: comment,
      },
      {
        new: true,
      }
    );

    return updatedComment;
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteComment = async (_id) => {
  return await Comment.findByIdAndDelete(_id);
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};

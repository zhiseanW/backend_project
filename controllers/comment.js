const Music = require("../models/music");
const User = require("../models/user");

const Comment = require("../models/comment");

const createComment = async (username, music, comment) => {
  try {
    const newComment = new Comment({
      username: username,
      music: music,
      comment: comment,
    });
    await newComment.save();
    return newComment;
  } catch (error) {
    throw new Error(error);
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

const updateComment = async (comment_id, comment) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      comment_id,
      {
        comment: comment,
      },
      {
        new: true,
      }
    );
    return updatedComment;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteComment = async (_id) => {
  const deletedComment = await Comment.findByIdAndDelete(_id);
  return deletedComment;
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};

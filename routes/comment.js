const express = require("express");
const router = express.Router();
const Music = require("../models/music");

const {
  getComments,
  createComment,
  updateComment,
  getComment,
  deleteComment,
} = require("../controllers/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await getComments();
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getComment(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, music, comment } = req.body;
    const newComment = await createComment(username, music, comment);
    res.status(200).send(newComment);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const user_id = req.params.id;
  const { comment } = req.body;
  const updatedComment = await updateComment(user_id, comment);
  res.status(200).send(updatedComment);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedComment = await deleteComment(id);
    res.status(200).send(deletedComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

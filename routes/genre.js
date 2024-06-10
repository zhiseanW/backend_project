const express = require("express");
const router = express.Router();

const {
  getGenres,
  addGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre");
const { isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const genres = await getGenres();
    res.status(200).send(genres);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const newGenre = await addGenre(name);
    res.status(200).send(newGenre);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.put("/", isAdmin, async (req, res) => {
  try {
    const genre_id = req.params.id;
    const name = req.body.name;
    const updatedGenre = await updateGenre(genre_id, name);
    res.status(200).send(updatedGenre);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedGenre = await deleteGenre(id);
    res.status(200).send(deletedGenre);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;

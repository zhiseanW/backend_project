const express = require("express");
const router = express.Router();

const {
  getArtists,
  addArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artist");
const { isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const artists = await getArtists();
    res.status(200).send(artists);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const newArtist = await addArtist(name);
    res.status(200).send(newArtist);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const artist_id = req.params.id;
    const { name } = req.body;
    const updatedArtist = await updateArtist(artist_id, name);
    res.status(200).send(updatedArtist);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedArtist = await deleteArtist(id);
    res.status(200).send(deletedArtist);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;

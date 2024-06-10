const express = require("express");

const {
  getMusic,
  getMusics,
  createMusic,
  updateMusic,
  deleteMusic,
} = require("../controllers/music");

const { isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getMusics(
          req.query.genre,
          req.query.artist,
          req.query.perPage,
          req.query.page
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getMusic(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const {
      musicName,
      music_url,
      description,
      genre,
      artist,
      price,
      soldNumber,
    } = req.body;
    const newMusic = await createMusic(
      musicName,
      music_url,
      description,
      genre,
      artist,
      price,
      soldNumber
    );
    res.status(200).send(newMusic);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { musicName, music_url, description, genre, artist, price } =
      req.body;
    const updatedMusic = await updateMusic(
      req.params.id,
      musicName,
      music_url,
      description,
      genre,
      artist,
      price
    );
    res.status(200).send(updatedMusic);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMusic = await deleteMusic(id);
    res.status(200).send(deletedMusic);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;

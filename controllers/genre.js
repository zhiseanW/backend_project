const Music = require("../models/music");
const Genre = require("../models/genre");

const getGenres = async () => {
  const genres = await Genre.find().sort({ name: 1 });
  return genres;
};

const addGenre = async (name) => {
  const newGenre = new Genre({
    name: name,
  });
  await newGenre.save();
  return newGenre;
};

const updateGenre = async (name) => {
  const updatedGenre = await Genre.findByIdAndUpdate(
    _id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return updatedGenre;
};

const deleteGenre = async (_id) => {
  const musics = await Music.find({ music: _id });
  if (musics && musics.length > 0) {
    throw new Error("This Genre still has music");
  }
  const deletedGenre = await Genre.findByIdAndDelete(_id);
  return deletedGenre;
};

module.exports = {
  getGenres,
  addGenre,
  updateGenre,
  deleteGenre,
};

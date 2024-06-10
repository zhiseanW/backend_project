const Music = require("../models/music");

const createMusic = async (
  musicName,
  music_url,
  description,
  genre,
  artist,
  price
) => {
  const newMusic = new Music({
    musicName: musicName,
    music_url: music_url,
    description: description,
    genre: genre,
    artist: artist,
    price: price,
  });
  await newMusic.save();
  return newMusic;
};

const getMusic = async (music_id) => {
  const music = await Music.findById(music_id);
  return music;
};

const getMusics = async (genre, artist, perPage = 6, page = 1) => {
  try {
    let filter = {};
    let sorted = { _id: -1 };
    if (genre) {
      filter.genre = genre;
    }
    if (artist) {
      filter.artist = artist;
    }

    const musics = await Music.find(filter)
      .populate("genre")
      .populate("artist")
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ _id: -1 });
    return musics;
  } catch (error) {
    throw new Error(error);
  }
};

const updateMusic = async (
  music_id,
  musicName,
  music_url,
  description,
  genre,
  artist,
  price
) => {
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      music_id,
      {
        musicName: musicName,
        music_url: music_url,
        description: description,
        genre: genre,
        artist: artist,
        price: price,
      },
      {
        new: true,
      }
    );
    return updatedMusic;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMusic = async (_id) => {
  return await Music.findByIdAndDelete(_id);
};

module.exports = {
  createMusic,
  getMusic,
  getMusics,
  updateMusic,
  deleteMusic,
};

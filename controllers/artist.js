const Artist = require("../models/artist");
const Music = require("../models/music");

const getArtists = async () => {
  const artists = await Artist.find().sort({ name: 1 });
  return artists;
};

const addArtist = async (name) => {
  const newArtist = new Artist({
    name: name,
  });
  await newArtist.save();
  return newArtist;
};

const updateArtist = async (artist_id, name) => {
  const updatedArtist = await Artist.findByIdAndUpdate(
    artist_id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return updatedArtist;
};

const deleteArtist = async (_id) => {
  const musics = await Music.find({ music: _id });
  if (musics && musics.length > 0) {
    throw new Error("This Artist is active");
  }
  const deletedArtist = await Artist.findByIdAndDelete(_id);
  return deletedArtist;
};

module.exports = {
  getArtists,
  addArtist,
  updateArtist,
  deleteArtist,
};

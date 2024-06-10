const express = require("express");

const router = express.Router();

const {
  getUser,
  updateBio,
  getUserByEmail,
  loginUser,
  signUpUser,
  getUsers,
} = require("../controllers/user");

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await loginUser(email, password);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//signup route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // create user via signUpUser()
    const user = await signUpUser(name, email, password);
    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, profPic, bio } = req.body;
    const newBio = await updateBio(req.params.id, name, profPic, bio);

    res.status(200).send(newBio);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");

const generateTokenForUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "30d", // 30 days
    }
  );
};
const getUser = async (user_id) => {
  const user = await User.findById(user_id);
  return user;
};

const updateBio = async (user_id, name, profPic, bio) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        name,
        profPic,
        bio,
      },
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateTokenForUser(user);
  console.log(token);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

const signUpUser = async (name, email, password) => {
  const email_exists = await getUserByEmail(email);
  if (email_exists) throw new error("Email already exists");

  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
  });

  await newUser.save();

  const token = generateTokenForUser(newUser);

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  getUser,
  getUserByEmail,
  loginUser,
  signUpUser,
  updateBio,
};

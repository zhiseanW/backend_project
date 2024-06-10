const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_URL } = require("./config");

const app = express();

//middleware for json req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the uploads folder as static path
app.use("/uploads", express.static("uploads"));
app.use("/placeholder", express.static("placeholder"));

//setup cors policy IMPORTANT
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);
mongoose
  .connect(MONGODB_URL + "projectdb")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const imagesRoute = require("./routes/images");
const userRoute = require("./routes/user");
const musicRoute = require("./routes/music");
const commentRoute = require("./routes/comment");
const genreRoute = require("./routes/genre");
const artistRoute = require("./routes/artist");

app.use("/orders", orderRoute);
app.use("/payment", paymentRoute);
app.use("/images", imagesRoute);
app.use("/users", userRoute);
app.use("/musics", musicRoute);
app.use("/comments", commentRoute);
app.use("/genres", genreRoute);
app.use("/artists", artistRoute);

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});

const express = require("express");
const cors = require("cors");
const app = express();
const { handle } = require("./error");

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.password}@cluster0.4qgz1jx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((data) => console.log("connected"));

const posts = require("./routes/posts");
const oauth = require("./routes/oauth");

app.use(express.json());
app.use(cors());
app.use("/oauth", oauth);
app.use("/posts", posts);
app.use(handle);

module.exports = app;

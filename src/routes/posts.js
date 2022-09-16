const router = require("express").Router();
const Post = require("../models/post");
const mongoose = require("mongoose");
const verify = require("../verify");

router.get("/:page", async (req, res) => {
  const page = req.params.page || 1;
  const posts = await Post.paginate({}, { page, limit: 10 });

  return res.send(posts);
});

router.post("/", verify, (req, res) => {
  const { title, description, image } = req.body;

  if (!title || !description || !image) {
    return res.send({ error: "Please fill all the fields" });
  }

  const post = new Post({
    title,
    description,
    image,
  });

  post
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.post("/:postID", verify, (req, res) => {
  const postID = req.params["postID"];
  const { title, description, image } = req.body;

  if (!postID || !mongoose.Types.ObjectId.isValid(postID)) {
    return res.send({ error: "Please fill all the fields" });
  }

  if (!title || !description || !image) {
    return res.send({ error: "Please fill all the fields" });
  }

  Post.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(postID) },
    { title, description, image }
  )
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.delete("/:postID", verify, (req, res) => {
  const postID = req.params.postID;

  if (!postID || !mongoose.Types.ObjectId.isValid(postID)) {
    return res.send({ error: "Please fill all the fields" });
  }

  Post.findByIdAndDelete({ _id: mongoose.Types.ObjectId(postID) })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;

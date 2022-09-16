const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const post = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

post.plugin(mongoosePaginate);

module.exports = mongoose.model("post", post);

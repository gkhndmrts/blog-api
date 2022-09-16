const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const user = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
  },
  { timestamps: true }
);

user.plugin(mongoosePaginate);

module.exports = mongoose.model("user", user);

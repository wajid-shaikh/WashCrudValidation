const mongoose = require("mongoose");

const Actor = mongoose.model("Actors", {
  name: String,
  email: String,
  contact: Number,
});

module.exports = Actor;

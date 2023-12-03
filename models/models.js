const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  slug: {
    type: String,
    lowercase: true,
  },
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;

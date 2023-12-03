const BookModel = require("./models/model");

const createBook = async (title, author, genre) => {
  console.log("Create Book");
  let book = new BookModel();
  book.title = title;
  book.author = author;
  book.genre = genre;
  await book.save();
  return book;
};

const updateBook = async (_id, title, author, genre) => {
  let book = await BookModel.findById(_id);
  book.title = title;
  book.author = author;
  book.genre = genre;
  await book.save();
  return book;
};

const getAllBooks = async () => {
  let books = await BookModel.find();
  return books;
};

const deleteBook = async (_id) => {
  let book = await BookModel.findByIdAndDelete(_id);
  return book;
};

const getBookById = async (_id) => {
  let book = await BookModel.findById(_id);
  return book;
};

module.exports.createBook = createBook;
module.exports.getAllBooks = getAllBooks;
module.exports.deleteBook = deleteBook;
module.exports.updateBook = updateBook;
module.exports.getBookById = getBookById;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  getBookById,
} = require("./operations");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });

app.post("/books", async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = await createBook(title, author, genre);
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    const updatedBook = await updateBook(id, title, author, genre);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await deleteBook(id);
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

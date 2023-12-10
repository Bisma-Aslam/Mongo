const express = require('express');
const router = express.Router();
const BookModel = require('../models/bookModel'); 


router.get('/books', async (req, res) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Get a specific book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Create a new book
router.post('/books', async (req, res) => {
    const book = new BookModel({
        name: req.body.name,
        genre: req.body.genre,
        producer: req.body.producer,
        year: req.body.year,
        rating: req.body.rating,
        poster: req.body.poster,
    });

    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Update a book by ID
router.patch('/books/:id', async (req, res) => {
    try {
        const updatedBook = await BookModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    genre: req.body.genre,
                    producer: req.body.producer,
                    year: req.body.year,
                    rating: req.body.rating,
                    poster: req.body.poster,
                },
            }
        );
        res.json(updatedBook);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.delete('/books/:id', async (req, res) => {
    try {
        const removedBook = await BookModel.deleteOne({ _id: req.params.id });
        res.json(removedBook);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;

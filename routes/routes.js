const express = require('express');
const router = express.Router();
const Model = require('../models/model');

router.get('/movies', async(req, res) => {
    try {
        const movies = await Model.find();
        res.json(movies);
    }
    catch(err) {
        res.json({ message: err }).status(404);
    }
}
);

router.get('/movies/:id', async(req, res) => {
    try {
        const movie = await Model.findById(req.params.id);
        res.json(movie);
    }
    catch(err) {
        res.json({ message: err }).status(404);
    }
}
);

router.post('/movies', async(req, res) => {
    
    const movie = new Model({
        name: req.body.name,
        genre: req.body.genre,
        producer: req.body.producer,
        year: req.body.year,
        rating: req.body.rating,
        poster: req.body.poster,
    });
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    }
    catch(err) {
        res.json({ message: err }).status(404);
    }
}
);

router.patch('/movies/:id', async(req, res) => {
    try {
        const updatedMovie = await Model.updateOne(
            { _id: req.params.id },
            { $set: { name: req.body.name, genre: req.body.genre, producer: req.body.producer, year: req.body.year, rating: req.body.rating, poster: req.body.poster } }
        );
        res.json(updatedMovie);
    }
    catch(err) {
        res.json({ message: err }).status(404);
    }
}
);

router.delete('/movies/:id', async(req, res) => {
    try {
        const removedMovie = await Model.deleteOne({ _id: req.params.id });
        res.json(removedMovie);
    }
    catch(err) {
        res.json({ message: err }).status(404);
    }
}
);

module.exports = router;
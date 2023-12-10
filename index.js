require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/bookRoutes'); // Assuming you have a separate book router
const bodyParser = require('body-parser');

const mongoString = process.env.CONNURL;

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', bookRouter); // Adjust the route path to match your desired structure
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Select an available port
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started at port " + port + "");
});

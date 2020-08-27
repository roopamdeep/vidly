const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose')


//const logger = require('./middleware/logger');

//const home = require('./routes/home');

app.use(express.json());
app.use('/vidly.com/api/genres', genres);
app.use('/vidly.com/api/customers', customers);
app.use('/vidly.com/api/movies', movies);
app.use('/vidly.com/api/rentals', rentals);
//app.use(logger);
//app.use('/', home);
//---------------------------------------------------------------------
mongoose
  .connect("mongodb://localhost/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Mongodb.."))
  .catch((err) => console.log("Could not connect to Mongodb..", err));

  //--------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
 console.log(`Listening on port ${port}`);
});
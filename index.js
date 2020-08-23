const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');
//const logger = require('./middleware/logger');

//const home = require('./routes/home');

app.use(express.json());
app.use('/vidly.com/api/genres', genres);
//app.use(logger);
//app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
 console.log(`Listening on port ${port}`);
});
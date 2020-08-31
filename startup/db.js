const winston = require("winston");
const mongoose = require('mongoose');
module.exports = function() {
    mongoose
  .connect("mongodb://localhost/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => winston.info("Connected to Mongodb.."))
  .catch((err) => console.log("Could not connect to Mongodb..", err));
}
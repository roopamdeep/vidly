const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");
module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: "oncaughtexceptions.log" })
  );
  winston.add(new winston.transports.Console({colorize:true, prettyPrint:true}));
  winston.add(new winston.transports.File({ filename: "logfile.log" })); //created our own transport
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    })
  );
};

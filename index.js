const express = require("express");
const winston = require("winston");
const jwt = require("jsonwebtoken");



const app = express();
require("./startup/prod");
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

require("./startup/validation")();

// process.on('uncaughtException',(ex)=>{
//   console.log('UNCAUGHT EXCEPTION:');
//   winston.error(ex.message,ex);
//process.exit(1)
// })
// process.on("unhandledRejection", (ex) => {
//   console.log("UNHANDLED REJECTION:");
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

//throw new Error('Something failed at startup')
// const p = Promise.reject(new Error("Something failed miserably!"));
// p.then(()=> console.log(''))

//const home = require('./routes/home');

//---------------------------------------------------------------------

//--------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

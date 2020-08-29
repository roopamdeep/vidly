const config = require("config");
const jwt = require('jsonwebtoken');
function auth(req,res,next){
  
    next();
}
module.exports = auth;

const config = require("config");
const jwt = require('jsonwebtoken');
const { request } = require("express");
function admin(req,res,next){
  
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
}
module.exports = admin;
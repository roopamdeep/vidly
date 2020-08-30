const config = require("config");
const jwt = require('jsonwebtoken');
const { request } = require("express");
function auth(req,res,next){
    
  const token = req.header('x-auth-token')
  console.log(token)
  if(!token) res.status(401).send('Acess Denied. No Token Received..')
  try{
     const decoded = jwt.verify(token, config.get('privatekey'))
     req.user = decoded
     next();
  }
  catch(ex){
    res.status(400).send('Invalid Token..')
  }
}
module.exports = auth;

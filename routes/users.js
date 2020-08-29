const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const {User,validate} = require('../models/user')
const mongoose = require("mongoose");

//---------------------------------------------------------------------------
router.get("/me",auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
})
//-----------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body);  //joi validation
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(req.body);

  let user = await User.findOne({email: req.body.email})
  if(user) return res.status(400).send('User already Registered...');
  user = new User(_.pick(req.body,['name','email','password']));
  const salt = await bcrypt.genSalt(10);
  user.password  = await bcrypt.hash(user.password, salt);

  //console.log(user)
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});
//---------------------------------------------------------------------------

//--------------------------------------------------------------------------

module.exports = router;

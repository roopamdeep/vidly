const _ = require("lodash");

const Joi = require("joi");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const { User } = require("../models/user");

const mongoose = require("mongoose");

//---------------------------------------------------------------------------

//-----------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body); //joi validation
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email/Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email/Password");

  const token = user.generateAuthToken();
  res.send(token);
});
//---------------------------------------------------------------------------
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}
//--------------------------------------------------------------------------

module.exports = router;

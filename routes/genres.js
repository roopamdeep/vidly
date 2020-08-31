const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//const async = require("../middleware/async");
const express = require("express");

const router = express.Router();
//const Joi = require("joi");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");

//---------------------------------------------------------------------------
 
//-------------------------------------------------------------------------
router.get("/", async (req, res) => {
  //throw new Error('Could not get genres');
  res.send(await Genre.find().sort("name"));
});
//-------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  //console.log(value);
  if (!genre) return res.status(404).send("Genre not in the list");
  res.send(genre);
});
//---------------------------------------------------------------------------------------------------
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  //console.log(req.body);
  let genre = new Genre({ name: req.body.name });
  //console.log(genre)
  genre = await genre.save();
  res.send(genre);
});
//----------------------------------------------------------------------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});
//--------------------------------------------------------------------------
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});
//--------------------------------------------------------------------------

module.exports = router;

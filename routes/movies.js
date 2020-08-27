const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const {Movie,validate} = require('../models/movie')
const {Genre} = require('../models/genre')
const mongoose = require("mongoose");

//---------------------------------------------------------------------------

//-------------------------------------------------------------------------
router.get("/", async (req, res) => {
  res.send(await Movie.find().sort("name"));
});
//-------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const movies = await Movie.findById(req.params.id);

  //console.log(value);
  if (!movies) return res.status(404).send("Movie not in the list");
  res.send(movies);
});
//-----------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(req.body);
  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(404).send("Invalid Genre..");
  const movie = new Movie({
       title: req.body.title,
       genre:{
         _id: genre._id,
         name: genre.name
       },
       numberInStock : req.body.numberInStock,
       dailyRentalRate : req.body.dailyRentalRate
     });
  //console.log(Movie)
  await movie.save();
  res.send(movie);
});
//---------------------------------------------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movies = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!movies)
    return res.status(404).send("The Movie with the given ID was not found.");
  res.send(movies);
});
//--------------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id);

  if (!movies)
    return res.status(404).send("The Movie with the given ID was not found.");

  res.send(movies);
});
//--------------------------------------------------------------------------

module.exports = router;

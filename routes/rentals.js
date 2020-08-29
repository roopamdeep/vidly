const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");
Fawn.init(mongoose);
//---------------------------------------------------------------------------

//-------------------------------------------------------------------------
router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
  //console.log('hello')
});
//-------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  //console.log(value);
  if (!rental) return res.status(404).send("Rental not in the list");
  res.send(rental);
});
//-----------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(req.body);
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie does not exost!!");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: customer._id,
      title: customer.title,
      dailyRentalRate: customer.dailyRentalRate,
    },
  });
  //console.log(Rental)
  try{
    new Fawn.Task()
    .save("rentals", rental)
    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .run();
    res.send(rental);
  }
  catch(ex){
    res.send(500).send('Something Failed..')
  }
  
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();
 
});
//---------------------------------------------------------------------------


module.exports = router;

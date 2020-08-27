const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const {Customer,validate} = require('../models/customer')

const mongoose = require("mongoose");

//---------------------------------------------------------------------------

//-------------------------------------------------------------------------
router.get("/", async (req, res) => {
  res.send(await Customer.find().sort("name"));
});
//-------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  //console.log(value);
  if (!customer) return res.status(404).send("Customer not in the list");
  res.send(customer);
});
//------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  //console.log(req.body);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  //console.log(customer)
  await customer.save();
  res.send(customer);
});
//---------------------------------------------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});
//--------------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});
//--------------------------------------------------------------------------

module.exports = router;


const Joi = require("joi");

const mongoose = require("mongoose");
const { customerSchema } = require("./customer");
const { movieSchema } = require("./movie");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee:{
      type:Number,
      min:0
    }
  })
);

//-------------------------------
function validateRental(rental) {
  const schema = Joi.object({
   customerId: Joi.objectId().required(),
   movieId: Joi.objectId().required()
  });
  
  return schema.validate(rental);
}
exports.Rental = Rental;
exports.validate = validateRental;

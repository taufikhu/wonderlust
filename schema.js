const Joi = require("joi");
const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        country: joi.string().required(),
        location: joi.string().required(),
       image: joi.any(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.string().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
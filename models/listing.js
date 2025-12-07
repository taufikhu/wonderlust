const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const Review = require("./reviews.js");
const User = require("./user.js");
const { string } = require('joi');


const listingSchema = new Schema({

    title: {
        type: String,
        require: true,   
    },
    description: String,
 image: {
       url: String,
       filename: String,
    },
    price: {
      type:Number,
      require: true,
    },
    location: String,
    country: String,
    reviews:
    [
      {
      type: Schema.Types.ObjectId,
      ref: "Review",

      },
    ],
    
    owner: {                                  // Owner for each listing 
      type: Schema.Types.ObjectId,
      ref: "User",
    
    },
  
    
});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
  await Review.deleteMany({_id: {$in: listing.reviews}});
  };
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
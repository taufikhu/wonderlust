const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

//Creating a review.
module.exports.reviewCreater = async (req, res, next)=>{
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);
 newReview.author = req.user._id;
 listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();
 req.flash("success", "New review added");

 console.log("new review saved");
 res.redirect(`/listing/${listing._id}`);
};

//Deleting a review
module.exports.reviewDelete = async (req, res)=>{
let {id, reviewId} = req.params;
await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success", "Reviews deleted");
res.redirect(`/listing/${id}`);
};
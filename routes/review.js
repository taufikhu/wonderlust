const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const { userLogin } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

const validateReview = (req, res, next)=>{
    const {error}= reviewSchema.validate(req.body);
    
if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new expressError(400, errMsg);
}else{
    next();
}
};

router.post("/reviews", 
    userLogin,
validateReview, 
wrapAsync(reviewController.reviewCreater));

router.delete("/reviews/:reviewId",wrapAsync (reviewController.reviewDelete));

module.exports = router;
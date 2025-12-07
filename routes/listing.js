const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const { userLogin } = require("../middleware.js");
const listingConstroller = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });



const validateListing = (req, res, next)=>{
    const {error}= listingSchema.validate(req.body);
    
if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new expressError(400, errMsg);
}else{
    next();
}
};

//Index Route
router.route("/")
.get(wrapAsync(listingConstroller.Index))
.post(userLogin,upload.single("listing[image]"), validateListing, wrapAsync(listingConstroller.createNewListing));

// Search rout
router.get("/search",listingConstroller.search);
//New Route
router.get("/new", userLogin,listingConstroller.renderNewForm);

//Show route
router
.route("/:id")
.get(wrapAsync(listingConstroller.showForm))
.put(userLogin, upload.single("listing[image]"),validateListing, wrapAsync(listingConstroller.editListing))
.delete(userLogin, wrapAsync(listingConstroller.deleteListing));
//goto Edit Route
router.get("/:id/edit", userLogin, wrapAsync(listingConstroller.renderEditForm));

module.exports = router;

//want to understand the code go to the (phase 3, part a)
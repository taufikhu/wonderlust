const Listing = require("../models/listing");

//Index Route
module.exports.Index = async (req, res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", {allListing});
};

//New Route
module.exports.renderNewForm = (req, res)=>{
    res.render("listing/new.ejs");
};
//Search listing
// Search listing
module.exports.search = async (req, res) => {
    let { q } = req.query;

    if (!q || q.trim().length === 0) {
        return res.redirect("/listing");
    }

    let listings = await Listing.find({
        country: { $regex: q, $options: "i" }
    });

    // No result
    if (listings.length === 0) {
        req.flash("error", "No listing found");
        return res.redirect("/listing");
    }

    // Only 1 result → open show page
    if (listings.length === 1) {
        return res.redirect(`/listing/${listings[0]._id}`);
    }

    // Multiple results → show list page
    res.render("listing/searchResults", { listing: listings, q });
};

//Show Route 
module.exports.showForm = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path: "reviews",                     //Using populate, it will show the review from database
        populate:{
            path: "author"           //Nested populate for reviews author. 
        },
    })
    .populate("owner");                 // same gose for owner 
    if(!listing){
         req.flash("error", "listing does not exist");
         return res.redirect("/listing"); 
    };
    console.log(listing);
res.render("listing/show.ejs", {listing});
};

// gotop Edit route
module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
     if(!listing){
         req.flash("error", "listing does not exist");
         return res.redirect("/listing"); 
    };
    res.render("listing/edit.ejs",{listing});
};

//Create new Listing
module.exports.createNewListing = async (req, res, next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
     let newListing =new Listing(req.body.listing);
     newListing.owner = req.user._id; 
     newListing.image =  {url, filename};
     await newListing.save();
     req.flash("success", "New listing created");
    res.redirect("/listing");
};

//Edit listing
module.exports.editListing = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{new: true});
    if( req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success", "listing updated");
    res.redirect(`/listing/${listing._id}`);
};

//delete listings
module.exports.deleteListing = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
};
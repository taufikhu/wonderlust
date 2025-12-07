const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.user = async(req, res, next) =>{
    try{
    let {username, email, password} = req.body;
    let newUser =  new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{  // if we signup, directily goto listing.
        if(err){
            next(err);
        }
       req.flash("success", "Welcome to Wonderlust!");
        res.redirect("/listing");
    });
    }catch(e){
       req.flash("error", e.message);
       res.redirect("/signup"); 
    } 
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

module.exports.redirectloginPath = async(req, res)=>{
    req.flash("success", "Welcome back to wonderlust ");
    let redirectUrl = res.locals.redirectUrl || "/listing";  //if the path has not save in redirectUrl or listing
    res.redirect(redirectUrl);                //if user loged in redirect to same path main code has written in midd.js
};

module.exports.userLogout = (req, res)=>{
    req.logOut((err)=>{                 //logout directly
        if(err){
            next(err);
        }
        req.flash("success", "you are logout");
        res.redirect("/listing");
    });
};
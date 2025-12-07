const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync(userController.user));



router.route("/login")
.get(userController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local",    //verifying credintials that users data match or not
    {failureRedirect: "/login",  // if login fail stay on login page
        failureFlash: true,}),  
     userController.redirectloginPath  
 );

router.get("/logout", userController.userLogout);
module.exports = router;
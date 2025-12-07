module.exports.userLogin = (req, res, next)=>{
    //  console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // store the path, user want to access before login
        req.flash("error", "Please login!");
       return res.redirect("/login");
    } 
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;  // saving session in locals to access anywhere
    }
    next();
}
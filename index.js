if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}
console.log("DB URL:", process.env.ATLASDB_URL);   // ✔ correct
console.log("Session secret:", process.env.SESSION_SECRET);
const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const path = require("path");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    touchAfter: 24 * 3600,
});


store.on("error", (err)=>{
console.log("Error in mongo session store", err);
})
const sessionOption = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 3600 * 1000,
        maxAge: 7 * 24 * 3600 * 1000,
    }
};



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//const MONG_URL = "mongodb://127.0.0.1:27017/WonderLust";


app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listing", listingRouter);
app.use("/listing/:id", reviewRouter);
app.use("/", userRouter);

app.all(/.*/,(req, res, next)=>{
    next( new expressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
   const { statusCode = 500 } = err;

   if (!err.message) err.message = "Something went wrong";

    res.status(statusCode).render("error.ejs", { message: err.message });

   return;  // 🔥 IMPORTANT — STOP EXECUTION
});


app.listen(port, ()=>{
    console.log("Server running on port 8080");
});
const express = require("express");
const app = express();
const rp = require('request-promise');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require ("passport");
const LocalStrategy = require("passport-local");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

//REQUIRING ROUTES
const commentRoutes     = require("./routes/comments");
const campgroundRoutes  = require("./routes/campgrounds");
const indexRoutes       = require("./routes/index");

//DATABASE
mongoose.connect('mongodb://localhost:27017/YelpCamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//ALIMENTANDO O DATABASE (DELETE AND CREATE)
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again blah blah",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USE USER IN EVERY ROUTE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
    console.log("YelpCamp server has started!!!");
});
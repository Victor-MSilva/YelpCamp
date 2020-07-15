const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//=============
//COMMENT ROUTE
//=============

//Comments new
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//IS LOGGED IN FUNCTION
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
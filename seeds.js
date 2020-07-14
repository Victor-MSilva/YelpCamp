const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
    {
        name: "Clouds Rest",
        image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://s3.amazonaws.com/socast-superdesk/media/20200525190536/6404f2f2-e5a6-47cb-bb7a-bf11c17f715b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Fire Canion",
        image: "https://the-riotact.com/wp-content/uploads/2010/10/The-Best-Campgrounds-Near-Canberra.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campground");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added Campground");
                    Comment.create(
                        {
                            text: "This place is great but no internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;
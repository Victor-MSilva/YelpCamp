const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
        {name: "Greek see", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
        {name: "Mountain Goat's Rest", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
    ]
    res.render("campgrounds", {campgrounds:campgrounds});
});

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
    console.log("Server has started!!!");
});
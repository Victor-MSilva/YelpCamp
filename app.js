const express = require("express");
const app = express();
const rp = require('request-promise');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

let campgrounds = [
    {name: "Salmon Creek", image: "https://www.oregonlive.com/resizer/0FVk7bpZHdb--Lw10Y-443t0ylM=/450x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/DUNWFNGOAVCRLAHO4ZPTBKNJEM.jpg"},
    {name: "Granite Hill", image: "https://www.oregonlive.com/resizer/0FVk7bpZHdb--Lw10Y-443t0ylM=/450x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/DUNWFNGOAVCRLAHO4ZPTBKNJEM.jpg"},
    {name: "Mountain Goat", image: "https://www.oregonlive.com/resizer/0FVk7bpZHdb--Lw10Y-443t0ylM=/450x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/DUNWFNGOAVCRLAHO4ZPTBKNJEM.jpg"}
]


// rp('https://jsonplaceholder.typicode.com/users/1')
// .then((body) => {
//     const parsedData = JSON.parse(body);
//     console.log(parsedData.name + ' lives in ' + parsedData.address.street);
// })
// .catch((err) => {
//     console.log('Error', err);
// });


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});



const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
    console.log("YelpCamp server has started!!!");
});
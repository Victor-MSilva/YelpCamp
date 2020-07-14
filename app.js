const express = require("express");
const app = express();
const rp = require('request-promise');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/YelpCamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg",
//     description: "This is a huge granite hill, no bathrooms, no water. Beatiful granite!"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });

// let campgrounds = [
//     {name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
//     {name: "Granite Hill", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
//     {name: "Mountain Goat", image: "https://www.gannett-cdn.com/-mm-/615eb9b3dda3f2daf3ceb045278d833fb7918d51/c=0-286-5616-3459/local/-/media/2017/07/18/WIGroup/Milwaukee/636359756074681331-IMG-1848.jpg?width=3200&height=1680&fit=crop"},
//     {name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
//     {name: "Granite Hill", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
//     {name: "Mountain Goat", image: "https://www.gannett-cdn.com/-mm-/615eb9b3dda3f2daf3ceb045278d833fb7918d51/c=0-286-5616-3459/local/-/media/2017/07/18/WIGroup/Milwaukee/636359756074681331-IMG-1848.jpg?width=3200&height=1680&fit=crop"},
//     {name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
//     {name: "Granite Hill", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
//     {name: "Mountain Goat", image: "https://www.gannett-cdn.com/-mm-/615eb9b3dda3f2daf3ceb045278d833fb7918d51/c=0-286-5616-3459/local/-/media/2017/07/18/WIGroup/Milwaukee/636359756074681331-IMG-1848.jpg?width=3200&height=1680&fit=crop"}
// ]


// rp('https://jsonplaceholder.typicode.com/users/1')
// .then((body) => {
//     const parsedData = JSON.parse(body);
//     console.log(parsedData.name + ' lives in ' + parsedData.address.street);
// })
// .catch((err) => {
//     console.log('Error', err);
// });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
});
//Create
app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});
// NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
//Show
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
    console.log("YelpCamp server has started!!!");
});
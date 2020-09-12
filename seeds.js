const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

    let data = [
        {
            name: "Jungle",
            image: "https://photosforclass.com/download/flickr-7626464792",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "Desert",
            image: "https://photosforclass.com/download/flickr-2602356334",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "Bird",
            image: "https://photosforclass.com/download/flickr-7121865553",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
    ]

    function seedDB(){
        // Remove all campgrounds
        Campground.deleteMany({}, (err)=>{
            // if(err){
            //     console.log(err);
            // } 
            // console.log("removed campground");
            // // add few campground
            // data.forEach((seed)=>{
            //     Campground.create(seed, (err, campground)=>{
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added a campground");
            //             // create a comment
            //             Comment.create(
            //                 {
            //                     text: "Awesome a place, and good for you",
            //                     author: "james"
            //                 }, (err, comment)=>{
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });


    }

    module.exports = seedDB;
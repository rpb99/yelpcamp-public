const express = require('express'),
	router = express.Router(),
	Comment = require('../models/comment'),
	Campground = require('../models/campground'),
	middleware = require('../middleware');

// INDEX - show all campgrounds
router.get("/", (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allcampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {
				campgrounds: allcampgrounds,
				currentUser: req.user
			});
		}
	});
});

router.post("/", (req, res) => {
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {
		name: name,
		price: price,
		image: image,
		description: desc,
		author: author
	};
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if (err || !foundCampground) {
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {
				campground: foundCampground
			});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			res.redirect("/campgrounds");
		}
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updateCampground) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTES
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
		if (err) {
			res.redirect("/campgrounds/" + req.params.id);
		}
		Comment.deleteMany({
			_id: {
				$in: campgroundRemoved.comments
			}
		}, (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/campgrounds");
		});
	});
});

module.exports = router;
const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');

router.get("/", (req, res) => {
	res.render('landing');
});


// show register form
router.get("/register", (req, res) => {
	res.render("register");
});

// handle sign up logic
router.post("/register", (req, res) => {
	let newUser = new User({
		username: req.body.username
	});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", (req, res) => {
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {

});
// logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
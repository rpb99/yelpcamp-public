const Campground = require('../models/campground'),
  Comment = require('../models/comment');

// all the middleware goes here

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        // does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("/campgrounds");
        }
      }
    });
  } else {
    req.flash("error", "You need logged in to do that");
    res.redirect("/campgrounds");
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash("error", "Comment not found");
        res.redirect("/campgrounds/" + req.params.id);
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  } else {
    req.flash("error", "You need logged in to do that");
    res.redirect("back");
  }
}

// middleware
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need logged in to do that");
  res.redirect("/login");
}


module.exports = middlewareObj;
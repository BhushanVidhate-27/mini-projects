const express = require("express");
const router = express.Router({ mergeParams: true });
exports.router = router;
const Review = require("../model/review");
const ExpressError = require("../utils/ExpressError");
const methodOverride = require("method-override");
const { listingSchema, reviewSchema } = require("../schema");
const Listing = require("../model/listings");
const wrapAsync = require("../utils/wrap");
const { isLoggedIn, isOwner, validateListing, validateReview, isReviewAuthor } = require("../middleware");
const reviewComponents = require("../components/review");

router.post("/", validateReview, isLoggedIn, reviewComponents.postReview);

router.delete("/:id2" , isLoggedIn, isReviewAuthor, reviewComponents.delReview);

module.exports = router;
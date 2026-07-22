const Listing = require("./model/listings");
const wrapAsync = require("./utils/wrap");
const { listingSchema } = require("./schema");
const { reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./model/review");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create review!");
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you dont have permission to edit this");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((ele)=> ele.message ).join(",");
        console.log(error.details);
        throw new ExpressError(400, errorMsg);
    }else {
        next();
    }
};
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((ele)=> ele.message ).join(",");
        throw new ExpressError(400, errorMsg);
    }else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, id2 } = req.params;
    let review = await Review.findById(id2);
    if(!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "only owner can remove the review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
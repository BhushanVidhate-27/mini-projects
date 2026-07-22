const Listing = require("../model/listings");
const Review = require("../model/review");
const wrapAsync = require("../utils/wrap");

module.exports.postReview = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    console.log(req.body);
    req.flash("success", "review Created");
    res.redirect(`/listings/${id}`);
});

module.exports.delReview = wrapAsync(async (req, res, next) => {
    let { id, id2 } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: id2 } });
    await Review.findByIdAndDelete(id2);
    req.flash("success", "review deleted!");
    res.redirect(`/listings/${id}`);
});
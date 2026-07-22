const express = require("express");
const wrapAsync = require("../utils/wrap");
const Listing = require("../model/listings");

module.exports.allListings = wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

module.exports.newForm = (req, res)=>{
    res.render("listings/newForm.ejs");
};

module.exports.postNewListing = wrapAsync( async(req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    console.log(req.user);
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
});

module.exports.showSpecific = wrapAsync( async (req, res)=>{
    let { id } = req.params;
    const data = await Listing.findById(id).populate({ path: "reviews", populate: {path: "author"} }).populate("owner");
    if(!data) {
        req.flash("error", "listing you requested for does not exits");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { data, reviews : data.reviews });
});

module.exports.editForm = wrapAsync(async (req, res)=>{
    let { id } = req.params;
    const data = await Listing.findById(id);
    if(!data) {
        req.flash("error", "listing you requested for does not exits");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { id, data });
});

module.exports.edit = wrapAsync(async (req, res)=>{
    let { id } = req.params;
    let listing = Listing.findById(id);
    await Listing.findByIdAndUpdate(id, { ...listing }, { runValidators: true } );
    res.redirect(`/listings/${id}`);
});

module.exports.delete = wrapAsync(async (req, res)=>{
    let { id } = req.params;
    console.log(await Listing.findByIdAndDelete(id));
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
});
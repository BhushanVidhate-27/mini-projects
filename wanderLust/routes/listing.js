const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listings");
const wrapAsync = require("../utils/wrap");
const ExpressError = require("../utils/ExpressError");
const methodOverride = require("method-override");
const { listingSchema, reviewSchema } = require("../schema");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const Listingcomponents = require("../components/listing");

router.get("/new", isLoggedIn, Listingcomponents.newForm);//add new listing form 
router.get("/:id/edit", isLoggedIn, isOwner, Listingcomponents.editForm);//edit form req

router.route("/")
.get(Listingcomponents.allListings) //show all listing 
.post(isLoggedIn, validateListing, Listingcomponents.postNewListing); // add new listing

router.route("/:id")
.get(Listingcomponents.showSpecific)//show specific route
.put(isLoggedIn, isOwner, validateListing, Listingcomponents.edit)//edit route patch
.delete(isLoggedIn, isOwner, Listingcomponents.delete);

module.exports = router;
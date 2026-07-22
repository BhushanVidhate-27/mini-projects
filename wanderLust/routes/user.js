const express = require("express");
const router = express.Router({ mergeParams: true });
exports.router = router;
const User = require("../model/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userComponents = require("../components/user");

router.route("/signup")
.get(userComponents.signupform) // sign up form 
.post(saveRedirectUrl, userComponents.signup); // sign up

router.route("/login")
.get(userComponents.loginform) // login form 
.post(saveRedirectUrl, // login
    passport.authenticate("local",
    { failureRedirect: '/login', failureFlash: true }),
    userComponents.login);

router.get("/logout", userComponents.logout);

module.exports = router;
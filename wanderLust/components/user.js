const wrapAsync = require("../utils/wrap");

module.exports.signupform = (req, res) => {
    res.render("users/newUserForm.ejs");
};

module.exports.signup = wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let regUser = await User.register(newUser, password);
        console.log(regUser);
        req.login(regUser, (err)=>{
            if(err) return next(err);
            req.flash("success", "Welcome to wanderlust");
            return res.redirect(res.locals.redirectUrl || "/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

module.exports.loginform = (req, res) => {
    res.render("users/loginForm.ejs");
};

module.exports.login =  async (req, res) => {
        req.flash("success", "welcome back");
        return res.redirect(res.locals.redirectUrl || "/listings");
}; 

module.exports.logout = (req, res, next) => {
    req.logout((err)=>{
        if(err) return next(err);
        req.flash("success", "you are logged out successfully");
        res.redirect("/listings");
    })
};

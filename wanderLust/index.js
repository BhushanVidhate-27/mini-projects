const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listings");
const Review = require("./model/review");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrap");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const validateListing = require("./middleware");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

const port = 8080;
 
const listingsRouter = require("./routes/listing"); //routes folder
const reviewsRouter = require("./routes/review"); //routes folder
const userRouter = require("./routes/user"); //routes folder


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
const sessionOptions = {
    secret: "Mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true,
    }
};

main().then(()=>{ 
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"); 
};


app.get("/", (req, res)=>{
    res.send("Hi This is homepage");
});

app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());                           


app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.all("/{*splat}",(req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next)=>{
    let { statusCode = 500, message = "somthing went wrong" } = err;
    res.render("error.ejs", { message, err });
});

app.listen(port, ()=>{
    console.log(`server is listening on => http://localhost:${port}`);
});
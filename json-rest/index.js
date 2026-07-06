//requires
const fs = require("fs");
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
let data = require("./data/data.json");
const app = express();
let port = 8080;

//addons
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//

app.get("/", (req, res)=>{// gets all users
    res.send("This is homepage");
});

app.get("/user", (req, res)=>{// gets all users
    res.render("Home.ejs" , { data });
});
app.post("/user/:id/Edit", (req, res)=>{//edit form redirection
    let { id } = req.params;
    console.log(id);
    res.render("Edit.ejs", { id });
});
app.delete("/user/:id", (req, res)=>{
    let { id } = req.params;
    data = data.filter(user => user.id != id);
    console.log("Deleted user id is ", id);
    res.redirect("/user");
});
app.put("/user/:id", (req, res)=>{
    let { age, name } = req.body;
    let { id } = req.params;
    let user = data.find(user => user.id = id);
    if(user) {
        user.id = id;
        user.age = age;
        user.name = name;
    }
    console.log("Edited user is ", id);
    res.redirect("/user");
});

app.listen(port, ()=>{
    console.log("server started");
});
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const fs = require("fs");
let port = 8080;

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res)=> { // localhost:8080
    res.render("home.ejs");
});

app.get("/notes", (req, res)=> {// /notes
    fs.readdir("./notes", (err, files)=>{
        if(err) console.log(err);
        res.render("all.ejs", { files });
    });
});

app.get("/choice" , (req, res)=>{
    let files = fs.readdirSync("./notes", "utf-8");
    res.render("selection.ejs", { files });
});

app.post("/delete", (req, res)=>{
    let {fileName} = req.body;
    fs.unlinkSync(`./notes/${fileName}`);
    res.redirect("/");
});

app.get("/create", (req, res)=>{
    res.render("create.ejs");
});

app.get("/update", (req, res)=>{
    let {fileName} = req.query;
    let content = fs.readFileSync(`./notes/${fileName}`, "utf-8");
    res.render("edit.ejs", { content, fileName });
});

app.patch("/update", (req, res)=>{
    let {fileName} = req.query;
    let {content} = req.body;
    console.log(req.query);
    console.log(req.body);
    if(!fileName) {
        return res.send("Invalid file name");
    }
    let filepath = `./notes/${fileName}`;
    fs.writeFileSync(filepath, content);
    console.log(
        fs.readFileSync(filepath, "utf-8")
    );
    res.redirect("/notes");
});

app.post("/create", (req, res)=>{
    let { fileName } = req.body;
    if(!fileName) return res.send("filename empty ");
    let { content } = req.body;
    let path = `./notes/${fileName}`;
    fs.writeFileSync(path, content);
    res.redirect("/");
});

app.get("/notes/:fileName", (req, res)=>{ // /notes/:file
    let { fileName } = req.params;
    fs.readFile(`notes/${fileName}`, "utf-8", (err, data)=>{
        if(err)console.log(err);
        res.render("file.ejs", { data, fileName });
    })
});

app.listen(port , ()=>{
    console.log("Server started");
});

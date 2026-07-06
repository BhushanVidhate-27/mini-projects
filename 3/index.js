const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
let port = 8080;
const Message = require("./model/model.js");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//db stuff
main().then(() => {
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wa');
}

// routes
app.get("/", (req, res) => {
  res.send("server Fine");
});

// all messages => restrict access to this for private chat like wa
app.get("/msg", (req, res) => {
  try {
    Message.find({}).then((data) => {
      res.render("all.ejs", { data, me : null });
    });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// personal msg 
app.get("/msg/:me",(req,res)=>{
    let {me}=req.params;
    Message.aggregate([
    {$match:{$or:[{sender:me},{receiver:me}]}},
    {$group:{_id:{$cond:[{$eq:["$sender",me]},"$receiver","$sender"]}}}
]).then(data=>{
    res.render("personalMsg.ejs",{data,me});
});
});

//chats betn two
app.get("/msg/:i1/:i2", (req, res)=>{
  let { me } = req.query;
  let { i1, i2 } = req.params; // i1, i2 are sender or receiver 
  Message.find( { $or: [ { sender: i1, receiver: i2 }, { sender: i2, receiver: i1 } ]}).then((data)=>{
    res.render("singleChat.ejs", { data , me});
  }).catch((err)=>{
    console.log(err);
  });

});

//put => get("/msg/:id/edit") + patch("/msg/:id")
app.get("/msg/:id/edit", (req, res)=>{
  let { id } = req.params;
  console.log(id);
  res.render("editForm.ejs", { id });
});

app.patch("/msg/:id", (req, res)=>{
  let { id } = req.params;
  let { newmessage } = req.body;
  Message.updateOne({_id : id }, { message : newmessage }).then(()=>{
    res.redirect("/msg");
  });
});

//delete
app.delete("/msg/:id", (req, res)=>{
  let { id } = req.params;
  Message.deleteOne({_id : id }).then(()=>{
    res.redirect("/msg");
  });
});

//8080
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});

const mongoose = require("mongoose");
const Listing = require("../model/listings");
const initdata = require("./data");

main().then(()=>{
    console.log("connected to db");    
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"); 
}

async function init() {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "6a5dd49c2b2480033185017b" }));
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "6a5dd49c2b2480033185017b" }));
    await Listing.insertMany(initdata.data);
    console.log("initialization success");
}
init();
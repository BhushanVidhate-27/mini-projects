const mongoose = require("mongoose");
const Message = require("../model/model.js");
const data = require("./data.js");

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wa');
        await Message.deleteMany({});
        await Message.insertMany(data);
        console.log("data inserted");
        await mongoose.connection.close();
    }catch(err) {
        console.log(err);
    }
}
main();
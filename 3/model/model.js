const mongoose = require("mongoose");

const schema = mongoose.Schema;

let messageSchema = new schema({
    sender : {
        type : String, 
        required : [true, "Sender is required"]
    },
    receiver : {
        type : String, 
        required : [true, "required is required"]
    }, 
    message : {
        type : String,
        default : "NULL"
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Message", messageSchema);
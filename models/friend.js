var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
    name : String , 
    content: String,
    date: { type : Date, default: Date.now  },
});

module.exports = mongoose.model("friend", FriendSchema);

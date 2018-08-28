var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    date: { type : Date, default: Date.now  },
});

module.exports = mongoose.model("user", UserSchema);

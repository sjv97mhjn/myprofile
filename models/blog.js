var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
    content: String,
    date: { type : Date, default: Date.now  },
});

module.exports = mongoose.model("blog", BlogSchema);

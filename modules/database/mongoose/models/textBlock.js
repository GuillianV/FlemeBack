let mongoose = require("../mongooseInit")
var sanitize = require('mongo-sanitize');

//TextBlock Schema
const TextBlockSchema = new mongoose.Schema({
    id: Number,
    text: String,

});

//Create Model
const TextBlock = mongoose.model('TextBlock', TextBlockSchema);
module.exports = TextBlock;
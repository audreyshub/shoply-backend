var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
   name: String,
   quantity: Number,
   price: Number,
   check: { type: Boolean, default: false }
});

module.exports= mongoose.model('item', itemSchema);
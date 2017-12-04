var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   name: String,
   address: String
});

module.exports= mongoose.model('user', userSchema);
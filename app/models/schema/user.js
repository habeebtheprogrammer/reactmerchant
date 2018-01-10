// getting-started.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    Password: String,
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, unique: true, sparse: true, trim: true },
    phone: { type: String, unique: true, sparse: true },
});



userSchema.pre('save', function(callback) {

    callback();
});




var User = mongoose.model('User', userSchema);



module.exports = User;
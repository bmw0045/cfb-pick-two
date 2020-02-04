const mongoose = require('mongoose');

var Schema = mongoose.Schema;
let userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    password2:{
        type: String,
        required: true
    }

});

var User = mongoose.model('User', userSchema);
module.exports = User;
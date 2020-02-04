const mongoose = require('mongoose');

var Schema = mongoose.Schema;
let teamSchema = new Schema({
    rank:{
        type: Number,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    conference:{
        type: String,
        required: true
    },
    firstPlaceVotes:{
        type: Number,
        required: true
    },
    points:{
        type: Number,
        required: true
    }

});

var team = mongoose.model('team', teamSchema);
module.exports = team;
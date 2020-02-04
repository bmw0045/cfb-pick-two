const express = require('express');
const request = require('request');
const router = express.Router();
const session = require('express-session');
var app = express();

let team = require('../models/teams');

router.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

//url for API
var url = 'https://api.collegefootballdata.com/rankings?year=2019&week=10&seasonType=regular'
request(url,(err, res, body) => {
    if(!err && res.statusCode == 200) {
        //Parse the JSON
        var obj = JSON.parse(body);
        //Create array for JSON to load into
        var teams = [];
        //Find the JSON we want
        var rankings = obj[0].polls[1].ranks;
        //Add each JSON object (team) to the array of teams
        for (var i = 0; i < rankings.length; i++) {
            var t = rankings[i];
            var currTeam = new team ({
                rank: t.rank,
                school: t.school,
                conference: t.conference,
                firstPlaceVotes: t.firstPlaceVotes,
                points: t.points
            });
        }
        console.log(teams[23]);
    }
});

//let htmlTableRows = '';
//teams.rows.forEach((row) => {
    //htmlTableRows += ''
//})
//login Form
app.get('/rankings', function(req, res){
    res.render('rankings', {data: teams});
});

module.exports = app;
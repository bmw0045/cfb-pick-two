const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const request = require('request');

//mongoose.connect('mongodb+srv://bmw0045:Publicvoid27@cfbdb-7xxrz.mongodb.net/test?retryWrites=true&w=majority')
//init app
const app = express();
//Router use & init
const router = express.Router();
app.use("/", router);

const mongoDB = 'mongodb+srv://bmw0045:Publicvoid27@cfbdb-7xxrz.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

//load mongo
mongoose.connect(mongoDB, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
    app.listen(4000, () => {
        console.log('db listening on 4000...')
        })
});

let db = mongoose.connection;

db.once('open', function(){
    console.log('Connected to MongoDB');
});

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
            teams.push(currTeam);
        }
        console.log(teams[23]);
    }
});

//Load Models
let User = require('./models/users');
let team = require('./models/teams');
let scraper = require('./routes/scraper');
//let login = require('./routes/login');
let rankings = require('./routes/rankings');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(rankings);

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('src'));

//home route
app.get('/', function(req, res){
    res.render('index')
});

//register route
app.get('/register', function(req, res){
    res.render('register')
});
/*
app.get('/rankings', function(req, res){
    res.render('rankings', {data: teams});
});
*/
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login/success', function (req, res){
    const userData = {
        email: req.body.email,
        password: req.body.password,
    }

    //if ()
})
//POST route
app.post('/register/success', function (req, res) {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,

    };

    User.create(userData, (error, User) => {
        if (error) {
            return next(error);
        } else {
            console.log(userData);
            return res.redirect('/');
        }
    });
   // });
});

app.listen(3000, function(){
    console.log('////////// W E L C O M E //////////')
    console.log('PickEm running on localhost:3000...')
    console.log('///////////////////////////////////')
});
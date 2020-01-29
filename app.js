const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');


//init app
const app = express();

//load mongo
var db
MongoClient.connect('mongodb+srv://bmw0045:Publicvoid27@cfbdb-7xxrz.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('cfbDB')
    app.listen(4000, () => {
        console.log('db listening on 4000...')
        })
});
//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('src'));

//home route
app.get('/', function(req, res){
    res.render('index')
});

app.listen(3000, function(){
    console.log('////////// W E L C O M E //////////')
    console.log('PickEm running on localhost:3000...')
    console.log('///////////////////////////////////')
});
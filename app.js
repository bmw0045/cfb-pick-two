const express = require('express');
const path = require('path');

//init app
const app = express();

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
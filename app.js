const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello World')
});

app.listen(3000, function(){
    console.log('////////// W E L C O M E //////////')
    console.log('PickEm running on localhost:3000...')
    console.log('///////////////////////////////////')
});
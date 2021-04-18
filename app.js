const express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');

var publicRouter = require('./routes/public');

app.get('/', (req, res) =>{
    res.sendFile(__dirname+"/views/login.html");
});


app.use('/', publicRouter);



var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s, host, port')
})
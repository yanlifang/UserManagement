const express = require('express');
var app = express();

app.get('/', (req, res) =>{
    res.send('User Magement');
});


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})
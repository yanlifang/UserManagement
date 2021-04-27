const express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { doesNotMatch } = require('assert');
require('./passport-setup.js');
require('./fb.passport.js');



app.use(express.json());

var publicRouter = require('./routes/public');

app.get('/', (req, res) =>{
    res.sendFile(__dirname+"/views/login.html");
});

app.use('/', publicRouter);

app.use(express.urlencoded({extended: true })); 

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


const isLoggedIN = (req, res, next) =>{
    if(req.user){
      next();
    }else{
      res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => res.send('You are not logged in!'));
app.get('/failed', (req, res) => res.send('You failed to login!'));

app.get('/success', (req, res) => res.send(`Welcome ${req.user.displayName}!`));

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/success');
  });

app.get('/logout', (req, res) =>{
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.get("/fbsuccess", (req, res) => res.send(`Welcome ${req.user.displayName}!`));

//facebook authenticate 
app.get("/auth/facebook", passport.authenticate('facebook', {scope: ['profile', 'email']}));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    
    failureRedirect: "/fail"
  }),
  function(req, res){
    res.redirect('/fbsuccess');
  }
);

app.get("/fail", (req, res) => {
  res.send("Failed attempt");
});




var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s, host, port')
});


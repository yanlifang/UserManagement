//reference for deploy https://us-east-2.console.aws.amazon.com/codesuite/codedeploy/applications?region=us-east-2
const express = require('express');
const app = express();
const session = require('express-session');
const config = require('./config');
//var router = express.Router();
var router = express();
require('./fb.passport.js');
require('./google.passport.js');
require('./twitter.passport');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));


app.get('/', function(req, res) {
  res.render('pages/auth');
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));


var passport = require('passport');
 
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) =>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

 

app.get('/success', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);
  //res.render('pages/success', {user: userProfile});

});

app.get('/fail', (req, res) => res.send("error logging in"));
 

app.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});



/*router.set('view engine', 'ejs');

router.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
  
/*app.get('/login', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);
  });*/
  



app.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : ['profile', 'email'] }));
 
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});



app.get('/auth/twitter', 
  passport.authenticate('twitter', { scope : ['profile', 'email'] }));
 
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});


app.get('/auth/linkedin', 
  passport.authenticate('linkedin', { scope : ['profile', 'email'] }));
 
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('/');
});


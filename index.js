//reference for deploy https://us-east-2.console.aws.amazon.com/codesuite/codedeploy/applications?region=us-east-2
const express = require('express');
const app = express();
const session = require('express-session');
const config = require('./config');

require('./passport/fb.passport.js');
require('./passport/google.passport');
require('./passport/twitter.passport');
require('./passport/linkedin.passport');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

var passport = require('passport');
 
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('pages/auth');
});


const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));
 

app.get('/profile', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);

});

app.get('/fail', (req, res) =>{
  res.send("Incorrect email or password!");
});

//google
app.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/google/callback', 
  passport.authenticate('google', 
  { 
    failureRedirect: '/fail', }),
    //successRedirect: '/profile'}));
    function(req, res) {
      res.redirect('/https://naughty-hoover-9fe66f.netlify.app');
    }
);


//facebook 
app.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : ['profile', 'email'] }));
 
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});


//twitter 
app.get('/auth/twitter', 
  passport.authenticate('twitter', { scope : ['profile', 'email'] }));
 
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});

app.get('/auth/linkedin', 
  passport.authenticate('linkedin', { scope : ['r_emailaddress', 'r_liteprofile'] }));
 
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { 
      failureRedirect: '/fail',
      successRedirect: '/https://naughty-hoover-9fe66f.netlify.app'
}));



app.get('/googlelogout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('https://accounts.google.com/logout');
});

app.get('/fblogout', (req, res)=>{
req.logout();
req.session.destroy();
res.redirect('https://facebook.com/logout');
});

app.get('/linkedinlogout', (req, res)=>{
req.logout();
req.session.destroy();
res.redirect('https://www.linkedin.com/logout');
});

app.get('/twitterlogout', (req, res)=>{
req.logout();
req.session.destroy();
res.redirect('https://twitter.com/logout');
});
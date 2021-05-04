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
 

app.get('/success', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);
  //res.render('pages/success', {user: userProfile});

});
//app.get('/error', (req, res) => res.send("error logging in"));
 
passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

//app.use('/', route);
//app.use(json());
/*  Google AUTH  */
 
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
/*var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));*/
 

app.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });


app.get('/logout', (req, res) =>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});




/*router.set('view engine', 'ejs');

router.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));



router.get('/', function(req, res) {
  res.render('pages/auth');
});


var passport = require('passport');
var userProfile;

router.use(passport.initialize());
router.use(passport.session());

router.get('/', function (req, res) {
  res.render('pages/auth'); // load the index.ejs file
});*/


/*var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
    new FacebookStrategy(
      {
          clientID: config.facebookAuth.clientID,
          clientSecret: config.facebookAuth.clientSecret,
          callbackURL: config.facebookAuth.callbackURL
      }, function(accessToken, refreshToken, profile, done){
          return done(null, profile);
      }
    ));*/
  


/*app.get('/login', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);
  });*/
  
app.get('/fail', (req, res) => res.send("error logging in"));


app.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : ['profile', 'email'] }));
 
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('/success');
});



app.get('/auth/twitter', 
  passport.authenticate('twitter', { scope : ['profile', 'email'] }));
 
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('/');
});


app.get('/auth/linkedin', 
  passport.authenticate('linkedin', { scope : ['profile', 'email'] }));
 
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    //req.session.destroy();
    // Successful authentication, redirect success.
    res.redirect('/success');
});


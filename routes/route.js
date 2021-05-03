const passport = require('passport');
const express = require('express');
var session = require('express-session');
var router = express.Router();


//router.use(passport.initialize());
//router.use(passport.session());

//router.get('/', function (req, res) {
  //res.render('views/login.html'); // load the index.ejs file
//});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('../views/pages/auth.ejs', {
    user: req.user // get the user out of session and pass to template
  });
});

router.get('/error', isLoggedIn, function (req, res) {
  res.render('Failed to login');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;
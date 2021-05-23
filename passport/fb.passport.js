var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
    }, function(accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
  ));

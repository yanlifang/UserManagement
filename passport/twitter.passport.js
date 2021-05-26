var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new TwitterStrategy(
    {
        consumerKey: config.twitterAuth.clientID,
        consumerSecret: config.twitterAuth.clientSecret,
        callbackURL: config.twitterAuth.callbackURL,
        proxy: true
    }, function(accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
  ));


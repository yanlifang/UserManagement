var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2');
const config = require('../config');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new LinkedInStrategy(
    {
        consumerKey: config.linkedinAuth.clientID,
        consumerSecret: config.linkedinAuth.clientSecret,
        callbackURL: config.linkedinAuth.callbackURL
    }, function(token, tokenSecret, profile, done){
        return done(null, profile);
    }
  ));


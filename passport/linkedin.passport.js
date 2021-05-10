var passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
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
        clientID: config.linkedinAuth.clientID,
        clientSecret: config.linkedinAuth.clientSecret,
        callbackURL: config.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_liteprofile'],
    }, function(token, tokenSecret, profile, done){
        return done(null, profile);
    }
  ));

 

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../config');

var userProfile;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
        //user.findOrCreate({ googleId: profile.id }, function (err, user) {
         //return done(err, user);
         userProfile = profile;
         return done(null, profile);
  }
));

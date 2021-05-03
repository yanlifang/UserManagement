var passport = require('passport');
var LoginWithTwitter = require('login-with-twitter');
const config = require('./config');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new LoginWithTwitter(
    {
        consumerKey: config.twitterAuth.clientID,
        consumerSecret: config.twitterAuth.clientSecret,
        callbackURL: config.twitterAuth.callbackURL
    }, function(accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
  ));


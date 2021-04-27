var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

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
    clientID: "24985356847-tn2n4bt492rhusq7qj849rcq7r6jj9gp.apps.googleusercontent.com",
    clientSecret: "MLYO_Ma0T0ofPy5iTRDsPbf-",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        //user.findOrCreate({ googleId: profile.id }, function (err, user) {
         //return done(err, user);
         return done(null, profile);
       //});
  }
));
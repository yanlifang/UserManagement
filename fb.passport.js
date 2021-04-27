var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID:"3919745328141290",
      clientSecret: "18305cf046ca40b8c832476c67098e03",
      callbackURL: "http://localhost:3000/auth/facebook",
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      /*const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();*/
      done(null, profile);
    }
  )
);

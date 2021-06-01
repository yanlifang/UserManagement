//reference for deploy https://www.youtube.com/watch?v=b0g-FJ5Zbb8
//reference for deploy and configure https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-procedures.html#cnames-and-https-getting-certificates
//reference for https server https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
const express = require('express');
const fs = require('fs');
var http = require('http');
const session = require('express-session');
const config = require('./config');
const app = express();
require('./passport/fb.passport.js');
require('./passport/google.passport');
require('./passport/twitter.passport');
require('./passport/linkedin.passport');

/*const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var https = require('https');
var server = https.createServer(options, app);
server.listen(port, function(){
  console.log("Server running at https://localhost:" + port);
});*/


app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

var passport = require('passport');
const port = process.env.PORT || 3000;
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.listen(port , () => console.log('App listening on port ' + port));
 

app.get('/profile', (req, res) => {
  res.send(`Welcome ${req.user.displayName}!`);
});

app.enable("trust proxy");

app.get('/fail', (req, res) =>{
  res.send('Fail to login');
})

//google
app.get('/google', 
  //passport.authenticate('google', { scope : ['profile', 'email'] })
  passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login']}
));
 
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail', }),
    function(req, res) {
      res.cookie('name', req.user.name, { domain: 'naughty-hoover-9fe66f.netlify.app' })
      res.redirect('https://naughty-hoover-9fe66f.netlify.app');
    }
);


//facebook 
app.get('/facebook', 
  passport.authenticate('facebook', { scope : ['profile', 'email'] })
);
 
app.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    // need logic to create cookie here based off data returned from facebook authentication
    res.cookie('name', `${req.user.first_name} ${req.user.last_name}`, { domain: 'naughty-hoover-9fe66f.netlify.app' });
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});


//twitter 
app.get('/auth/twitter', 
  passport.authenticate('twitter', { scope : ['profile', 'email'] })
);
 
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/fail' }),
  function(req, res) {
    res.cookie('name', req.user.displayName, { domain: 'naughty-hoover-9fe66f.netlify.app' })
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});

app.get('/auth/linkedin', 
  passport.authenticate('linkedin', { scope : ['r_emailaddress', 'r_liteprofile'] })
);
 
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/fail' }),
  function(req, res) {
    res.cookie('name', `${req.user.firstName} ${req.user.lastName}`, { domain: 'naughty-hoover-9fe66f.netlify.app' });
    res.redirect('https://naughty-hoover-9fe66f.netlify.app')
  }
);

app.get('/googlelogout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('https://accounts.google.com/logout');
});

app.get('/fblogout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('https://facebook.com/logout');
});

app.get('/linkedinlogout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('https://www.linkedin.com/logout');
});

app.get('/twitterlogout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('https://twitter.com/logout');
});

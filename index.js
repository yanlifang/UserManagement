//reference for deploy https://us-east-2.console.aws.amazon.com/codesuite/codedeploy/applications?region=us-east-2
//reference for https server https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
const express = require('express');
const fs = require('fs');
const session = require('express-session');
const config = require('./config');
const app = express();
require('./passport/fb.passport.js');
require('./passport/google.passport');
require('./passport/twitter.passport');
require('./passport/linkedin.passport');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var https = require('https');
var server = https.createServer(options, app);
const port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log("Server running at https://localhost:" + port);
});


//


/*https.createServer(options, function(req, res){
  res.writeHead(200);
  res.end('Hello world!');
}).listen(8000);*/


app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

var passport = require('passport');
 
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('pages/auth');
});



//app.listen(port , () => console.log('App listening on port ' + port));
 

app.get('/profile', (req, res) => {
    res.send(`Welcome ${req.user.displayName}!`);

});

app.get('/fail', (req, res) =>{
  res.send("Incorrect email or password!");
});

app.enable("trust proxy");


//google
app.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/google/callback', 
  passport.authenticate('google', 
  { 
    failureRedirect: '/fail', }),
    //successRedirect: '/profile'}));
    function(req, res) {
      res.redirect('https://naughty-hoover-9fe66f.netlify.app');
    }
);


//facebook 
app.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : ['profile', 'email'] }));
 
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});


//twitter 
app.get('/auth/twitter', 
  passport.authenticate('twitter', { scope : ['profile', 'email'] }));
 
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { 
      failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('https://naughty-hoover-9fe66f.netlify.app');
});

app.get('/auth/linkedin', 
  passport.authenticate('linkedin', { scope : ['r_emailaddress', 'r_liteprofile'] }));
 
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { 
      failureRedirect: '/fail',
      successRedirect: 'https://naughty-hoover-9fe66f.netlify.app'
}));



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

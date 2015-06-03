var express = require('express');
var port = process.env.EXPRESSPORT != undefined ? process.env.EXPRESSPORT: '8000'

// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: 'APP-O9TUKAPVLALU1SOJ',
  clientSecret: '0eafb938-020e-45a6-a148-3c222171d9d8',
  site: 'https://sandbox.orcid.org',
  tokenPath:'https://api.sandbox.orcid.org/oauth/token'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);

// Build authorization oauth2 URI
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:8000/callback',
  scope: '/authenticate',
  state: 'nope'
});

// Init express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
  
// Index page 
app.get('/', function(req, res) {
  res.render('pages/index', {
    'authorization_uri': authorization_uri
  });
});

// Get the access token object (the authorization code is given from the previous step).
app.get('/callback', function(req, res) {
  var token;
  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:8000/callback'
  }, function(error, result){
    if (error) {
      // Error page
      res.render('pages/error', {
        'error': JSON.stringify(error, null, 4)
      });
    } else {
      // Token Page
      token = oauth2.accessToken.create(result);
      res.render('pages/token', {
        'token': JSON.stringify(token, null, 4)
      })
    }
  });
});

app.listen(port, function (){
  console.log('server started on ' + port);
});

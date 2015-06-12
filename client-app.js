var express = require('express'), 
  config = require('./helpers/config'),
  request = require('request'),
  querystring = require("querystring"),
  httpLogging = require('./helpers/http-logging');
  
var app = express(); // Init express
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(config.PORT, config.SERVER_IP, function () { // Start express
  console.log('server started on ' + config.PORT);
});

var oauth2 = require('simple-oauth2')({ // Initialize the OAuth2 Library
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  site: config.AUTH_SITE,
  tokenPath: config.TOKEN_PATH,
});

var authorization_uri = oauth2.authCode.authorizeURL({ // Build Auth URI
  site: config.AUTH_SITE,
  redirect_uri: config.REDIRECT_URI,
  scope: '/authenticate /activities/update',
});

app.get('/', function(req, res) { // Index page 
  res.render('pages/index', {'authorization_uri': authorization_uri});
});

app.get('/callback', function(req, res) { // Redeem code URL
  oauth2.authCode.getToken({
    code: req.query.code,
  }, function(error, result) {
    if (error == null) // No errors! we have a token :-)
      res.render('pages/token', { 
        'token': oauth2.accessToken.create(result), 
        'config': config,
        'authorization_uri': authorization_uri,     
      });
    else // Handle error
      if (req.query.error == 'access_denied') // User denied access
        res.render('pages/access_denied', { 'error': error });      
      else // General Error page
        res.render('pages/error', { 'error': error });
  });
});

app.get('/twoStep', function(req, res) {

  // function to call after making request
  var credentialsCallback = function(error, response, body) {
    if (error == null) // No errors! we have a token :-)
      res.render('pages/token', { 'body': JSON.parse(body) });
    else // handle error
      res.render('pages/error', { 'error': error });
  };

  // request configuration 
  var credentialsReq = {
    url: 'https://api.sandbox.orcid.org/oauth/token',
    method: 'post',
    body: querystring.stringify({
      'scope': '/read-public',
      'grant_type': 'client_credentials',
      'client_id': config.CLIENT_ID,
      'client_secret': config.CLIENT_SECRET
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  }

  //making request for client credentials
  request(credentialsReq, credentialsCallback);
});
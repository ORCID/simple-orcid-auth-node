var express = require('express'), 
  config = require('./helpers/config'),
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
      res.render('pages/token', { 'token': oauth2.accessToken.create(result) });
    else // Handle error
      if (req.query.error == 'access_denied') // User denied access
        res.render('pages/access_denied', { 'error': error });      
      else // General Error page
        res.render('pages/error', { 'error': error });
  });
});

app.get('/twoStep', function(req, res) {
  oauth2.client.getToken({scope: '/read-public'}, function(error, result) {
    if (error == null) // No errors! we have a token :-)
      res.render('pages/token', { 'token': oauth2.accessToken.create(result) });
    else // handle error
      res.render('pages/error', { 'error': error });
  });
});
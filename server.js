var express = require('express'), 
  config = require('./config.js');

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  site: config.AUTH_SITE,
  tokenPath: config.TOKEN_PATH
});

// Build authorization Oauth2 URI
var authorization_uri = oauth2.authCode.authorizeURL({
  site: config.AUTH_SITE,
  redirect_uri: config.REDIRECT_URI,
  scope: '/authenticate /activities/update',
  state: 'nope'
});

// Init express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
  
// Index page 
app.get('/', function(req, res) {
  res.render('pages/index', {'authorization_uri': authorization_uri});
});

// Get the access token object (the authorization code is given from the previous step).
app.get('/callback', function(req, res) {
  var token;
  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: config.REDIRECT_URI
  }, function(error, result){
    if (error)
      // check for access_denied param
      if (req.query.error == 'access_denied')
        // User denied access
        res.render('pages/access_denied', {
          'error': JSON.stringify(error, null, 2)
        });      
      else
        // General Error page
        res.render('pages/error', {
          'error': JSON.stringify(error, null, 2)
        });
      else 
      // Token Page
      res.render('pages/token', {
        'token': JSON.stringify(oauth2.accessToken.create(result), null, 2)
      })
  });
});

app.listen(config.PORT, function () {
  console.log('server started on ' + config.PORT);
});
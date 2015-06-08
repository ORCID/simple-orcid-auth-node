module.exports = config = {
  PORT: '8000',
  CLIENT_ID: 'APP-O9TUKAPVLALU1SOJ',
  CLIENT_SECRET: '0eafb938-020e-45a6-a148-3c222171d9d8',
  AUTH_SITE: 'https://sandbox.orcid.org',
  TOKEN_PATH: 'https://api.sandbox.orcid.org/oauth/token',
  REDIRECT_URI: 'http://localhost:8000/callback'
}

// for any config keys if they exist as environment variables overwrite
for (key in config)
	if (process.env[key] != undefined)
		config[key] = process.env[key];

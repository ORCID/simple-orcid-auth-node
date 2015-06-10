## Quickstart

### 1. Install NodeJS or Upgrade 

[Install it!](https://nodejs.org/)
or 
[Upgrade it!](http://davidwalsh.name/upgrade-nodejs)



### 2. Download Project

Download [zip file](https://github.com/rcpeters/simple-orcid-auth-node/archive/master.zip) and
 unzip.
   

### 3. Open a command prompt

* **Windows**
 
    Select `Search programs and files` type in `node.js command prompt` and select `Node.js command prompt`.
    
* **OSX**
 
    Open terminal by clicking `Search Spotlight` typing in `Terminal` and selecting Terminal.


### 4. Cd into the directory you cloned or unzipped

Depending on how you downloaded and unzipped the project.

* **Windows**

        cd Downloads/simple-orcid-auth-node-master/simple-orcid-auth-node-master

* **OSX**
 

        cd Downloads/simple-orcid-auth-node-master


### 5. Install client app node dependencies

       npm install 

### 6. (OPTIONAL) Configure credentials. 

This example is configured with default test credentials. You can optionally request your own 
sandbox credentials: 
[http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application). 
The following configuration keys can be overwritten by setting 
[environment variables](http://en.wikipedia.org/wiki/Environment_variable):

* CLIENT_ID - Client id issued by ORCID.
* CLIENT_SECRET - Client secret issued by ORCID
* AUTH_SITE - https://sandbox.orcid.org or https://orcid.org
* TOKEN_PATH - https://api.sandbox.orcid.org/oauth/token, https://pub.sandbox.orcid.org/oauth/token,
* REDIRECT_URI - Link use is sent back to with OAuth2 authorization code.


### 7. Start client application.

       node client-app.js

### 8. Open localhost [http://localhost:8000/](http://localhost:8000/)
You should have the a sample client application running on your local machine!

## Finally you can also see this code running on a live machine:

[https://simpleorcidauthnode-rcpetersorcid.rhcloud.com/](https://simpleorcidauthnode-rcpetersorcid.rhcloud.com/)

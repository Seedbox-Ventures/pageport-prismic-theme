# pageport Prismic theme

##About

##Prerequisites

### node.js and npm
To make sure this project will work, you'll need to have [Node.js](https://nodejs.org/en/) installed on your machine. Follow the instructions [here](https://nodejs.org/en/) if you don't already have it installed. Or use homebrew on mac.

###Prismic CLI
After node.js and npm is installed, install prismic-cli globally:
```
npm i -g prismic-cli
```
##Getting started
Setup the project by using the prismic-cli theme command
```
prismic theme --theme-url https://github.com/Seedbox-Ventures/pageport-prismic-theme
```
### Secure the prismic api
Go to https://prismic.io and navigate to your repository.
Select the cog icon at the bottom and navigate to "API & Security".
Select "Private API - Require an access token for any request" and click "Change the API visibility".

####Generate an Access Token
Go to "Generate an Access Token" in the API & Security Section  
Choose an application name.  
The callback URL can be left empty for now.  
Click "Create this application"  
Create permanent Access tokens.

###Create the .env files

.env.development with
```
PRISMIC_REPO_NAME=<prismic-repo-name>
PRISMIC_API_KEY=<prismic-preview-api-key>
GATSBY_PRISMIC_REPO_NAME=<prismic-repo-name>
GATSBY_PRISMIC_API_KEY=<prismic-preview-api-key>
```
.env.production with
```
PRISMIC_REPO_NAME=<prismic-repo-name>
PRISMIC_API_KEY=<prismic-production-api-key>
```

##Setup Prismic Preview
Login to https://prismic.io and go to your repository.  
Select the cog icon at the bottom to navigate to the preferences.  
Select "Preview"  

Here you can generate multiple previews. For now set  
Site Name: "Local Dev"  
Domain for your Application: https://localhost:8000  
Leave link resolver empty  
Click "Create my Preview"

##Setup Gatbsby Cloud
//To be done

## Built With

- [Prismic](https://prismic.io/) - API-based content management system
- [Gatsby](https://www.gatsbyjs.org/) - React based framework for building websites

## License

This setup is currently only for the use in projects of Seedbox Ventures GmbH

Copyright 2021 Seedbox Ventures GmbH (https://seedbox-ventures.com).

# TCSS545 Final Project

## Project Overview


### Project Architecture

- Client: React Native
- Server: NodeJS (with Express web framework)
- Database: ...



### Database Designs


### Use Cases 

Example:

------------

## How to run the Server
In the terminal:
- Navigate to the server directory: `cd server`
- Run: `npm install` (you only need to execute this for the first time or whenever new dependency is added)
- Start the app: `npm start`
- Go to your browser: `http://localhost:8080/`

> Note: Port number and server IP address can be updated in: `./server/bin/www`

> Read `README` under `server` directory for more details.

## How to run the Client
In another terminal:
- Navigate to the client directory: `cd client`
- Run `npm install` to install all dependencies.
- Run `npm start` to start the app
- Run on iOS: `react-native run-ios`
- Run on Android: `react-native run-android`

> Read `README` under `client` directory for more details.
 
-----

## Useful CLI commmands With Heroku:

Both client and server code are currently deployed to Heroku: `https://vast-bastion-59857.herokuapp.com/`

- Push the latest code from master branch to Heroku: `git subtree push --prefix server heroku master`
- Access the front-end of the NodeJS application: `heroku open`
- Restart the server: `heroku restart`
- Display recent logs output: `heroku logs`
> See here for more commands on how to monitor heroku logs: [Heroku Log Commands](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-logs)

> View all Heroku commands: [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli-commands)


----
## Screenshot

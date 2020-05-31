## Building and Runing Server:

In the terminal:

- Navigate to root server directory
- Run: `npm install` (you only need to execute this for the first time or whenever new dependency is added)
- Start the app: `npm start`
- Go to your browser: `http://localhost:8080/`
 
-----

## Useful CLI commmands With Heroku:

Both client and server code are currently deployed to Heroku: `https://vast-bastion-59857.herokuapp.com/`

- Push the latest code from master branch to Heroku: `git subtree push --prefix server heroku master`
- Access the front-end of the NodeJS application: `heroku open`
- Restart the server: `heroku restart`
- Display recent logs output: `heroku logs`
> See here for more commands on how to monitor heroku logs: [Heroku Log Commands](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-logs)

> View all Heroku commands: [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli-commands)

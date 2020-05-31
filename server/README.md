## Overview of Project Structure

```
├── bin
│   ├── wwww
├── controllers
├── routes
├── views
├── app.js
│
```

> Note: Only important files and directories are listed in the project structure above. When you download the source code of the project, you will see additional files.

- `bin/www`: contains configuration settings and listeners to handle server connection (Note that this file is auto-generated when we first created Node.js app)

- `controllers`: contains business logic for HTTP request/response handling

- `routes`: contains the routes for all the APIs endpoints

- `views`: contains front-end code of the web application (Note that we don't implement front-end in Node.js as we are building a mobile app for this project. For front-end code, please refer to [client](https://github.com/putthidaSR/Your-Recipe-Mobile-App/tree/master/client) directory)

- `app.js`: refers to the entry of the server to load libraries/modules and check server connection (Note that this file is auto-generated when we first created Node.js app)

----

### Dependency Installation
- Node.js (at least v12)

### Building and Runing Server Locally:

In the terminal:

- Navigate to root of server directory
- Run: `npm install` (you only need to execute this for the first time or whenever new dependency is added)
- Start the app: `npm start`
- Go to your browser: `http://localhost:8080/`

> You can edit the port number in `/bin/www

> NOTE: The server code is independent from the client side, but not vice-versa. If you want to run/test the front-end code, the server must be up and running. 
 
-----

### Developer Notes

Both client and server code are currently deployed to Heroku: `https://vast-bastion-59857.herokuapp.com/`
The front-end code from client directory is not neccessary to deploy to Heroku, but any changes to the server side code must be deployed.

- Push the latest code from master branch to Heroku: `git subtree push --prefix server heroku master`
- Access the front-end of the NodeJS application: `heroku open`
- Restart the server: `heroku restart`
- Display recent logs output: `heroku logs`
> See here for more commands on how to monitor heroku logs: [Heroku Log Commands](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-logs)

> View all Heroku commands: [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli-commands)

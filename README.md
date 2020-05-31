# TCSS545 Final Project

## Project Structure Overview
```
├── assets
├── client
│   ├── ios
│   ├── android
│   ├── src
│   ├── index.js
│   ├── package.json
├── server
│   ├── controllers
│   ├── routes
│   ├── views
│   ├── app.js
│
```

> See `README` under `client` directory and `server` directory for more details.

-----

### Project Architecture
![ProjectArchitecture](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/diagrams/project-architecture.png)

#### Our Technology Stack 
- **Front-End:** [React Native](https://reactnative.dev/)
- **Back-End:** [Node.js](https://nodejs.org/en/) (with [Express.js](https://expressjs.com/) web framework)
- **Database:** [Azure Database For MySQL](https://azure.microsoft.com/en-us/services/mysql/)
- **Cloud Deployment (PaaS):** [Heroku](https://devcenter.heroku.com/start)

-----

### Database Designs
![ERDiagram](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/diagrams/ER-diagram.png)

-----

## How to run the Server
In the terminal:
- Navigate to the server directory: `cd server`
- Run: `npm install` (you only need to execute this for the first time or whenever new dependency is added)
- Start the app: `npm start`
- Go to your browser: `http://localhost:8080/`

> Note: Port number and server IP address can be updated in: `./server/bin/www`

> See `README` under `server` directory for more details.

## How to run the Client
In another terminal:
- Navigate to the client directory: `cd client`
- Run `npm install` to install all dependencies.
- Run `npm start` to start the app
- Run on iOS: `react-native run-ios`
- Run on Android: `react-native run-android`

> See `README` under `client` directory for more details.
 
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
## Application Screenshots


| Sign-up | Sign-in | Homepage | User Account |
| :------: | :--------: | :--------: | :-----------: |
| ![sign-up](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/1%20-%20signup.png) | ![sign-in](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/2%20-%20signin.png) | ![homepage](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/3%20-%20homepage.png) |![account](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/4%20-%20accountScreen.png) |

| Post a New Recipe | Post a New Recipe | Upload Recipe | View All Recipes A Current Logged-in user Posted|
| :------: | :--------: | :--------: | :-----------: |
| ![post-recipe1](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/5%20-%20post%20recipe1.png) | ![post-recipe2](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/6%20-%20postrecipe2.png) | ![upload](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/7%20-%20uploadrecipe.png) |![view-recipe](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/8%20-%20view%20posted%20recipes.png) |

| View Recipe Full Details | Edit Recipe Name | Recipe With Updated Name | Delete Recipe |
| :------: | :--------: | :--------: | :-----------: |
| ![full-details](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/9%20-%20view%20full%20details.png) | ![edit-recipe-name](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/10%20-%20editRecipe.png) | ![new-recipe-name](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/11%20-%20new%20name.png) |![delete-recipe](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/12%20-%20deleterecipe.png) |

| Search Recipes From Any Users | Search Recipes From Any Users | View Recipe Full Details | |
| :------: | :--------: | :--------: | :-----------: |
| ![search-recipe-no-result](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/15%20-%20searchNoResults.png) | ![search-with-results](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/13%20-%20search%20recipe.png) | ![search-full-detail](https://github.com/putthidaSR/Your-Recipe-Mobile-App/blob/master/assets/screenshots/14%20-%20searchfulldeitals.png) | |



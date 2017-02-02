# Goaltastic
[![Build Status](https://travis-ci.org/devonhackley/goaltastic.svg?branch=master)](https://travis-ci.org/devonhackley/goaltastic)

## Description
A REST API for where users can make **POST**, **GET**, **PUT**, and **DELETE** requests to `/api/users` This lab we use **MongoDB** with **Mongoose.js**.

## App directory
- db directory (for MongoDB to create collection and documents)
- lib directory (empty)
- model directory (user.js, goal.js, milestone.js, task.js)
- node_modules (Once you npm install this will be created)
- routes (user-route.js , goal-route.js, task-route.js, milestone-route.js) - this is for operations of CRUD)
- test (mock-env.js - for mock environment variables, user-route-test.js, milestone-route-test.js, task-route-test.js, goal-route-test.js - Mocha and Chai are used to test and expect results using our applications resources)
- **server.js** -- starts the server and creates an instance of a router for the superheroes API

# Usage
## In your terminal
- After cloning directory run `npm install` to install all the required dependancies.
```
npm install
```
- Create a `.env` in the root directory this will have you environment variables.
```
PORT=3000
MONGODB_URI=mongodb://localhost/dev
```
- To start the mongo server dedicate one of terminal window to this and type.

  **NOTE: You must be in the root directory of this application to start this server correctly.**
```
mongod --dbpath ./db
```
- In the second terminal tab or window, type
```
npm start
```
- nodemon will serve up port you have identified in your `.env` file.

- Lastly in a third and separate window you can make requests to the api using the following commands:
```
http POST localhost:3000/api/user name="exampleName" password="examplePW" email="example@email.com" phone="1112223333"
```
- The server will respond with a `200 OK` status and return the new item data. Note the unique ID.

- If you get `400 Bad Request` this means you didn't add all the arguments in the CLI.

- To get an array of all the user IDs currently in the data directory, make a **GET** request without an ID query:
```
http GET :3000/api/users
```
- To read a user that exists in the API, make a **GET** request with the unique ID:
***use the id from the POST request's response***
```
http GET :3000/api/users/:id
```
- To delete a user from the API, make a **DELETE** request with the unique ID:
```
http DELETE :3000/api/users/:id
```

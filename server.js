//How to start a project

//1.- npm init (npm == node package manager) -> this will init the package.json file and the project
//2.- install dependencies (express, morgan, body-parser)
//         npm install --save express
//3.- Create a basic node server file 'server.js'

const express = require('express'); //we require the express library
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Route files
const itemRoutes = require('./routes/item-routes'); //Routes step 3.- Require the routes for each file
const userRoutes = require('./routes/user-routes');

const config = require('./config');

const app = express(); //we create the server inside the app variable
const port = process.env.PORT || config.localPort; //specify the port

const db = mongoose.connection;

//Some configurations
app.use(morgan('common')); //use morgan to log
app.use(bodyParser.json()); //Parse everything as json format

//Where to serve static content
app.use( express.static('public') );

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});


//Database config
mongoose.connect(config.databaseUrl, {useMongoClient: true});
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to a database')
});

app.all('/');
app.use('/item', itemRoutes); //Routes step 4.- Use the routs with a path
app.use('/user', userRoutes);

//start our server. This means that the server will be listening to all the requests
app.listen(port, () => {
    console.log(config.serverRunningMessage + config.localPort);
});

//4.- to run the server -> node server.js
//5.- With nodemon now its nodemon server.js and will listen to any change
//6.- to run this code you will have to install all dependencies with npm install
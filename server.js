// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;
app.listen(port, ()=>{console.log(`Server is up and listening on port ${port}`)})


// Setup Server

//Post route
app.post('/addEntry', addEntry);

function addEntry(req,res){
    newEntry = {
        date: req.body.date,
        zip: req.body.zip,
        temp: req.body.weatherData.main.temp,
        climate: req.body.weatherData.weather[0].description,
        content: req.body.content
    }

    projectData.push(newEntry);
    res.send(projectData);
    console.log('Posted Entry: \n' + newEntry);
}

//Get all route
app.get('/all', getData);

function getData(req,res){
    res.send(projectData);
    console.log('Sending All Data: \n' + JSON.stringify(projectData));
}

//Get Latest Entry Route
app.get('/latest', getLatest);

function getLatest(req,res){
    const latestEntry = projectData[projectData.length - 1];
    res.send(latestEntry);
    console.log('Sending Latest Entry: ' + JSON.stringify(latestEntry));
}
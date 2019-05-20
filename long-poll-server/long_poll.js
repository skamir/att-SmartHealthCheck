'use strict';

const express = require('express');

var cors = require('cors');

const app = express();
const port = 8094;
const payload = require('./service/payload');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let longpoll = require("express-longpoll")(app);

app.locals.my_longpoll = longpoll;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Creates app.get("/poll") for the long poll
//longpoll.create("/poll");
 
// Publishes data to all clients long polling /poll endpoint
// You need to call this AFTER you make a GET request to /poll
//longpoll.publish("/poll", data);
 
// Publish every 5 seconds
//setInterval(function () { 
    //longpoll.publish("/poll", data);
//}, 5000);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/service', payload);

app.listen(port, (err) => {
  if (err)
    return console.log(err);

  console.log(`Listening on ${port}`);
});
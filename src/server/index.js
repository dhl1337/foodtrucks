'use strict';
// Dependencies
import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import config from './configs/config'

// Express
let app = express();

mongoose.connect(config.db.url);
mongoose.connection.once('open', () => console.log("Successfully connected to mongodb"));

require('./config/passport.js')(passport);

// Express Middleware
app.use(expressSession(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));


// Socket.io connection
let http = require('http').Server(app);
let io = require('socket.io')(http);


io.on('connection', socket => {
    socket.on('location', data => {
        io.sockets.emit('location', data)
    })
});

// Facebook Authentication Endpoints
require('./routes/facebookRoutes.js')(app);

// User Endpoints
require('./routes/userRoutes.js')(app);

// Foodtruck Endpoints
require('./routes/foodtruckRoutes.js')(app);

// Reviews
require('./routes/reviewRoutes.js')(app);

// Twilio
require('./routes/twilioRoutes.js')(app);

// Connections
let port = config.port;
http.listen(port, () => console.log('listening on port ' + port));
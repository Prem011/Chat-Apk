require('dotenv').config();
const express = require('express');
const { app, server } = require("./SOCKETIO/server"); // Ensure this path is correct
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/userModel");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message.route");
const morgan = require('morgan');
const db = require("./models/db");
const path = require('path');

const PORT = process.env.PORT || 5001;

// Middleware configuration
app.use(cors({
    origin: "http://localhost:3000", // Change this to your frontend's origin
    credentials: true, // Enable credentials for cookie sharing
}));
app.use(morgan('dev')); // Logs each request to the console
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

// Session configuration
app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET || "asdhbcfkjf", // Use an environment variable for secret
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Parsing routes
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

// ------------------__---------------_----------_--------
// code for deploment
if(process.env.NODE_ENV === 'production'){
    const dirPath =  path.resolve();

    app.use(express.static('./frontend/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirPath, 'frontend', 'dist', 'index.html'));
    });

}


// Start Socket.IO server and listen for connections
const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

// Check if server is already running to avoid re-listening
if (!server.listening) {
    startServer();
}

// Ensure proper shutdown on process exit
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});



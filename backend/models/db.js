const mongoose = require('mongoose');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Retrieve the connection string from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error("Error connecting to DB:", err);
    });

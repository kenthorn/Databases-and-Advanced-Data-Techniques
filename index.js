// Load environment variables
require("dotenv").config();

// Import express and initialize the app
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

// Import and configure body-parser for parsing request bodies
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine for rendering templates
app.set('view engine', 'ejs');

// Serve static files from the "public" and "node_modules" directories
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// Route handling
app.use('/', require('./routes/index'));

// Start the server and listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes/quiklearn'); // Corrected path to the routes file

const { connectMongoDB } = require("./connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Set the view engine (if you're using one)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', route); // Use the routes defined in routes.js

// Error handling
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
connectMongoDB("mongodb://localhost:27017/quiklearn");

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
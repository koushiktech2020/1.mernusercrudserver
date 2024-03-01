const express = require("express"); // Importing Express framework
const app = express(); // Creating an instance of Express
const cors = require("cors"); // Importing CORS middleware
const dotenv = require("dotenv"); // Importing dotenv for environment variables

// Importing custom modules
const { dbconnect } = require("./utils/dbconnect"); // Importing function to establish database connection
const uploadRoutes = require("./routes/uploadroute"); // Importing routes for file uploads
const userRoutes = require("./routes/userroute"); // Importing routes for user management

dotenv.config(); // Loading environment variables from .env file

// Establishing database connection
dbconnect();

const port = process.env.PORT; // Retrieving port number from environment variables

// Loading the path module which comes along with the express module
const path = require("path");

// Middleware setup
app.use(express.json()); // Parsing JSON requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded requests
app.use(cors()); // Handling Cross-Origin Resource Sharing

// Serving static files from the 'public' directory
app.use(express.static("public"));

// Route for serving the home page
app.get("/", (req, res) => {
  res.sendFile("index.html"); // Sending the HTML file for the home page
});

// API routes
app.use("/api/upload", uploadRoutes); // Mounting upload routes
app.use("/api/user", userRoutes); // Mounting user routes

// Starting the server
app.listen(port, () => {
  console.log(`Server has started at ${port}`); // Logging server start message
});

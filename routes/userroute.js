const userrouter = require("express").Router(); //Import express framework and Creating a router instance for user-related routes
const upload = require("../utils/multer"); // Importing multer for file uploads
const {
  addNewUser,
  getAllUser,
  getUserDetails,
  updateUserData,
  deleteUserData,
} = require("../controller/usercontroller"); // Importing controllers for user operations

// Define routes and associate them with corresponding controller functions
userrouter
  .post("/addnewuser", upload.single("photo"), addNewUser) // Route to add a new user
  .get("/getalluser", getAllUser) // Route to get all users
  .get("/getuserdetails/:id", getUserDetails) // Route to get details of a specific user
  .put("/updateuser/:id", upload.single("photo"), updateUserData) // Route to update a user's data
  .delete("/deleteuser/:id", deleteUserData); // Route to delete a user

module.exports = userrouter; // Exporting the user router for use in other modules

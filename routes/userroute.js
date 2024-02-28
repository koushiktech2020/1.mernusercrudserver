const userrouter = require("express").Router();

const upload = require("../utils/multer");

//import controllers
const {
  addNewUser,
  getAllUser,
  getUserDetails,
  updateUserData,
  deleteUserData,
} = require("../controller/usercontrollers");

//add new user
userrouter.post("/addnewuser", addNewUser);

//get all user
userrouter.get("/getalluser", getAllUser);

//get a user details
userrouter.get("/getuserdetails/:id", getUserDetails);

//update a user
userrouter.put("/updateuser/:id", updateUserData);

//delete a user
userrouter.delete("/deleteuser/:id", deleteUserData);

module.exports = userrouter;

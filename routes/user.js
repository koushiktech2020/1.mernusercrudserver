const express = require("express");
const upload = require("../utils/multer");
const {
  getUserData,
  postUserData,
  updateUserData,
  deleteUserData,
} = require("../controller/userController");
const router = express.Router();

//get all todo list from database
router.get("/user", getUserData);

//adding new todo details in x-www - form url encoded
router.post("/user", upload.single("photo"), postUserData);

//Put Request
router.put("/user/:id", upload.single("photo"), updateUserData);

// //delete request
router.delete("/user/:id", deleteUserData);

module.exports = router;
console.log("Router is Configured");

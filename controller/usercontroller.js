const Users = require("../model/usermodel"); // Importing User model

// Controller function to add a new user
exports.addNewUser = async (req, res) => {
  try {
    const newUserData = { ...req.body }; // Extracting user data from request body
    const userResult = await Users.create(newUserData); // Creating a new user in the database

    // Sending success response with created user data
    res.status(201).json({
      status: true,
      data: userResult,
      message: "User data posted",
    });
  } catch (error) {
    // Sending error response if user creation fails
    res.json({ status: false, message: error.message });
  }
};

// Controller function to get all users
exports.getAllUser = async (req, res) => {
  try {
    const allUser = await Users.find({}); // Finding all users in the database

    // Sending success response with all users data
    res.status(200).json({
      status: true,
      data: allUser,
      message: "User fetched successfully!!!",
    });
  } catch (error) {
    // Sending error response if fetching users fails
    res.json({ status: false, message: error.message });
  }
};

// Controller function to get details of a user
exports.getUserDetails = async (req, res) => {
  try {
    const userResult = await Users.findById(req.params.id); // Finding user by ID

    // Sending success response with user details
    res.status(200).json({
      status: true,
      data: userResult,
      message: "User details fetched successfully!!!",
    });
  } catch (error) {
    // Sending error response if fetching user details fails
    res.json({ status: false, message: error.message });
  }
};

// Controller function to update user data
exports.updateUserData = async (req, res) => {
  try {
    const result = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Finding and updating user by ID

    // Sending success response with updated user data
    res
      .status(200)
      .json({ status: true, data: result, message: "User updated" });
  } catch (error) {
    // Sending error response if updating user fails
    res.json({ status: false, message: error.message });
  }
};

// Controller function to delete user data
exports.deleteUserData = async (req, res) => {
  try {
    const userData = await Users.findById(req.params.id); // Finding user by ID

    // Checking if user exists
    if (!userData) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "User not found",
      });
    }

    // Removing user from database
    await userData.remove();

    // Sending success response for user deletion
    res.status(200).json({
      status: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    // Sending error response if deleting user fails
    res.json({ status: false, message: error.message });
  }
};

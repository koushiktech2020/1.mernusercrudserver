const Users = require("../model/usermodel");
const cloudinary = require("../utils/cloudinary");
const { deleteFile } = require("../utils/managefile");

//add new user
exports.addNewUser = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(203).json({
        status: false,
        message: "Image missing!",
      });
    } else {
      const myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "basicusers",
        use_filename: true,
        unique_filename: false,
      });

      deleteFile(req.file.path);

      const newUserData = {
        name: req.body.name || "",
        email: req.body.email,
        address: req.body.address || "",
        role: req.body.role || "",
        phone: req.body.phone || "",
        photopublicid: myCloud.public_id || "",
        photopublicurl: myCloud.secure_url || "",
      };

      const userResult = await Users.create(newUserData);

      res.status(201).json({
        status: true,
        data: userResult,
        message: "User data posted",
      });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

//get all user
exports.getAllUser = async (req, res) => {
  try {
    const allUser = await Users.find({});

    res.status(200).json({
      status: "true",
      data: allUser,
      message: "User fetched successfully!!!",
    });
  } catch (error) {
    res.json({ status: false, message: error });
  }
};

//get details of a user
exports.getUserDetails = async (req, res) => {
  try {
    const userResult = await Users.findById(req.params.id);

    res.status(200).json({
      status: "true",
      data: userResult,
      message: "User details fetched successfully!!!",
    });
  } catch (error) {
    res.json({ status: false, message: error });
  }
};

//update user
exports.updateUserData = async (req, res) => {
  try {
    const userData = await Users.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (req.file) {
      //delete image in cliudinary
      await cloudinary.uploader.destroy(userData.photo.public_id);

      //upload new file in cloudinary
      const myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "basicusers",
        use_filename: true,
        unique_filename: false,
      });

      //delete copied file from temp folder
      manageFile.deleteFile(req.file.path);

      //update user
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role,
            phone: req.body.phone,
            photo: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        data: updateUser,
        message: "User data has been updated",
      });
    } else {
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role,
            phone: req.body.phone,
          },
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        data: updateUser,
        message: "User data has been updated",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error });
  }
};

exports.deleteUserData = async (req, res) => {
  try {
    const userData = await Users.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "User not found",
      });
    }

    await cloudinary.uploader.destroy(userData.photo.public_id);
    await userData.remove();
    res.status(200).json({
      status: true,
      message: "User deleted Succesfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error });
  }
};

const usermodel = require("../model/usermodel");
const cloudinary = require("../utils/cloudinary");
const manageFile = require("../utils/managefile");
exports.getUserData = async (req, res) => {
  try {
    const allUser = await usermodel.find({});
    res.status(200).json({
      status: "true",
      data: allUser,
      message: "Data fetched successfully!!!",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error });
  }
};

exports.postUserData = async (req, res) => {
  try {
    let myCloud;
    let newUserData;
    let userResult;

    if (!req.file) {
      return res.status(203).json({
        status: false,
        data: null,
        message: "Image missing!",
      });
    } else {
      myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "basicusers",
        use_filename: true,
        unique_filename: false,
      });
      manageFile.deleteFile(req.file.path);
      newUserData = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role,
        phone: req.body.phone,
        photo: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      };
      userResult = await usermodel.create(newUserData);
      res.status(201).json({
        status: true,
        data: userResult,
        message: "User data posted",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const userData = await usermodel.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "User not found",
      });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(userData.photo.public_id);
      const myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "basicusers",
        use_filename: true,
        unique_filename: false,
      });
      manageFile.deleteFile(req.file.path);

      const updateUser = await usermodel.findByIdAndUpdate(
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
      const updateUser = await usermodel.findByIdAndUpdate(
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
    const userData = await usermodel.findById(req.params.id);

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

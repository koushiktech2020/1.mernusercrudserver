const usermodel = require("../model/usermodel");
const cloudinary = require("../utils/cloudinary");
const manageFile = require("../utils/managefile");
exports.getUserData = async (req, res) => {
  try {
    const allUser = await usermodel.find({});
    let userName;

    let page = req.query.page;
    let limit = 9;

    if (page) {
      let totalpages = Math.ceil(allUser.length / limit);

      if (page == 0 || page > totalpages) {
        return res.status(500).json({
          status: false,
          data: null,
          message: "Error!!! Page number not found",
        });
      } else {
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        if (req.query.name) {
          userName = await usermodel.find({
            name: { $regex: req.query.name, $options: "i" },
          });
          const resultUsers = userName.slice(startIndex, endIndex);
          let totalQueryPages = Math.ceil(userName.length / limit);
          res.status(200).json({
            status: "true",
            data: {
              userdata: resultUsers,
              totalpages: totalQueryPages,
              totaluser: userName.length,
            },
            message: "Data fetched successfully!!!",
          });
        } else {
          const resultUsers = allUser.slice(startIndex, endIndex);
          res.status(200).json({
            status: "true",
            data: {
              userdata: resultUsers,
              totalpages: totalpages,
              totaluser: allUser.length,
            },
            message: "Data fetched successfully!!!",
          });
        }
      }
    } else {
      return res.status(500).json({
        status: false,
        data: null,
        message: "Error!!! Page number not inserted",
      });
    }
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

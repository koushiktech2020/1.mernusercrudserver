const cloudinary = require("../utils/cloudinary"); // Importing cloudinary for file uploads
const { deleteFile } = require("../utils/managefile"); // Importing deleteFile function for managing files

// Controller function for uploading a single file
exports.uploadsinglefile = async (req, res, next) => {
  try {
    // Uploading file to cloudinary
    const myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "basicusers",
      use_filename: true,
      unique_filename: false,
    });

    // Deleting file from temp folder
    deleteFile(req.file.path);

    // Constructing uploaded file data
    const uploadedFile = {
      photopublicid: myCloud.public_id,
      photopublicurl: myCloud.secure_url,
    };

    // Sending success response with uploaded file data
    res.status(200).json({
      status: true,
      data: uploadedFile,
      message: "File uploaded successfully",
    });
  } catch (error) {
    // Sending error response if file upload fails
    res.json({ status: false, message: error.message });
  }
  next();
};

// Controller function for uploading multiple files
exports.uploadmultifile = async (req, res, next) => {
  try {
    let files = req.files; // Extracting files from request

    let filearr = [];

    // Checking if files are present
    if (files.length == 0) {
      return res.status(202).json({
        status: false,
        data: [],
        message: "Files are not found",
      });
    }

    // Iterating through files for upload
    for (const file of files) {
      // Uploading file to cloudinary
      const myCloud = await cloudinary.uploader.upload(file.path, {
        folder: "basicusers",
        use_filename: true,
        unique_filename: false,
      });

      // Deleting file from temp folder
      deleteFile(file.path);

      // Constructing uploaded file data
      const uploadedFile = {
        photopublicid: myCloud.public_id,
        photopublicurl: myCloud.secure_url,
      };

      filearr.push(uploadedFile); // Pushing uploaded file data to result array
    }

    // Sending success response with uploaded file data
    res.status(200).json({
      status: true,
      data: filearr,
      message: "File uploaded successfully",
    });
  } catch (error) {
    // Sending error response if file upload fails
    res.json({ status: false, message: error.message });
  }
  next();
};

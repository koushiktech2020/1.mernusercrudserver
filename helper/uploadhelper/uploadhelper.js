const cloudinary = require("../../utils/cloudinary"); // Importing cloudinary for file uploads
const Upload = require("../../model/uploadmodel");
const { deleteFile } = require("../../utils/managefile"); // Importing deleteFile function for managing files

exports.uploadNewFile = async (filePath) => {
  try {
    // Uploading file to cloudinary
    const myCloud = await cloudinary.uploader.upload(filePath, {
      folder: "basicusers",
      use_filename: true,
      unique_filename: false,
    });

    // Deleting file from temp folder
    deleteFile(filePath);

    // Constructing uploaded file data
    const newUploads = {
      publicid: myCloud.public_id,
      publicurl: myCloud.secure_url,
    };

    const uploadResult = await Upload.create(newUploads); // Creating a new file in the database

    return uploadResult;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

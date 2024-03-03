const { uploadNewFile } = require("../helper/uploadhelper/uploadhelper");

// Controller function for uploading a single file
exports.uploadsinglefile = async (req, res, next) => {
  try {
    const uploadResult = await uploadNewFile(req.file.path);
    // Sending success response with uploaded file data
    res.status(200).json({
      status: true,
      data: uploadResult,
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

    let uploadedFilesResults = [];

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
      const uploadResult = await uploadNewFile(file.path);
      uploadedFilesResults.push(uploadResult); // Pushing uploaded file data to result array
    }

    // Sending success response with uploaded file data
    res.status(200).json({
      status: true,
      data: uploadedFilesResults,
      message: "File uploaded successfully",
    });
  } catch (error) {
    // Sending error response if file upload fails
    res.json({ status: false, message: error.message });
  }
  next();
};

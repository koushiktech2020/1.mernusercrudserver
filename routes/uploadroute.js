const router = require("express").Router(); // Importing Express Router
const upload = require("../utils/multer"); // Importing multer for file uploads
const {
  uploadsinglefile,
  uploadmultifile,
} = require("../controller/uploadcontroller"); // Importing upload controller functions

// Route for single file upload
router.post("/singleupload", upload.single("upload"), uploadsinglefile);

// Route for multi-file upload
router.post("/multiupload", upload.array("uploads"), uploadmultifile);

module.exports = router; // Exporting the router

const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

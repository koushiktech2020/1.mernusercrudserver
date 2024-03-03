const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema(
  {
    publicid: String,
    publicurl: String,
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);

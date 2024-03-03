const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    address: String,
    role: String,
    phone: String,
    uploadedimage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    address: String,
    role: String,
    phone: String,
    photopublicid: String,
    photopublicurl: String,
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);

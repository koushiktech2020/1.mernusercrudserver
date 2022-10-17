const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    address: String,
    role: String,
    phone: String,
    photo: {
      public_id: String,
      url: String,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);

console.log("User Model is created");

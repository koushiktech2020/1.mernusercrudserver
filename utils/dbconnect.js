const mongoose = require("mongoose");
const dotenv = require("dotenv");

// env file configure
dotenv.config();

exports.dbconnect = () => {
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
};

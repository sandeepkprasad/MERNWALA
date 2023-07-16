const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/mernwala";

const connectDB = () => {
  mongoose.connect(URI);
};

module.exports = connectDB;

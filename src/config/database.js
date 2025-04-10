const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://namastedev:6PlRRHoP8sBOsNnE@namastenode.gkb0lhm.mongodb.net/devTinder");
    // mongodb+srv://namastedev:6PlRRHoP8sBOsNnE@namastenode.gkb0lhm.mongodb.net/devTinder
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;


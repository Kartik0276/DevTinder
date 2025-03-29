const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:6PlRRHoP8sBOsNnE@namastenode.gkb0lhm.mongodb.net/devTinder");
    //devTinder is the database name
}
module.exports = connectDB;




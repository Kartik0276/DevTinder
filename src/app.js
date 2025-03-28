const express = require('express');

const app = express();


const {userAuth, adminAuth} = require("./middlewares/auth")

app.use("/admin",adminAuth)

app.use("/admin/login", (req, res) => {
    console.log("Here is the for login");
    res.send("Admin reached login section");
})

app.use("/admin/data", (req, res) => {
    console.log("Here is the admin for data");
    res.send("Admin reached data section");
})

app.use("/user/login", (req, res) => {
    res.send("User is requestd for login");
})

app.use("/user/data", userAuth, (req,res) => {
    res.send("User get the data");
})





const PORT = 7777;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`);
})
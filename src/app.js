const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Sumana",
        lastName: "Maity",
        emailId: "Sumana@gmail.com",
        password: "986543",
        age: 23,
        gender: "Female",
    }

    const user = new User(userObj);
    try {
        await user.save();
        res.send("New user created successfully...");
    } catch (error) {
        res.status(400).send("Something went wrong!!!");
    }
})




connectDB()
    .then(() => {
        console.log("Database connection established...");
        const PORT = 7777;
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}...`);
        })
    })
    .catch(err => {
        console.error("Database connot be connected...");
    });






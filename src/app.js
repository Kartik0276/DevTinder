const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json()); //This is the express middleware, it converts the json to java object so we can read the file as req.body.

app.post("/signup", async (req, res) => {
    // const userObj = {
    //     firstName: "Sumana",
    //     lastName: "Maity",
    //     emailId: "Sumana@gmail.com",
    //     password: "986543",
    //     age: 23,
    //     gender: "Female",
    // }

    console.log(req.body);
    // Creating a new instace of the User model
    const user = new User(req.body);
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






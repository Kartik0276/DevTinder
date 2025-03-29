const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { isValidObjectId } = require('mongoose');

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
        console.log(error.message);
        res.status(400).send("Something went wrong!!!");
    }
})

// GET the data from DB by emailId

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const userData = await User.find({ emailId: userEmail });
        if (userData.length === 0) {
            res.status(404).send("UserData not found!!!");
        }
        else {
            res.send(userData);
        }
    } catch (error) {
        res.status(400).send("Something went wrong");
    }

})

app.get("/feed", async (req, res) => {

    try {
        const getAllUsers = await User.find({});
        if (getAllUsers.length === 0) {
            res.status(404).send("No user found!!!");
        }
        else {
            res.send(getAllUsers);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId })
        res.send("user delete successfully...");
    } catch (error) {
        res.status(400).send("Something went wrong!!!");
    }
})


app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDDATES = ["about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((key) => {
            return ALLOWED_UPDDATES.includes(key)
        });

        if(!isUpdateAllowed){
            throw new Error("Updata not allowed");
        }

        if(data.skills.length > 10){
            throw new Error("Skills should not exceed 10");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: 'after' }, {
            runValidators: true
        });
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
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






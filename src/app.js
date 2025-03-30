// app.js (Main server file)
const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const { isValidObjectId } = require('mongoose');
const { signupValidator } = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth")

const app = express();
app.use(express.json());

app.use(cookieParser()); // This helps to read the token from cookie

// User Signup
app.post("/signup", async (req, res) => {
    try {
        // Validation of data
        signupValidator(req);

        // Encrypt the password
        const { firstName, lastName, age, gender, password, emailId, skills } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        // Creating a new instace of the User model
        const user = new User({
            firstName,
            lastName,
            age,
            gender,
            password: hashPassword,
            emailId,
            skills
        });
        await user.save();
        res.status(201).send("New user created successfully...");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Profile of user
app.get("/profile",userAuth, async (req, res) => {
    try {



        // Validate token

        //finding user based on id
        const user = req.user;

        res.send(user);



        // console.log("Logged in user is : " + _id);
        // console.log(decodedMessage);
        // console.log(cookie);
        // res.send("Cookie loading...")
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

// Login user
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credintials...");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

            //Create a JWT Token
            const token = await user.getJWT();
            //Add the token to cookie and send the response back to the user
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)});

            res.send("login Successfully!");
        }
        else {
            throw new Error("Invalid Credintials...");
        }

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.post("/sendConnectionRequest",userAuth, async(req, res) => {
    // Sending connection request logic
    const user = req.user;
    res.send(`Connection request send from: ${user.firstName}`);

})

// Connect to DB and start server
connectDB()
    .then(() => {
        console.log("Database connection established...");
        const PORT = 7777;
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}...`);
        });
    })
    .catch(err => {
        console.error("Database cannot be connected...");
    });

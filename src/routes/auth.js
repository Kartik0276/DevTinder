const express = require('express');
const authRouter = express.Router();
const { signupValidator } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/user");



authRouter.post("/signup", async (req, res) => {
    try {
        // Validation of data
        signupValidator(req);

        // Encrypt the password
        const { firstName, lastName, age, gender, password, emailId, skills } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        //console.log(hashPassword);

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

authRouter.post("/login", async (req, res) => {
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


module.exports = authRouter;

const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData, forgotPassword } = require("../utils/validation");
const User = require('../models/user');
const bcrypt = require('bcrypt');

// View profile route
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Edit profile route
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        const updates = req.body;

        Object.keys(updates).forEach(key => {
            loggedInUser[key] = updates[key];
        });

        await loggedInUser.save();
        res.json({
            message: `Profile edited by ${loggedInUser.firstName}`,
            user: loggedInUser
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Forgot password route
profileRouter.patch("/profile/forgotPassword", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Email is required");
        }

        const user = await User.findOne({ emailId: email });
        if (!user) {
            throw new Error("User is not valid!!!");
        }

        if (!forgotPassword(req)) {
            throw new Error("Please enter a strong new password...");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        await user.save();

        res.send("Password updated successfully...");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = profileRouter;

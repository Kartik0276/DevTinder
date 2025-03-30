// app.js (Main server file)
const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const { isValidObjectId } = require('mongoose');
const { signupValidator } = require("./utils/validation");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

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

// Get user by emailId
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        if (!userEmail) throw new Error("Email is required");

        const userData = await User.findOne({ emailId: userEmail });
        if (!userData) {
            return res.status(404).send("User not found");
        }
        res.send(userData);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all users
app.get("/feed", async (req, res) => {
    try {
        const getAllUsers = await User.find({});
        if (getAllUsers.length === 0) {
            return res.status(404).send("No users found");
        }
        res.send(getAllUsers);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete user by ID
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!isValidObjectId(userId)) throw new Error("Invalid user ID");

        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).send("User not found");

        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update user by ID
app.patch("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!isValidObjectId(userId)) throw new Error("Invalid user ID");

        const ALLOWED_UPDATES = ["about", "gender", "age", "skills", "photoUrl"];
        const updates = Object.keys(req.body);
        const isUpdateAllowed = updates.every((key) => ALLOWED_UPDATES.includes(key));

        if (!isUpdateAllowed) throw new Error("Invalid updates");

        if (req.body.skills && req.body.skills.length > 10) {
            throw new Error("Skills should not exceed 10");
        }

        const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) return res.status(404).send("User not found");

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credintials...");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("login Successfully!");
        }
        else{
            throw new Error("Invalid Credintials...");
        }

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
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

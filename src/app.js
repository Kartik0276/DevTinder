// app.js (Main server file)
const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
// const { isValidObjectId } = require('mongoose');
// const { signupValidator } = require("./utils/validation");
// const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const { userAuth } = require("./middlewares/auth")
const cors = require("cors");
const app = express();


app.use(cors({
    origin: (origin, callback) => {
        // Allow all localhost origins
        if (!origin || origin.startsWith("http://localhost:")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); // This helps to read the token from cookie  

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')
//using router
app.use('/', authRouter, profileRouter, requestRouter, userRouter);



// User Signup
// Profile of user
// Login user



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



    
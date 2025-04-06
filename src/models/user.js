// user.js (User Model)
const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength:255
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 18,
        max: 99
    },
    gender: {
        type: String,
        required: true,
        lowercase: true,
        enum:{
            values : ["male", "female", "other"],
            message : `{VALUE} must be a age type`
        }
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Invalid gender: " + value);
        //     }
        // }
    },
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo URL: " + value);
            }
        }
    },
    skills: {
        type: [String],
        validate(skills) {
            if (skills.length > 10) {
                throw new Error("Skills should not exceed 10");
            }
        }
    },
    about: {
        type: String,
        default: "This is about section with default values"
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function (params) {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Kartik@123$123", {expiresIn : "1d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const hashPassword = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, hashPassword);
    return isValidPassword;
}

const User = mongoose.model('User', userSchema);

module.exports = User;

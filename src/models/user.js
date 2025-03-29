const mongoose = require('mongoose');

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

    },
    password: {
        type: String,
        required: true,
        minLength: 6,

    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 99,
    },
    gender: {
        type: String,
        required: true,
        lowercase: true,
        // Custom validation method to check if the gender is one of the allowed values
        validate: function (value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid gender");
            }
        }
    },
    skills: {
        type: [String]

    },
    about: {
        type: String,
        default: "This is about section with default values",
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
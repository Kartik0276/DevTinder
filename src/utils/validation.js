const validator = require('validator');

const signupValidator = (req) => {
    const { firstName, lastName, emailId, password, gender, age } = req.body;

    if (!firstName) {
        throw new Error('You must provide a first name');
    }
    if (!lastName) {
        throw new Error('You must provide a last name');
    }
    if (!emailId) {
        throw new Error('You must provide an email');
    } else if (!validator.isEmail(emailId)) {
        throw new Error('Invalid email');
    }
    if (!password) {
        throw new Error('You must provide a password');
    } else if (password.length < 8 || password.length > 255) {
        throw new Error('Password should be between 8 and 255 characters long');
    } else if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error("Please enter a strong password (at least 1 lowercase, 1 uppercase, 1 number, 1 symbol)");
    }
    if (typeof age !== 'number' || age < 18 || age > 100) {
        throw new Error('You must be between 18 and 100 years old');
    }
    if (!gender) {
        throw new Error('You must provide your gender');
    } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
        throw new Error('Gender must be male, female or other');
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills", "age", "gender"];
    const updates = Object.keys(req.body);
    if (updates.length === 0) {
        return false;
    }
    return updates.every(field => allowedEditFields.includes(field));
};

const forgotPassword = (req) => {
    const { password } = req.body;

    if (!password || typeof password !== 'string') {
        return false;
    }
    return validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 });
};

module.exports = {
    signupValidator,
    validateEditProfileData,
    forgotPassword,
};
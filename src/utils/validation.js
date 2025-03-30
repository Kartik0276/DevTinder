const validator = require('validator');

const signupValidator = (req) => {
    const {firstName, lastName, emailId, password, gender, age} = req.body;

    if(!firstName){
        throw new Error('You must provide a first name');
    }
    if(!lastName){
        throw new Error('You must provide a last name');
    }
    if(!emailId){
        throw new Error('You must provide an email');
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('Invalid email');
    }
    if(!password){
        throw new Error('You must provide a password');
    }
    else if(password.length < 4 || password.length > 255){
        throw new Error('Password should be between 4 and 255 characters long');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
    if(!age){
        throw new Error('You must provide your age');
    }
    else if(!(age >= 18)){
        throw new Error('You must be at least 18 years old');
    }
    if(!gender){
        throw new Error('You must provide your gender');
    }
    else if(!(gender === 'male' || gender === 'female' || gender === 'other')){
        throw new Error('Gender must be male, female or other');
    }
}

module.exports = {
    signupValidator
}
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        const {token} = cookie ;
        if (!token) {
            return res.status(401).send("Please login...")
        }

        const decodedObj = await jwt.verify(token, "Kartik@123$123");

        const { _id } = decodedObj;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("user not found!!!");
        }

        req.user= user;
        next();

    } catch (error) {
        res.status(400).send("Error:  " + error.message)
    }

}

module.exports = {
    userAuth
}
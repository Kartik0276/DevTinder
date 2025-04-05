const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")


profileRouter.get("/profile",userAuth, async (req, res) => {
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

module.exports = profileRouter;
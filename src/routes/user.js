const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl gender age about")
        // .populate("fromUserId", ["firstName", "lastName"])

        //const cleanData = connectionRequests.map(req => req.toObject());

        res.json({
            message: "Connection requests received...",
            data: connectionRequests
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = userRouter;

const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ]
        })
            .populate("fromUserId", "firstName lastName age gender skills photoUrl about")
            .populate("toUserId", "firstName lastName age gender skills photoUrl about"); // ✅ fixed typo here

        const data = connections.map((row) => {
            // Check who is the other person in this connection
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId; // The other user
            }
            return row.fromUserId; // The other user
        });

        res.json({
            message: "Connected users fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const userConnection = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        userConnection.forEach((connection) => {
            hideUserFromFeed.add(connection.toUserId.toString());
            hideUserFromFeed.add(connection.fromUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName age gender skills photoUrl about");

        res.send(users);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});


module.exports = userRouter;

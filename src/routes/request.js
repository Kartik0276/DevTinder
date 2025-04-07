const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

// Send Request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User not found!" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists!" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: `${req.user.firstName} is ${status} ${toUser.firstName}`,
            data
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Review Request
requestRouter.post("/request/review/:status/:reqId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, reqId } = req.params;

        const allowedStatuses = ["accepted", "rejected"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status!" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: reqId,
            toUserId: loggedInUser._id,
            status : "interested"
        });

        if (!connectionRequest) {
            return res.status(400).json({ message: "Connection request not found!" });
        }

        connectionRequest.status = status;
        await connectionRequest.save();

        res.send(`Request is: ${status} by ${loggedInUser.firstName}`);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = requestRouter;

const express = require('express')
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")



app.post("/sendConnectionRequest",userAuth, async(req, res) => {
    // Sending connection request logic
    const user = req.user;
    res.send(`Connection request send from: ${user.firstName}`);

})
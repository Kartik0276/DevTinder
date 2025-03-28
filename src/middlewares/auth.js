const adminAuth = (req, res, next) => {
    const token = "xyz";
    const adminAuthorized = token === "xyz";
    if(!adminAuthorized){
        console.log("This isn't an authorized admin");
        res.status(401).send("This is not autorized admin");
    }
    else{
        next();
    }
}


const userAuth = (req, res, next) => {
    const token = "xyz";
    const userAutorized = token === "xyzzzz";
    if(!userAutorized){
        console.log("This is not a authorized user");
        res.send("Unauthorized user");
    }
    else{
        next();
    }
}

module.exports = {
    userAuth,
    adminAuth
}
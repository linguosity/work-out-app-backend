const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env

// create token with user id, email and password using JWT sign method
const createToken = (user) => {
    try{
        
       return token = jwt.sign({id: user._id, email: user.email, username: user.username}, JWT_SECRET, {expiresIn: "2h"});

    }catch(err){
        console.log(err);
    }
}

// verify that the given password matches...
const verifyToken = (req, res, next) => {
    try{
        const bearerHeader = req.headers["authorization"];
        console.log(bearerHeader, "BEARER HEADER");
        
        if(!bearerHeader){
            return res.status(403).json({error: "You don't have permission to view this resource"});
        }

        //now unhash the token and compare to SECRET
        const decoded = jwt.verify(bearerHeader, JWT_SECRET);
        console.log(decoded);

        //if JWT could not verify the token then
        if(!decoded){
            return res.status(400);
        }

        //else token is verified, and the next function may execute
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    createToken,
    verifyToken
}
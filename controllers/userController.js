const db = require("../models/User");
const bcrypt = require("bcrypt");
const {createToken} = require("../middleware/verifyToken");

const signup = async(req, res) => {
    try{
        const {email, username, password} = req.body;

        //prep the query for execution
        const query = db.User.find({});

        //check for existing username and/or email
        query.or([{username: username}, {email: email}]);

        //execute the query
         const foundUser = await query.exec();

        // return message if user and/or email already exist
        if(foundUser.length !== 0){
            return res.status(400).json({message: "Username or Email already taken"});
        }

        //salt and has the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //replace raw password with hashed password 
        req.body.password = hash;

        //signup the user (create)
        const createdUser = await db.User.create(req.body);
        await createdUser.save();

        return res.status(201).json({message: "User successfully registered", userId: createdUser.id});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"})
    }
}

const login = async(req,res) => {
    try{
        const {username, email, password} = req.body;
        const query = db.User.find({});

        //search users that match both fields/values
        query.and([{username: username}, {email: email}]);
        const foundUser = await query.exec();

        //user not found
        if(foundUser.length ===0){
            return res.status(400).json({error: "Invalid login credentials"});
        }

        // compare user password with foundUser password
        const verifyPassword = await bcrypt.compare(password, foundUser[0].password);

        //if passwords don't match return error
        if(!verifyPassword){
            return res.status(400).json({error: "Invalid login credentials"});
        }

        //if password matches give the foundUserdata to create the JWT
        const token = createToken(foundUser[0]);

        //passthe frontend our JWT with the user
        return res.status(200).json({token, id: foundUser[0]._id})
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

const getUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const query = db.User.findById(id);

        // exclude password from returning with query
        query.select("-password");
        const foundUser = await query.exec();

        if(!foundUser){
            return res.status(400).json({error: "User not found"});
        }

        return res.status(200).json({message: "Successfully found user", data: foundUser});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getUser,
    signup,
    login
}
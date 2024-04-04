const db = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middleware/verifyToken");

//delete functions use req.params to access user, routine and excercise
//upon successful delete, message is sent back to user via json
const deleteRoutine = async(req,res,next) => {

    const { userId, routineId } = req.params
    
    try{


    }catch(err){
        console.log(err);
        return res.status;
    }
}

//update routines use req.body to pass user data from front end to database for update
//upon successful update, message is sent back to user via json
const updateRoutine = async(req, res, next) => {

    const newRoutine = req.body;

    try{

    }catch(err){
        console.log(err);
        return res.status;
    }

}

const createRoutine = async(req, res, next) => {
    const newRoutine = req.body;

    try{

    }catch(err){

    }
}


module.exports = {
   deleteRoutine,
   updateRoutine,
   createRoutine
}
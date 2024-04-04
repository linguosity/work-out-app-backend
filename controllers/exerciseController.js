const { User, Routine, Exercise} = require("../models/User"); 
//unsure if necessary to import Routine and Exercise
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middleware/verifyToken");

//delete functions use req.params to access user, routine and excercise
//upon successful delete, message is sent back to user via json
const deleteExcercise = async(req,res,next) => {

    const { userId, routineId, exerciseId } = req.params
    
    try{

        //find the exercise by userId routineId and exerciseId (?)
        const user = await User.findbyId(userId);
        const routine = await user.routines.id(routineId);
        const exercise = await routine.exercises.id(exerciseId);

        /// removing an exercise subdocument from a user's routine array of exercises
        await User.updateOne(
            { "_id": ObjectId(userId),
                "routines._id": routineId,
            },  // Match the provider document
            { $pull: { exercises: { _id: exerciseId } } } // Remove the student from the students array
        );

    }catch(err){
        console.log(err);
        return res.status;
    }
}

//update routines use req.body to pass user data from front end to database for update
//upon successful update, message is sent back to user via json
const updateExercise = async(req, res, next) => {

    const newRoutine = req.body;

    try{

    }catch(err){
        console.log(err);
        return res.status;
    }

}

const createExercise = async(req, res, next) => {
    
    const newRoutine = req.body;

    try{

    }catch(err){
        
    }
}

module.exports = {
   deleteExcercise,
   updateExercise,
   createExercise
}
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
    email: {type: String, unique: true, required: true},
    firstName: String,
    lastName: String,
    DOB: Date,
    bodyWeight: Number,
    routines: [routineSchema],

}, {timestamps: true})

const routineSchema = new mongoose.Schema({

})

const excerciseSchema = new mongoose.Schema({

})

const User = mongoose.model("User", userSchema);
const Routine = mongoose.model("Routine", routineSchema)
const Excercise = mongoose.model("Excercise", excerciseSchema)

module.exports = {User, Routine, Excercise};
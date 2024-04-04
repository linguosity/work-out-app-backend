const { default: mongoose } = require("mongoose");

const excerciseSchema = new mongoose.Schema({
    name: {type: String},
    sets: {type: Number, min: 0},
    reps: {type: Number, min:0},
    weight: {type: Number, min:0, max:1000},
})

const routineSchema = new mongoose.Schema({
    name: {type: String},
    excercises: [excerciseSchema],
    day: [String],
})

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    firstName: String,
    lastName: String,
    DOB: Date,
    bodyWeight: Number,
    routines: [routineSchema],

}, {timestamps: true})

const User = mongoose.model("User", userSchema);
const Routine = mongoose.model("Routine", routineSchema)
const Excercise = mongoose.model("Excercise", excerciseSchema)

module.exports = {User, Routine, Excercise};
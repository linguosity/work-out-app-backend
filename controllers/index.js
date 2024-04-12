const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const userCtrl = require("./userController");
const routineCtrl = require("./routineController");
const exerciseCtrl = require("./exerciseController");

// auth signup
router.post("/auth/signup", userCtrl.signup);

//auth/login
router.post("/auth/login", userCtrl.login);
router.get("/user/:id", verifyToken, userCtrl.getUser);

/*---- DELETE ----*/
//delete user
router.delete( "/user/:userId", verifyToken, userCtrl.deleteUser);

//delete routine
router.delete( "/user/:userId/routine/:routineId", verifyToken, routineCtrl.deleteRoutine)

//delete exercise 
router.delete( "/user/:userId/routine/:routineId/exercise/:exerciseId", verifyToken, exerciseCtrl.deleteExercise)

/*---- UPDATE ----*/
//update user
router.put("/user/:userId", verifyToken, userCtrl.updateUser)

//update routine
router.put("/user/:userId/routine/:routineId", verifyToken, routineCtrl.updateRoutine)

//update exercise
router.put("/user/:userId/routine/:routineId/exercise/exerciseId", verifyToken, exerciseCtrl.updateExercise)


/*---- CREATE----*/

//create routine
router.post("/user/:userId/routine", verifyToken, routineCtrl.createRoutine)

//create exercise
router.post("/user/:userId/routine/:routineId/exercise", verifyToken, exerciseCtrl.createExercise)


module.exports = router;
const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const userCtrl = require("./userController");

// auth signup
router.post("/auth/signup", userCtrl.signup);

//auth/login
router.post("/auth/login", userCtrl.login);
router.get("/user/:id", verifyToken, userCtrl.getUser);

module.exports = router;
let router = require("express").Router();

const firebaseAuthController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/index");

router.post("/register", firebaseAuthController.registerUser);
router.post("/login", firebaseAuthController.loginUser);
router.post("/logout", verifyToken, firebaseAuthController.logoutUser);
router.post(
    "/reset-password",
    verifyToken,
    firebaseAuthController.resetPassword
);

module.exports = router;

const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    deleteUser
} = require("../config/firebase");
const User = require("../models/use.model");
const faker = require("faker");

const auth = getAuth();

class FirebaseAuthController {
    registerUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
            });
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        let user = new User();
                        user.username = faker.internet.userName();
                        user.email = email;
                        user.save()
                            .then(function () {
                                res.status(201).json({
                                    message: "Verification email sent! User created successfully!",
                                });
                            })
                            .catch(function (error) {
                                deleteUser(userCredential.user).then((response) => {
                                    console.log(response);
                                })
                                res.status(500).json({ error: "Error sending email verification" });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: "Error sending email verification" });
                    });
            })
            .catch((error) => {
                console.log(error);
                const errorMessage =
                    error.message || "An error occurred while registering user";
                res.status(500).json({ error: errorMessage });
            });
    }
    loginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
            });
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const idToken = userCredential._tokenResponse.idToken;
                if (idToken) {
                    res.cookie("access_token", idToken, {
                        httpOnly: true,
                    });
                    res
                        .status(200)
                        .json({ message: "User logged in successfully", userCredential });
                } else {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            })
            .catch((error) => {
                console.error(error);
                const errorMessage =
                    error.message || "An error occurred while logging in";
                res.status(500).json({ error: errorMessage });
            });
    }
    logoutUser(req, res) {
        signOut(auth)
            .then(() => {
                res.clearCookie("access_token");
                res.status(200).json({ message: "User logged out successfully" });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    }
    resetPassword(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(422).json({
                email: "Email is required",
            });
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                res
                    .status(200)
                    .json({ message: "Password reset email sent successfully!" });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    }
}

module.exports = new FirebaseAuthController();
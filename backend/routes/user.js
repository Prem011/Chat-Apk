const express = require('express');
const app = express();
const router = express.Router();
const userController = require("../controller/userController")
const User = require("../models/userModel")
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(User.createStrategy());
const secureRoute = require("../middleware/secureRoute");


router.post("/signup", userController.signup)


router.post("/signin", passport.authenticate("local", {
    successMessage: "Login successful",
    failureMessage: "Login failed",
}), userController.login);

router.post("/logout", userController.logout);

router.get("/allusers" , secureRoute, userController.allUsers)

module.exports = router;



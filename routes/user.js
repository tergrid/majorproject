const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/user.js");
const user = require("../models/user.js");

router.route("/signup")
.get(userController.renderUserSignUp)
.post(wrapAsync(userController.userSignUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}), userController.userLogin);

router.get("/logout",userController.userLogout);

module.exports = router;
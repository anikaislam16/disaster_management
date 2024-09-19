const express = require("express");
const { signupUser, loginUser } = require("./signup.js");

const router = express.Router();

// Route for signup
router.post("/", signupUser);
router.post("/login",loginUser);// Call signupUser function in the controller

module.exports = router;

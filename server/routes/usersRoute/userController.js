const express = require("express");
const { signupUser, loginUser, getApprovedUsers } = require("./signup.js");

const router = express.Router();

// Route for signup
router.post("/", signupUser);
router.post("/login", loginUser);
router.get("/approved", getApprovedUsers);


module.exports = router;

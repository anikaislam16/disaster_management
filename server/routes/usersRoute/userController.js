const express = require("express");
const {
  signupUser,
  loginUser,
  getApprovedUsers,
  getUsers,
  updateUser,
} = require("./signup.js");
const authenticateJWT = require("../usersRoute/Authentication");
const router = express.Router();

// Route for signup
router.post("/", signupUser);
router.post("/login", loginUser);
router.get("/approved", getApprovedUsers);
router.get("/", getUsers);
router.put("/update/:id", authenticateJWT, updateUser);


module.exports = router;

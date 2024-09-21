
const express = require("express");
const { signupadmin, loginadmin, getApprovedadmin } = require("./adminsignup");

const router = express.Router();

// Route for signup
router.post("/", signupadmin);
router.post("/login", loginadmin);
router.get("/approved", getApprovedadmin);

module.exports = router;

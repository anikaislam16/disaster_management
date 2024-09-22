const express = require("express");
const authenticateJWT = require("../usersRoute/Authentication");
const { insertDonation} = require("./donation");
const router = express.Router();
router.post("/", insertDonation);

module.exports = router;

const express = require("express");
const authenticateJWT = require('../usersRoute/Authentication');
const { addCrisis, updateCrisis, getApprovedCrises } = require("./Crisis");
const router = express.Router();
router.post("/", addCrisis);
router.put("/:id", authenticateJWT, updateCrisis);
router.get("/approved", getApprovedCrises);
module.exports = router;
const express = require("express");

const { insertDonation, getDonationsByDate } = require("./donation");
const router = express.Router();
router.post("/", insertDonation);
router.get("/", getDonationsByDate);
module.exports = router;

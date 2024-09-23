const express = require("express");

const {
  insertDonation,
  getDonationsByDate,
  getTotalDonations,
} = require("./donation");
const router = express.Router();
router.post("/", insertDonation);
router.get("/", getDonationsByDate);
router.get("/total", getTotalDonations);
module.exports = router;

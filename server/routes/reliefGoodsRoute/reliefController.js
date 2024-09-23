const express = require("express");
const authenticateJWT = require("../usersRoute/Authentication");
const {
  insertDonation,
  getDonations,
  updateReliefDonation,
  deleteReliefDonation,
} = require("./relief");
const router = express.Router();
router.post("/", authenticateJWT,insertDonation);
router.get("/",  getDonations);
router.put("/:id", authenticateJWT, updateReliefDonation);
router.delete("/:id", authenticateJWT, deleteReliefDonation);
module.exports = router;

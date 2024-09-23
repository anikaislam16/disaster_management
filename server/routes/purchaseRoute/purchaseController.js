const express = require("express");
const router = express.Router();
const authenticateJWT = require("../usersRoute/Authentication");
const {
  insertPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
} = require("./purchase");
router.post("/", authenticateJWT, insertPurchase);
router.get("/", getPurchases);
router.put("/:id", authenticateJWT, updatePurchase);
router.delete("/:id", authenticateJWT, deletePurchase);
module.exports = router;

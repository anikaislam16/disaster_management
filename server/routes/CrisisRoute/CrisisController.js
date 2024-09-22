const express = require("express");
const authenticateJWT = require("../usersRoute/Authentication");

const {
    addCrisis,
  updateCrisis,
  getApprovedCrises,
  getNotApprovedCrises,
} = require("./Crisis");

const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.post("/", upload.array("pictures"), addCrisis);


router.put("/:id", authenticateJWT, updateCrisis);
router.get("/approved", getApprovedCrises);
router.get("/not-approved", getNotApprovedCrises);

module.exports = router;

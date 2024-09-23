const express = require("express");
const router = express.Router();
const {
  generateDailyDonationsCSV,
  generateDailyExpensesCSV,
  generateDailyDonationsExcel,
  generateDailyExpensesExcel,
} = require("./reports");
const {
  getTotalDonationsByDate,
  getTotalCostsByDate,
} = require("./graphs"); // Adjust the path

router.get("/totals/donations", getTotalDonationsByDate);
router.get("/totals/costs", getTotalCostsByDate);
// Route to get daily donations CSV
router.get("/daily-donations-csv", (req, res) => {
    console.log('sfsdf')
  generateDailyDonationsCSV((error, csv) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.header("Content-Type", "text/csv");
    res.attachment("daily_donations_report.csv");
    res.send(csv);
  });
});

// Route to get daily expenses CSV
router.get("/daily-expenses-csv", (req, res) => {
  generateDailyExpensesCSV((error, csv) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.header("Content-Type", "text/csv");
    res.attachment("daily_expenses_report.csv");
    res.send(csv);
  });
});

// Route to get daily donations Excel
router.get("/daily-donations-excel", (req, res) => {
  generateDailyDonationsExcel(res, (error) => {
    if (error) {
      return res.status(500).send(error.message);
    }
  });
});

// Route to get daily expenses Excel
router.get("/daily-expenses-excel", (req, res) => {
  generateDailyExpensesExcel(res, (error) => {
    if (error) {
      return res.status(500).send(error.message);
    }
  });
});

module.exports = router;

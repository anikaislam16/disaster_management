const db = require("../../db/db");

// Function to get total donations by date
const getTotalDonationsByDate = (req, res) => {
  const donationsQuery = `
    SELECT DATE(date) AS date, SUM(amount) AS total_donations
    FROM donationMoney
    GROUP BY DATE(date);
  `;

  db.query(donationsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching total donations:", err);
      return res
        .status(500)
        .json({ error: "Error retrieving total donations." });
    }
    res.json({ donations: results });
  });
};

// Function to get total costs by date
const getTotalCostsByDate = (req, res) => {
  const costsQuery = `
    SELECT DATE(date) AS date, SUM(cost) AS total_costs
    FROM purchase
    GROUP BY DATE(date);
  `;

  db.query(costsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching total costs:", err);
      return res.status(500).json({ error: "Error retrieving total costs." });
    }
    res.json({ costs: results });
  });
};

module.exports = { getTotalDonationsByDate, getTotalCostsByDate };

const { v4: uuidv4 } = require("uuid"); 
const db = require("../../db/db"); 
const insertDonation = (req, res) => {
  const { id = uuidv4(), name, amount } = req.body;

  
  
  if (amount <= 0 || !Number.isInteger(amount)) {
    return res
      .status(400)
      .json({ error: "Amount must be a positive integer." });
  }

  const sql = "INSERT INTO donationMoney (id, name, amount) VALUES (?, ?, ?)";

  db.query(sql, [id, name || "Anonymous", amount], (err, result) => {
    if (err) {
      console.error("Error inserting donation data:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(201).json({ message: "Donation added successfully!", id });
  });
};
const getDonationsByDate = (req, res) => {
  const { startDate, endDate } = req.query;

  // Ensure startDate and endDate are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required." });
  }

  console.log("Querying donations from:", startDate, "to", endDate);

  // Query to get donations within the date range
   const query = `SELECT * FROM donationMoney WHERE DATE(date) BETWEEN ? AND ?`;

  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error executing query:", err); // Log the error
      return res.status(500).json({ error: "Error retrieving donations" });
    }

    if (results.length === 0) {
      console.log("No donations found for the given date range.");
    }

    // Calculate total amount
    const totalAmount = results.reduce((acc, curr) => acc + curr.amount, 0);

    console.log("Donations found:", results);
    console.log("Total amount:", totalAmount);

    // Send response with donations and total amount
    return res.json({ donations: results, totalAmount });
  });
};



module.exports = { insertDonation, getDonationsByDate };
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



module.exports = { insertDonation };
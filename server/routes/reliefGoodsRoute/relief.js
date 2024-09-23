const { v4: uuidv4 } = require("uuid");
const db = require("../../db/db");
const insertDonation = (req, res) => {
  const { type, location,amount } = req.body;
  console.log(req.body)
  if (!type || !location||!amount) {
    return res.status(400).json({ error: "Type, amount and location are required." });
  }

  const id = uuidv4(); // Generate a unique ID for each donation
  const query = `INSERT INTO reliefDonation (id, type, location, amount) VALUES (?, ?, ?,?)`;

  db.query(query, [id, type, location,amount], (err, result) => {
    if (err) {
      console.error("Error inserting donation:", err);
      return res.status(500).json({ error: "Error adding donation." });
    }
    res.status(200).json({ message: "Donation added successfully." });
  });
};
const getDonations = (req, res) => {
  const query = `SELECT * FROM reliefDonation`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching donations:", err);
      return res.status(500).json({ error: "Error retrieving donations." });
    }
    res.json({ donations: results });
  });
};
const updateReliefDonation = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const fields = [];
  const values = [];

  // Check for type update
  if (updates.type) {
    fields.push("type = ?");
    values.push(updates.type);
  }
  // Check for amount update
  if (updates.amount) {
    fields.push("amount = ?");
      values.push(updates.amount);
    
  }

  // Check for date update (formatting the date for MySQL)
  if (updates.date) {
    const date = new Date(updates.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formats to 'YYYY-MM-DD HH:MM:SS'
    fields.push("date = ?");
    values.push(date);
  }

  // Check for location update
  if (updates.location) {
    fields.push("location = ?");
    values.push(updates.location);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  values.push(id);

  const sql = `UPDATE reliefDonation SET ${fields.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating relief donation:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Relief donation not found." });
    }
    res.json({ message: "Relief donation updated successfully!", result });
  });
};

const deleteReliefDonation = (req, res) => {
  const donationId = req.params.id;

  const sql = `DELETE FROM reliefDonation WHERE id = ?`;

  // Execute the delete query
  db.query(sql, [donationId], (err, result) => {
    if (err) {
      console.error("Error deleting donation:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donation not found." });
    }

    res.json({ message: "Donation deleted successfully!" });
  });
};

module.exports = { insertDonation, getDonations, updateReliefDonation,deleteReliefDonation };
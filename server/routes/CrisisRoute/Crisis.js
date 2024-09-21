const db = require("../../db/db");


const { v4: uuidv4 } = require("uuid"); // If you want to use UUIDs

const addCrisis = (req, res) => {
  const { id = uuidv4(), name, severity, date, location } = req.body;

  // Validate input
  if (!name || !severity || !date || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check for valid severity value
  const validSeverities = ["Low", "Moderate", "High", "Critical"];
  if (!validSeverities.includes(severity)) {
    return res.status(400).json({ error: "Invalid severity value." });
  }

  // Prepare SQL query to insert the new crisis with ID and location
  const sql =
    "INSERT INTO crisis (id, name, severity, date, location) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [id, name, severity, date, location], (err, result) => {
    if (err) {
      console.error("Error inserting crisis data:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(201).json({ message: "Crisis added successfully!", id });
  });
};



const updateCrisis = (req, res) => {
  const id = req.params.id;  
  const updates = req.body; 

  const fields = [];
  const values = [];

  // Check for severity update
  if (updates.severity) {
    if (["Low", "Moderate", "High", "Critical"].includes(updates.severity)) {
      fields.push("severity = ?");
      values.push(updates.severity);
    } else {
      return res.status(400).json({ error: "Invalid severity value." });
    }
  }

  // Check for status update
  if (updates.status) {
    if (["Pending", "Ongoing", "Resolved", "Closed"].includes(updates.status)) {
      fields.push("status = ?");
      values.push(updates.status);
    } else {
      return res.status(400).json({ error: "Invalid status value." });
    }
  }

  // Check for isApproved update
  if (typeof updates.isApproved === "boolean") {
    fields.push("isApproved = ?");
    values.push(updates.isApproved);
  }

  // Ensure at least one field is being updated
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  // Adding the ID to the values array
  values.push(id);

  const sql = `UPDATE crisis SET ${fields.join(", ")} WHERE id = ?`;

  // Execute the update query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating crisis:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.json({ message: "Crisis updated successfully!", result });
  });
};
// Assuming "Approved" is the status for approved crises
const getApprovedCrises = (req, res) => {
  const sql = "SELECT * FROM crisis WHERE isApproved = '1' "; // Query to get approved crises

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching approved crises:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(200).json(results); // Return the list of approved crises
  });
};





module.exports = { addCrisis, updateCrisis, getApprovedCrises };

const { v4: uuidv4 } = require("uuid");
const db = require("../../db/db");


const insertPurchase = (req, res) => {
  const { name, amount, cost } = req.body;

  if (!name || !amount || !cost) {
    return res
      .status(400)
      .json({ error: "Name, amount, and cost are required." });
  }

  const id = uuidv4(); 
  const query = `INSERT INTO purchase (id, name, amount, cost) VALUES (?, ?, ?, ?)`;

  db.query(query, [id, name, amount, cost], (err, result) => {
    if (err) {
      console.error("Error inserting purchase:", err);
      return res.status(500).json({ error: "Error adding purchase." });
    }
    res.status(200).json({ message: "Purchase added successfully." });
  });
};


const getPurchases = (req, res) => {
  const query = `SELECT * FROM purchase`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching purchases:", err);
      return res.status(500).json({ error: "Error retrieving purchases." });
    }
    res.json({ purchases: results });
  });
};


const updatePurchase = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const fields = [];
  const values = [];


  if (updates.name) {
    fields.push("name = ?");
    values.push(updates.name);
  }

  if (updates.amount) {
    fields.push("amount = ?");
    values.push(updates.amount);
  }

 
  if (updates.cost) {
    fields.push("cost = ?");
    values.push(updates.cost);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  values.push(id);

  const sql = `UPDATE purchase SET ${fields.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating purchase:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Purchase not found." });
    }
    res.json({ message: "Purchase updated successfully!", result });
  });
};


const deletePurchase = (req, res) => {
  const purchaseId = req.params.id;

  const sql = `DELETE FROM purchase WHERE id = ?`;

 
  db.query(sql, [purchaseId], (err, result) => {
    if (err) {
      console.error("Error deleting purchase:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Purchase not found." });
    }

    res.json({ message: "Purchase deleted successfully!" });
  });
};

module.exports = {
  insertPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
};

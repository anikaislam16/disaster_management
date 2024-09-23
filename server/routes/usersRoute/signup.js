const db = require('../../db/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET;

const signupUser = (req, res) => {
  const { name, age, phone, address, location, status, password } = req.body;
  console.log(req.body);

  if (
    !name ||
    !age ||
    !phone ||
    !address ||
    !location ||
    !status ||
    !password
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const checkPhoneQuery = "SELECT * FROM users WHERE phone = ?";
  db.query(checkPhoneQuery, [phone], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this phone number already exists." });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      const sql =
        "INSERT INTO users (name, age, phone, address, location, status, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [name, age, phone, address, location, status, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error inserting user data:", err);
            return res.status(500).json({ error: "Internal server error." });
          }
          res.json({ message: "User signed up successfully!" });
        }
      );
    });
  });
};




const loginUser = (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).send("Phone number and password are required.");
  }

  const sql = "SELECT * FROM users WHERE phone = ?";
  db.query(sql, [phone], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).send("Internal server error.");
    }

    if (results.length === 0) {
      return res.status(401).send("User not found.");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal server error.");
      }

      if (!isMatch) {
        return res.status(401).send("Invalid password.");
      }

      const token = jwt.sign({ id: user.id, phone: user.phone }, jwtSecret, {
        expiresIn: "1h",
      });

      // Send token and user information in the response
      res.json({
        token,
        user: { id: user.id, phone: user.phone, name: user.name ,location:user.location,role:"volunteer"},
      });
    });
  });
};


// Function to get users with status 'Approved'
const getApprovedUsers = (req, res) => {
  const sql = "SELECT id, name, age, phone, address, location, status FROM users WHERE status = 'Approved'";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching approved users:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(200).json(results);
  });
};
const getUsers = (req, res) => {
  const sql = `
  SELECT id, name, age, phone, address, location ,status
  FROM users 
 
`;


  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching approved users:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(200).json(results); 
  });
};


const updateUser = (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;
console.log(userId);

  const fields = [];
  const values = [];

 
  if (updates.status) {
    if (["Approved", "Not Approved"].includes(updates.status)) {
      fields.push("status = ?");
      values.push(updates.status);
    } else {
      return res.status(400).json({ error: "Invalid status value." });
    }
  }

 
  if (updates.location) {
    fields.push("location = ?");
    values.push(updates.location);
  }

  // Ensure at least one field is being updated
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  values.push(userId);

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;


  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User updated successfully!", result });
  });
};

module.exports = {
  signupUser,
  loginUser,
  getApprovedUsers,
  getUsers,
  updateUser
};
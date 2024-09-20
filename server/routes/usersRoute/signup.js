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

  // Validate the input fields
  if (!phone || !password) {
    return res.status(400).send("Phone number and password are required.");
  }

  // Check if user exists
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

    // Compare provided password with hashed password in database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal server error.");
      }

      if (!isMatch) {
        return res.status(401).send("Invalid password.");
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, phone: user.phone },
        jwtSecret,
        { expiresIn: "1h" } // Token expiration time
      );

      // Send the token in the response
      res.json({ token });
    });
  });
};
module.exports = { signupUser, loginUser };
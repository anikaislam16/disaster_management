const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET;

const signupadmin = (req, res) => {
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
        "INSERT INTO admin (name, age, phone, address, location, status, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [name, age, phone, address, location, status, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error inserting user data:", err);
            return res.status(500).json({ error: "Internal server error." });
          }
          res.json({ message: "admin signed up successfully!" });
        }
      );
    });
  });
};

const loginadmin = (req, res) => {
    const { phone, password } = req.body;
    console.log(phone);
    

  // Validate the input fields
  if (!phone || !password) {
    return res.status(400).send("Phone number and password are required.");
  }
    let p = phone.split("+")[0];
    console.log(p);
    
  // Check if user exists
  const sql = "SELECT * FROM admin WHERE phone = ?";
  db.query(sql, [phone.split('+')[1]], (err, results) => {
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
      const token = jwt.sign({ id: user.id, phone: user.phone }, jwtSecret, {
        expiresIn: "1h",
      });

      // Send token and user information in the response
      res.json({
        token,
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name,
          location: user.location,
          role: "admin",
        },
      });
    });
  });
};

// Function to get users with status 'Approved'
const getApprovedadmin = (req, res) => {
  const sql =
    "SELECT name, age, phone, address, location FROM admin WHERE status = 'Approved'";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching approved admin:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.status(200).json(results); // Return the list of approved users
  });
};

module.exports = { signupadmin, loginadmin, getApprovedadmin };

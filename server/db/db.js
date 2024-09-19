const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // MySQL host
  user: "root", // MySQL username
  password: "anika16", // MySQL password
  database: "disaster", // Database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});
module.exports = db;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "anika16", 
  database: "disaster", 
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});
module.exports = db;

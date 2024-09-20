// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const db = require("./db/db"); 
const  userController  = require('./routes/usersRoute/userController');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing application/json
// Define a route to test the database connection
app.get("/", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      res.status(500).send("Database query error");
    } else {
      res.send(`Database query result: ${results[0].solution}`);
    }
  });
});
app.use('/users', userController);
// Start the server
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
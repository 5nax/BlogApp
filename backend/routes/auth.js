// backend/routes/auth.js

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, results) => {
      if (err) throw err;
      res.send("User registered!");
    }
  );
});

// Import necessary dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate user from DB
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).send("Server error");
      }

      const user = results[0];
      if (!user || password !== user.password) {
        // Use hashed comparison in production
        return res.status(401).send("Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send token and user data
      res.json({
        token: token,
        user: {
          id: user.id,
          username: user.username,
          // Add other desired user properties here
        },
      });
    }
  );
});

module.exports = router;

const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import JWT library
const util = require("util");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Promisify the query function to use async/await
db.query = util.promisify(db.query);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // Specify filename
  },
});

const upload = multer({ storage: storage });

app.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Using ? as the placeholder
    const results = await db.query("SELECT * FROM articles WHERE id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).send("Article not found");
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.use("/uploads", express.static("uploads"));

app.get("/articles", async (req, res) => {
  try {
    let query = "SELECT * FROM articles";
    const search = req.query.search;

    if (search) {
      query += " WHERE title LIKE ?";
    }

    const results = await db.query(query, [`%${search}%`]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/articles", upload.single("articleImage"), async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const imagePath = req.file.path; // Get the uploaded image path
    const result = await db.query(
      "INSERT INTO articles (title, content, user_id, image_path) VALUES (?, ?, ?, ?)",
      [title, content, userId, imagePath]
    );

    const newArticle = {
      id: result.insertId,
      title,
      content,
      user_id: userId,
      image_path: imagePath,
    };

    res.status(201).json(newArticle);
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Update an article
app.put("/articles/:id", (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE articles SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }
      res.send("Article updated");
    }
  );
});

// Delete an article
app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM articles WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
    res.send("Article deleted");
  });
});

// Register a new user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Hash the password and validate data before inserting into the database
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }
      res.status(201).send("User registered");
    }
  );
});

app.get("/articles/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Use req.params.userId to get the user ID from URL
    console.log(userId);
    console.log(`Fetching articles for user ${userId}`);
    const results = await db.query("SELECT * FROM articles WHERE user_id = ?", [
      userId,
    ]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Login user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate and sanitize input data

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      const user = results[0];

      if (!user || password !== user.password) {
        return res.status(401).send("Invalid credentials");
      }

      // Generate a JWT token with user information
      const token = jwt.sign(
        { id: user.id, username: user.username },
        "your-secret-key"
      ); // Replace with your secret key

      // Send the token and user data in response
      res.json({
        token,
        user: { id: user.id, username: user.username },
      });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

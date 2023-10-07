// backend/routes/articles.js
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

dotenv.config();

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
app.get("/articles/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    db.query(
      "SELECT * FROM articles WHERE user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all articles
router.get("/", auth, async (req, res) => {
  try {
    const articles = await db.query(
      "SELECT * FROM articles WHERE user_id = ?",
      [req.user.id]
    );
    res.json(articles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Get a single article
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});

// Create article
router.post(
  "/",
  [
    auth,
    [
      body("title", "Title is required").not().isEmpty(),
      body("content", "Content is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, userId } = req.body;
      console.log(req.body);

      // Insert article into database
      const result = await db.query(
        "INSERT INTO articles(title, content, user_id) VALUES(?, ?, ?)",
        [title, content, userId]
      );

      const newArticle = {
        id: result.insertId,
        title,
        content,
        user_id: userId,
      };

      res.json(newArticle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update article
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const [article] = await db.query("SELECT * FROM articles WHERE id = ?", [
      id,
    ]);

    if (!article || article.user_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await db.query("UPDATE articles SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      id,
    ]);
    res.json({ msg: "Article updated" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete article
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const [article] = await db.query("SELECT * FROM articles WHERE id = ?", [
      id,
    ]);

    if (!article || article.user_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await db.query("DELETE FROM articles WHERE id = ?", [id]);
    res.json({ msg: "Article deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;

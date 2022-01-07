const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever requests comes with login endpoint with get method
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever requests comes with login endpoint with post method
router.post("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever requests comes with register endpoint
router.get("/register", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;

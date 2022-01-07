const express = require("express");
const router = express.Router();

const User = require("../models/users.model");

router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever get requests comes with login endpoint
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever post requests comes with login endpoint
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({
      email: req.body.email,
    });

    // If email does not match
    if (!user) return res.redirect(req.headers.referer);

    // Otherwise match the password
    const match = user.checkPassword(req.body.password);

    // if passwrd not match
    if (!match) return res.redirect(req.headers.referer);

    return res.redirect("/");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever get requests comes with register endpoint
router.get("/register", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Whenever post requests comes with register endpoint
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user, "User Created");
    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;

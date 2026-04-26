const express = require("express");
const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    res.json({ token: "success" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // simple response (no DB for now)
  res.json({ token: "registered" });
});

module.exports = router;
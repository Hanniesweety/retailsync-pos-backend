const express = require("express");
const router = express.Router();
console.log("NEW AUTH ROUTE LOADED");
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// ✅ USE REAL CONTROLLERS
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
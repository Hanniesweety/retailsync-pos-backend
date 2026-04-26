const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { _id: 1, name: "Laptop", price: 50000 },
    { _id: 2, name: "Phone", price: 20000 },
  ]);
});

module.exports = router;
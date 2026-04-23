const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const order = await Order.create({
      products,
      totalAmount,
      user: req.user.id
    });

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating order" });
  }
});

// GET ALL ORDERS
router.get("/", protect, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
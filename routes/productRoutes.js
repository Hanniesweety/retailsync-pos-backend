const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🟢 ADD PRODUCT (NO AUTH for now)
router.post("/", async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving product" });
  }
});

// 🟢 BULK ADD (🔥 IMPORTANT)
router.post("/bulk", async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Bulk insert error" });
  }
});

// 🟢 GET ALL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 🟢 DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Product = require("../models/Product");


// 🟢 ADD PRODUCT
router.post("/", protect, async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      stock
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving product" });
  }
});


// 🟢 GET ALL PRODUCTS
router.get("/", protect, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});


// 🟢 GET SINGLE PRODUCT
router.get("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching product" });
  }
});


// 🟢 UPDATE PRODUCT
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.stock = req.body.stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating product" });
  }
});


// 🟢 DELETE PRODUCT
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting product" });
  }
});


module.exports = router;
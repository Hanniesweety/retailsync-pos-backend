const Order = require("../models/Order");
const Product = require("../models/Product");

// CREATE ORDER (Billing)
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;

    // 🔥 Loop through items
    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // ❗ Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      // 💰 Calculate total
      total += product.price * item.quantity;

      // 📉 Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // 🧾 Save order
    const order = await Order.create({
      items,
      totalAmount: total,
    });

    res.json(order);

  } catch (err) {
    res.status(500).json(err);
  }
};

// 📋 GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
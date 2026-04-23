const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  user: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
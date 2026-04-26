const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // 🔥 IMPORTANT

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 DEBUG (optional - check env working)
console.log("MONGO_URI:", process.env.MONGO_URI);

// 🔥 CONNECT TO ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.log("DB ERROR ❌", err));

// routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// test
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
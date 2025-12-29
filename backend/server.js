const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
   ========================= */
app.use(cors());
app.use(express.json()); // 🔴 REQUIRED for JSON body
app.use(express.urlencoded({ extended: true })); // 🔴 REQUIRED for form-data

/* =========================
   ROUTES
   ========================= */
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const laptopRoutes = require("./routes/LaptopRoutes");
const orderRoutes = require("./routes/orderRoutes");
const sellRoutes = require("./routes/sellRoutes");

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sell", sellRoutes);
app.use("/uploads", express.static("uploads")); // 🔴 SERVE UPLOADED IMAGES

/* =========================
   TEST ROUTE
   ========================= */
app.get("/", (req, res) => {
  res.send("🚀 Laptop Store API is running");
});

/* =========================
   ERROR HANDLER (OPTIONAL)
   ========================= */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* =========================
   DATABASE + SERVER
   ========================= */
const PORT = process.env.PORT || 5000;

console.log("🔑 Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

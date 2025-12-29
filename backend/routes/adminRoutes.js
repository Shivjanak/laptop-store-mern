const express = require("express");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

/*console.log("✅ adminRoutes REGISTER LOADED"); */

/* ===== REGISTER ADMIN (TEMPORARY) ===== */
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     await Admin.create({ email, password });

//     res.json({ message: "Admin created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

/* ===== ADMIN LOGIN ===== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@gmail.com" || password !== "admin123") {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    {
      id: "admin-id",
      email: email,
      isAdmin: true // 🔥 THIS IS REQUIRED
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;

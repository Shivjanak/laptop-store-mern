const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/auth");
const adminProtect = require("../middleware/adminAuth");

const router = express.Router();

/* ======================
   CREATE ORDER (USER)
   ====================== */
router.post("/", protect, async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});
/* ======================
   GET USER ORDERS
   ====================== */
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ======================
   GET ALL ORDERS (ADMIN ONLY)
   ====================== */
router.get("/", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ======================
   UPDATE ORDER STATUS (ADMIN)
   ====================== */
router.put("/:id/status", adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
});

module.exports = router;

const express = require("express");
const SellRequest = require("../models/SellRequest");
const protect = require("../middleware/auth");
const adminProtect = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

const router = express.Router();

/* =====================
   USER → CREATE SELL REQUEST
   ===================== */
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("✅ SELL ROUTE HIT");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      console.log("USER:", req.user);

      const sellRequest = new SellRequest({
        user: req.user.id,
        laptopName: req.body.laptopName,
        condition: req.body.condition,
        description: req.body.description,
        expectedPrice: req.body.expectedPrice,
        image: req.file?.path
      });

      await sellRequest.save();
      res.status(201).json({ message: "Sell request submitted" });
    } catch (err) {
      console.error("❌ SELL ERROR:", err);
      res.status(500).json({ message: "Sell request failed" });
    }
  }
);

/* =====================
   ADMIN → VIEW ALL SELL REQUESTS
   ===================== */
router.get("/", adminProtect, async (req, res) => {
  const requests = await SellRequest.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(requests);
});

/* =====================
   ADMIN → UPDATE STATUS
   ===================== */
router.put("/:id/status", adminProtect, async (req, res) => {
  const request = await SellRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = req.body.status;
  await request.save();

  res.json(request);
});

module.exports = router;

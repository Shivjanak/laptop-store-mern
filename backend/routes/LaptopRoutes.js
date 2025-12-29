const express = require("express");
const Laptop = require("../models/Laptop");
const upload = require("../middleware/upload");
const protect = require("../middleware/auth");
const adminProtect = require("../middleware/adminAuth");

const router = express.Router();

/* ============================
   GET ALL LAPTOPS + SEARCH
   PUBLIC
   ============================ */
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: "i" } // 🔍 case-insensitive
        }
      : {};

    const laptops = await Laptop.find(keyword)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   GET SINGLE LAPTOP
   PUBLIC
   ============================ */
router.get("/:id", async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    res.json(laptop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   ADD LAPTOP
   ADMIN ONLY
   ============================ */
  router.post("/", adminProtect, upload.single("image"), async (req, res) => {
  try {
    const laptop = new Laptop({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      countInStock: req.body.countInStock,
      description: req.body.description,
      category: req.body.category,
      image: req.file.path
    });

    const saved = await laptop.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   UPDATE LAPTOP
   ADMIN ONLY
   ============================ */
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    laptop.name = req.body.name;
    laptop.brand = req.body.brand;
    laptop.price = req.body.price;
    laptop.description = req.body.description;
    laptop.countInStock = req.body.countInStock;
    laptop.category = req.body.category;

    if (req.file) {
      laptop.image = req.file.path;
    }

    const updated = await laptop.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ============================
   DELETE LAPTOP
   ADMIN ONLY
   ============================ */
router.delete("/:id", protect, async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndDelete(req.params.id);

    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    res.json({ message: "Laptop deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

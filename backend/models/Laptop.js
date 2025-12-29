const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String,
      trim: true
    },

    countInStock: {
      type: Number,
      default: 0,
      min: 0
    },

    image: {
      type: String,
      required: true
    },

    // ✅ CATEGORY REFERENCE (VERY IMPORTANT)
   category: {
  type: String,
  required: true
}
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Laptop", laptopSchema);

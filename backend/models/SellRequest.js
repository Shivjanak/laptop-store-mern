const mongoose = require("mongoose");

const sellRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    laptopName: String,
    condition: String,
    description: String,
    expectedPrice: Number,
    image: String,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellRequest", sellRequestSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [
      {
        laptop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Laptop",
          required: true
        },
        name: String,
        price: Number,
        image: String
      }
    ],

    shippingAddress: {
      address: String,
      phone: String
    },

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

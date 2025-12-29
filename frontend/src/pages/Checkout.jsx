import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // ✅ FIXED

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const placeOrder = async () => {
    if (!address || !phone) {
      alert("Fill delivery details");
      return;
    }

    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cart.map((item) => ({
            laptop: item._id,
            name: item.name,
            price: item.price,
            image: item.image
          })),
          shippingAddress: {
            address,
            phone
          },
          totalPrice: totalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Order placed successfully");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT: CART */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">🛒 Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain bg-gray-100 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                </div>
                <p className="font-bold text-blue-600">₹{item.price}</p>
              </div>
            ))
          )}

          <div className="flex justify-between mt-4 text-lg font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* RIGHT: DELIVERY */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">📦 Delivery Details</h2>

          <textarea
            placeholder="Full Address"
            className="w-full border p-3 rounded mb-4"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            ✅ Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellLaptop() {
  const navigate = useNavigate();

  const [laptopName, setLaptopName] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("Used");
  const [description, setDescription] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= SUBMIT ================= */
  const submitRequest = async (e) => {
    e.preventDefault();

    if (!laptopName || !expectedPrice || !image) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("laptopName", laptopName);   // ✅ MATCH BACKEND
      data.append("brand", brand);
      data.append("condition", condition);
      data.append("description", description);
      data.append("expectedPrice", expectedPrice);
      data.append("image", image);             // ✅ MATCH upload.single("image")

      await axios.post(
        "http://localhost:5000/api/sell",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );

      alert("✅ Sell request submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          💻 Sell Your Laptop
        </h2>

        <form onSubmit={submitRequest} className="space-y-4">

          <input
            type="text"
            placeholder="Laptop Name"
            className="w-full border p-3 rounded"
            value={laptopName}
            onChange={(e) => setLaptopName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Brand"
            className="w-full border p-3 rounded"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>Used</option>
            <option>New</option>
          </select>

          <textarea
            placeholder="Description"
            rows="3"
            className="w-full border p-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Expected Price (₹)"
            className="w-full border p-3 rounded"
            value={expectedPrice}
            onChange={(e) => setExpectedPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition`}
          >
            {loading ? "Submitting..." : "🚀 Submit Sell Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellLaptop;

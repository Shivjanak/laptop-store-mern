import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const banners = [
  "/banners/banner1.jpg",
  "/banners/banner2.webp",
  "/banners/banner3.jpg"
];

const categories = ["All", "Gaming", "Business", "Student", "Touchscreen"];

function Home() {
  const [index, setIndex] = useState(0);
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  /* ================= AUTO PLAY BANNER ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ================= LOAD LAPTOPS ================= */
  useEffect(() => {
    loadLaptops();
  }, []);

  const loadLaptops = async () => {
    const res = await axios.get("https://laptop-store-mern.onrender.com/api/laptops");
    setLaptops(res.data);
  };

  /* ================= FILTER LOGIC ================= */
  const filteredLaptops = laptops.filter((lap) => {
    const matchesSearch = lap.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || lap.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HERO SLIDER ================= */}
      <div className="relative w-full h-[450px] overflow-hidden shadow-md">
        <img
          src={banners[index]}
          alt="banner"
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Banner dots */}
        <div className="absolute bottom-4 flex justify-center w-full gap-2">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full ${
                index === i ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <input
          type="text"
          placeholder="Search laptops…"
          className="w-full p-4 rounded-lg shadow bg-white outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= CATEGORIES ================= */}
        <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border font-semibold transition
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
      {/* ================= TOP / FILTERED LAPTOPS ================= */}
      <div className="max-w-6xl mx-auto mt-12 px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "All"
            ? "🔥 All Categories Laptops"
            : `📂 ${selectedCategory} Laptops`}
        </h2>

        {filteredLaptops.length === 0 ? (
          <p className="text-gray-500">No laptops found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLaptops.slice(0, 6).map((lap) => (
              <div
                key={lap._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={lap.image}
                  alt={lap.name}
                  className="h-44 w-full object-contain mb-4"
                />

                <h3 className="font-semibold text-lg">{lap.name}</h3>
                <p className="text-gray-600">{lap.brand}</p>
                <p className="text-blue-600 font-bold text-lg mt-2">
                  ₹{lap.price}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Category: {lap.category}
                </p>

                <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => navigate(`/laptop/${lap._id}`)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View Details
              </button>

              <button
                onClick={() => addToCart(lap)}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-medium"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(lap);
                  navigate("/checkout");
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                💳 Buy Now
              </button>
            </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;

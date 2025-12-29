import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  /* ================= FIXED CATEGORIES ================= */
  const categories = ["Gaming", "Business", "Student", "Touchscreen"];

  /* ================= STATES ================= */
  const [laptops, setLaptops] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    countInStock: "",
    category: "",
    image: null
  });

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchLaptops();
  }, []);

  /* ================= FETCH LAPTOPS ================= */
  const fetchLaptops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/laptops");
      setLaptops(res.data);
    } catch (err) {
      console.error("Laptop fetch error", err);
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /* ================= ADD / UPDATE ================= */
  const submitLaptop = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", formData.name);
  data.append("brand", formData.brand);
  data.append("price", formData.price);
  data.append("countInStock", formData.countInStock);
  data.append("description", formData.description);
  data.append("category", formData.category);

  if (formData.image) {
    data.append("image", formData.image);
  }

  const url = editingId
    ? `http://localhost:5000/api/laptops/${editingId}`
    : "http://localhost:5000/api/laptops";

  const method = editingId ? "put" : "post";

  await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data"
    }
  });

  resetForm();
  fetchLaptops();
};

  /* ================= DELETE ================= */
  const deleteLaptop = async (id) => {
    if (!window.confirm("Delete this laptop?")) return;

    await axios.delete(`http://localhost:5000/api/laptops/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    fetchLaptops();
  };

  /* ================= EDIT ================= */
  const startEdit = (lap) => {
    setEditingId(lap._id);
    setFormData({
      name: lap.name,
      brand: lap.brand,
      price: lap.price,
      description: lap.description,
      countInStock: lap.countInStock,
      category: lap.category,
      image: null
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      countInStock: "",
      category: "",
      image: null
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    {/* PRODUCTS */}
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">🖥 Products</h2>
      <p className="text-gray-600 mb-4">Manage laptops</p>
      <button
        onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Products
      </button>
    </div>

    {/* ORDERS */}
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">📦 Orders</h2>
      <p className="text-gray-600 mb-4">Manage customer orders</p>
      <button
        onClick={() => navigate("/admin/orders")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Order Management
      </button>
    </div>
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">📦 SellRequests</h2>
      <p className="text-gray-600 mb-4">Sell Requests</p>
      <button
        onClick={() => navigate("/admin/sell-requests")}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Sell Requests
      </button>
      </div>
  </div>

      {/* ADD / EDIT LAPTOP */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Laptop" : "Add New Laptop"}
        </h2>

        <form
          onSubmit={submitLaptop}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input className="border p-2 rounded" name="name" placeholder="Laptop Name" value={formData.name} onChange={handleChange} required />
          <input className="border p-2 rounded" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
          <input className="border p-2 rounded" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input className="border p-2 rounded" name="countInStock" placeholder="Stock Count" value={formData.countInStock} onChange={handleChange} />

          {/* ✅ FIXED CATEGORY DROPDOWN */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            className="border p-2 rounded md:col-span-2"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input type="file" onChange={handleImageChange} className="md:col-span-2" />

          <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            {editingId ? "Update Laptop" : "Add Laptop"}
          </button>
        </form>
      </div>

      {/* MANAGE LAPTOPS */}
      <h2 className="text-xl font-semibold mb-4">Manage Laptops</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops.map((lap) => (
          <div key={lap._id} className="bg-white p-4 rounded shadow">
            <div className="flex gap-3 items-center mb-3">
              <img
                src={lap.image}
                alt={lap.name}
                className="h-16 w-16 object-contain bg-gray-100 rounded"
              />
              <div>
                <h3 className="font-semibold">{lap.name}</h3>
                <p className="text-sm">₹{lap.price}</p>
                <p className="text-xs text-gray-500">
                  Category: {lap.category}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(lap)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLaptop(lap._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

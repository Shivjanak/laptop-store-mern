import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLaptop() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    countInStock: "",
    image: null
  });

  const [loading, setLoading] = useState(false);

  /* =====================
     PROTECT ROUTE
     ===================== */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("price", Number(formData.price));
    data.append("description", formData.description);
    data.append("countInStock", Number(formData.countInStock));
    data.append("image", formData.image);

    try {
      setLoading(true);

      await axios.post(
        "https://laptop-store-mern.onrender.com/api/laptops",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      alert("✅ Laptop added successfully!");
      navigate("/admin/laptops");
    } catch (error) {
      console.error("Add laptop error:", error.response?.data || error.message);
      alert("❌ Failed to add laptop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Add New Laptop</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Laptop Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        /><br /><br />

        <input
          type="number"
          name="countInStock"
          placeholder="Stock Count"
          value={formData.countInStock}
          onChange={handleChange}
        /><br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Laptop"}
        </button>

      </form>
    </div>
  );
}

export default AddLaptop;

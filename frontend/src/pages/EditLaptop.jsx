import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditLaptop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    countInStock: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get(`https://laptop-store-mern.onrender.com/api/laptops/${id}`)
      .then((res) => setFormData(res.data));
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://laptop-store-mern.onrender.com/api/laptops/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      alert("Laptop updated");
      navigate("/admin/laptops");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Edit Laptop</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        /><br /><br />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
        /><br /><br />

        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        /><br /><br />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        /><br /><br />

        <input
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          placeholder="Stock"
        /><br /><br />

        <button type="submit">Update Laptop</button>
      </form>
    </div>
  );
}

export default EditLaptop;

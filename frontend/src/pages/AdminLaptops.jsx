import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLaptops() {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchLaptops();
  }, [navigate]);

  const fetchLaptops = async () => {
    const res = await axios.get("http://localhost:5000/api/laptops");
    setLaptops(res.data);
  };

  const deleteLaptop = async (id) => {
    if (!window.confirm("Are you sure you want to delete this laptop?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/laptops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });

      alert("Laptop deleted");
      fetchLaptops();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – Manage Laptops</h2>

      {laptops.map((lap) => (
        <div
          key={lap._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h4>{lap.name}</h4>
          <p>₹{lap.price}</p>

          <button onClick={() => navigate(`/admin/edit/${lap._id}`)}>
            Edit
          </button>

          <button
            style={{ marginLeft: "10px", color: "red" }}
            onClick={() => deleteLaptop(lap._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminLaptops;

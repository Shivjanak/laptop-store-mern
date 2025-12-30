import { useEffect, useState } from "react";
import axios from "axios";

function AdminSellRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/sell", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://laptop-store-mern.onrender.com/api/sell/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      }
    );
    fetchRequests();
  };

  return (
    <div className="grid gap-6">
  {requests.map((req) => (
    <div
      key={req._id}
      className="bg-white p-5 rounded shadow flex flex-col md:flex-row gap-6"
    >
      {/* ✅ IMAGE SECTION */}
      <img
        src={`https://laptop-store-mern.onrender.com/api/${req.image}`}
        alt={req.name}
        className="h-40 w-40 object-contain border rounded bg-gray-100"
      />

      {/* DETAILS */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{req.name}</h2>
        <p className="text-gray-600">{req.brand}</p>

        <p className="mt-1">
          Expected Price: <b>₹{req.expectedPrice}</b>
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Seller: {req.user?.name} ({req.user?.email})
        </p>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded text-white text-sm
            ${
              req.status === "Pending"
                ? "bg-yellow-500"
                : req.status === "Approved"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
        >
          {req.status}
        </span>
      </div>

      {/* ACTIONS */}
      {req.status === "Pending" && (
        <div className="flex gap-3 items-center">
          <button
            onClick={() => updateStatus(req._id, "Approved")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(req._id, "Rejected")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  ))}
</div>
    );
}
export default AdminSellRequests;

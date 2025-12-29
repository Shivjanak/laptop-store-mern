import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });
    setOrders(res.data);
  };

  const updateStatus = async (orderId, status) => {
    await axios.put(
      `https://laptop-store-mern.onrender.com/api/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      }
    );
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Order Management</h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">
                  {order.user?.name}<br />
                  <span className="text-xs text-gray-500">
                    {order.user?.email}
                  </span>
                </td>

                <td className="p-3 font-bold">₹{order.totalPrice}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "Shipped")}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Mark as Shipped
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;

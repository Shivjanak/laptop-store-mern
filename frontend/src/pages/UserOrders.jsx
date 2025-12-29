import { useEffect, useState } from "react";
import axios from "axios";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    );
    setOrders(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">
                  Order ID: {order._id.slice(-6)}
                </span>

                <span
                  className={`px-3 py-1 rounded text-white text-sm
                    ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-green-600"
                    }
                  `}
                >
                  {order.status}
                </span>
              </div>

              {order.orderItems.map((item, i) => (
                <div key={i} className="flex gap-4 mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 object-contain bg-gray-100 rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-3 font-bold">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;

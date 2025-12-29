import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //   {isAdminLoggedIn && (
  //   <button
  //     onClick={() => navigate("/admin/orders")}
  //     className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold"
  //   >
  //     Orders
  //   </button>
  // )}

  /* ================= LOGOUT HANDLERS ================= */
  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
        >
          💻 Retech Hub
        </h1>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* CART (ONLY FOR USER) */}
          {userToken && (
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer hover:text-blue-400 transition"
            >
              <ShoppingCart size={26} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          )}

           <button
            onClick={() => navigate("/my-orders")}
            className="hover:text-blue-400"
          >
            My Orders
          </button>

          <button
            onClick={() => navigate("/sell")}
            className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
          >
            Sell Laptop
          </button>


          {/* USER INFO */}
          {userToken && userInfo && (
            <div className="flex items-center gap-2 text-sm">
              <User size={18} />
              <span>{userInfo.name}</span>
            </div>
          )}

          {/* LOGIN / REGISTER (WHEN NO LOGIN) */}
          {!userToken && !adminToken && (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-1.5 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 px-4 py-1.5 rounded-md font-medium hover:bg-blue-600 hover:border-blue-600 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* USER LOGOUT */}
          {userToken && (
            <button
              onClick={logoutUser}
              className="flex items-center gap-1 bg-red-600 px-4 py-1.5 rounded-md font-medium hover:bg-red-700 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {/* ADMIN CONTROLS */}
          {adminToken && (
            <>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-1 bg-yellow-500 px-4 py-1.5 rounded-md font-medium hover:bg-yellow-600 transition text-black"
              >
                <Shield size={16} />
                Admin
              </button>

              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1 bg-red-700 px-4 py-1.5 rounded-md font-medium hover:bg-red-800 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import AdminLogin from "./pages/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/Cart";
import LaptopDetails from "./pages/LaptopDetails";
import AddLaptop from "./pages/AddLaptop";
import Navbar from "./components/navbar";
import AdminLaptops from "./pages/AdminLaptops";
import EditLaptop from "./pages/EditLaptop";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import SellLaptop from "./pages/SellLaptop";
import AdminSellRequests from "./pages/AdminSellRequests"
import UserOrders from "./pages/UserOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/laptop/:id" element={<LaptopDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin/add" element={<AddLaptop />} /> */}
        <Route path="/admin/laptops" element={<AdminLaptops />} />
        <Route path="/admin/edit/:id" element={<EditLaptop />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/sell" element={<SellLaptop />} />
        <Route path="/admin/sell-requests" element={<AdminSellRequests />} />
        <Route path="/my-orders" element={<UserOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

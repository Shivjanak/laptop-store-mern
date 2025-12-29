import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeItem, increaseQty, decreaseQty } =
    useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-5 transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      <button
        className="absolute top-4 right-4 text-xl"
        onClick={toggleCart}
      >
        ❌
      </button>

      {cart.length === 0 ? (
        <p className="text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="border-b pb-3 mb-3 flex items-center gap-3"
          >
            <img
              src={item.image}
              className="h-16 w-16 rounded object-cover"
              alt=""
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">₹{item.price}</p>

              {/* Qty buttons */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>

                <span className="px-3">{item.qty}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
        ))
      )}

      {/* FOOTER TOTAL */}
      {cart.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 border-t">
          <h3 className="font-semibold text-lg mb-3">
            Total: ₹
            {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
          </h3>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

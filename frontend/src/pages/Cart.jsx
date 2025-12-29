import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-4 mb-3 rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price} × {item.qty}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">Total: ₹{total}</h2>

          <button
            onClick={clearCart}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

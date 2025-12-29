import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function LaptopDetails() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const { addToCart } = useCart();


  useEffect(() => {
    axios
      .get(`https://laptop-store-mern.onrender.com/api/laptops/${id}`)
      .then((res) => setLaptop(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!laptop) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{laptop.name}</h2>
      <img src={laptop.image} alt={laptop.name} width="300" />
      <p>{laptop.description}</p>
      <h3>₹{laptop.price}</h3>
        <button
          onClick={() => addToCart(laptop)}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add to Cart
        </button>
    </div>
  );
}

export default LaptopDetails;

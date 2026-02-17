import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import { Link } from "react-router-dom";

const plantsArray = [
  {
    category: "Indoor Plants",
    plants: [
      { name: "Snake Plant", price: 10, image: "/snake.jpg" },
      { name: "Peace Lily", price: 12, image: "/lily.jpg" },
      { name: "Spider Plant", price: 8, image: "/spider.jpg" },
      { name: "Aloe Vera", price: 9, image: "/aloe.jpg" },
      { name: "Fern", price: 11, image: "/fern.jpg" },
      { name: "Rubber Plant", price: 15, image: "/rubber.jpg" },
    ],
  },
  {
    category: "Outdoor Plants",
    plants: [
      { name: "Rose", price: 14, image: "/rose.jpg" },
      { name: "Tulip", price: 13, image: "/tulip.jpg" },
      { name: "Sunflower", price: 10, image: "/sunflower.jpg" },
      { name: "Lavender", price: 16, image: "/lavender.jpg" },
      { name: "Hibiscus", price: 12, image: "/hibiscus.jpg" },
      { name: "Daisy", price: 9, image: "/daisy.jpg" },
    ],
  },
  {
    category: "Succulents",
    plants: [
      { name: "Cactus", price: 7, image: "/cactus.jpg" },
      { name: "Echeveria", price: 8, image: "/eche.jpg" },
      { name: "Jade Plant", price: 11, image: "/jade.jpg" },
      { name: "Agave", price: 13, image: "/agave.jpg" },
      { name: "Sedum", price: 6, image: "/sedum.jpg" },
      { name: "Haworthia", price: 9, image: "/haw.jpg" },
    ],
  },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart({ ...addedToCart, [plant.name]: true });
  };

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart 🛒 ({totalQuantity})</Link>
      </nav>

      <h1>Our Plants</h1>

      {plantsArray.map((category, index) => (
        <div key={index}>
          <h2>{category.category}</h2>

          <div className="plant-grid">
            {category.plants.map((plant) => (
              <div key={plant.name} className="plant-card">
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>

                <button
                  disabled={addedToCart[plant.name]}
                  onClick={() => handleAdd(plant)}
                >
                  {addedToCart[plant.name]
                    ? "Added"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

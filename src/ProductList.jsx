import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";
import "./ProductList.css";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const dispatch = useDispatch();

  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: "$15", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg" },
        { name: "Spider Plant", cost: "$12", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg" },
        { name: "Peace Lily", cost: "$18", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg" },
        { name: "Boston Fern", cost: "$20", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg" },
        { name: "Rubber Plant", cost: "$17", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg" },
        { name: "Aloe Vera", cost: "$14", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Chamomile", cost: "$15", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg" },
        { name: "Peppermint", cost: "$13", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg" },
        { name: "Calendula", cost: "$12", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg" },
        { name: "Echinacea", cost: "$16", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg" },
        { name: "Lemon Balm", cost: "$14", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg" },
        { name: "Aloe Vera 2", cost: "$14", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", cost: "$25", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361" },
        { name: "Pothos", cost: "$10", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg" },
        { name: "Snake Plant 2", cost: "$15", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg" },
        { name: "Succulent", cost: "$18", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg" },
        { name: "Aglaonema", cost: "$22", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg" },
        { name: "Cast Iron Plant", cost: "$20", image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h2 onClick={onHomeClick}>Paradise Nursery</h2>
        <div>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            🛒 {totalItems}
          </button>
        </div>
      </div>

      {/* Products */}
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h2 className="category">{category.category}</h2>

          <div className="product-grid">
            {category.plants.map((plant, i) => (
              <div key={i} className="card">
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.cost}</p>

                <button
                  disabled={addedItems[plant.name]}
                  onClick={() => handleAddToCart(plant)}
                >
                  {addedItems[plant.name]
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

export default ProductList;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "./CartSlice";
import { Link } from "react-router-dom";

export default function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + calculateTotalCost(item),
      0
    );
  };

  const handleIncrement = (name) => {
    dispatch(updateQuantity({ name, amount: 1 }));
  };

  const handleDecrement = (name) => {
    dispatch(updateQuantity({ name, amount: -1 }));
  };

  const handleDelete = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.name} className="cart-item">
          <img src={item.image} width="80" />
          <h3>{item.name}</h3>
          <p>${item.price}</p>

          <div>
            <button onClick={() => handleDecrement(item.name)}>
              −
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => handleIncrement(item.name)}>
              +
            </button>
          </div>

          <p>Total: ${calculateTotalCost(item)}</p>

          <button onClick={() => handleDelete(item.name)}>
            Delete
          </button>
        </div>
      ))}

      <h2>Total Amount: ${calculateTotalAmount()}</h2>

      <button onClick={() => alert("Coming Soon")}>
        Checkout
      </button>

      <Link to="/plants">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

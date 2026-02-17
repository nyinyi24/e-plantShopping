import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (sum, item) =>
      sum + item.quantity * parseFloat(item.cost.substring(1)),
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {items.map((item, index) => (
        <div key={index} className="cart-card">
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>{item.cost}</p>

            <div>
              <button onClick={() => handleIncrement(item)}>
                +
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleDecrement(item)}>
                -
              </button>
            </div>

            <p>
              Subtotal: $
              {item.quantity *
                parseFloat(item.cost.substring(1))}
            </p>

            <button onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ${totalAmount.toFixed(2)}</h3>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>

      <button onClick={() => alert("Coming Soon")}>
        Checkout
      </button>
    </div>
  );
}

export default CartItem;

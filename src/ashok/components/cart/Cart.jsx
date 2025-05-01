import React from "react";
import { useCart } from "../../context/CartContext";
import "./style.css"; // Optional: for additional styling

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calculate total price of cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="container mt-5 cart-container">
      <h3 className="mb-4 text-primary">
        <i className="bi bi-cart4"></i> Your Cart
      </h3>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="list-group">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center flex-wrap shadow-sm mb-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="70"
                    height="70"
                    className="rounded shadow-sm mr-3"
                  />
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted">₹{item.price}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.qty - 1))
                    }
                  >
                    −
                  </button>
                  <span className="px-3">{item.qty}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="d-flex flex-column align-items-end">
                  <div className="text-muted">
                    Total: ₹{item.price * item.qty}
                  </div>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price of the Cart */}
          <div className="d-flex justify-content-between mt-4">
            <h5>Total Price:</h5>
            <h5>₹{totalPrice}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

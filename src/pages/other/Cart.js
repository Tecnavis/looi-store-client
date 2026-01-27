import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../config/axiosconfig";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ FETCH CART (FIXED)
  const fetchCartData = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/cart");

      if (res.data.success && res.data.cart) {
        setCartItems(res.data.cart.items || []);
        setTotalPrice(res.data.cart.totalPrice || 0);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      setCartItems([]);
      setTotalPrice(0);
    }
  }, []);

  // ✅ ALWAYS LOAD CART ON PAGE LOAD
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  // ============================
  // EMPTY CART UI
  // ============================
  if (!cartItems || cartItems.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h4>No items found in cart</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Your Cart</h3>

      {cartItems.map((item) => (
        <div
          key={`${item.product}-${item.size}-${item.color}`}
          className="d-flex justify-content-between align-items-center border-bottom py-3"
        >
          <div>
            <strong>{item.productName}</strong>
            <p className="mb-1">
              Size: {item.size} | Color: {item.color}
            </p>
            <p className="mb-1">Qty: {item.quantity}</p>
          </div>

          <div>
            <strong>₹{item.price * item.quantity}</strong>
          </div>
        </div>
      ))}

      <hr />
      <h4>Total: ₹{totalPrice}</h4>
    </Container>
  );
};

export default Cart;

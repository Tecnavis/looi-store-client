import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import axiosInstance from "../config/axiosconfig";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const res = await axiosInstance.get("/cart");

      if (res.data?.cart?.items) {
        setCartItems(res.data.cart.items);
        setCartCount(res.data.cart.items.length);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCartItems([]);
      setCartCount(0);
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login-register");
        return;
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      await axiosInstance.post(`/cart/${productId}`, { quantity });
      fetchCartData();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      await axiosInstance.delete(`/delete-cart/${productId}`);
      fetchCartData();
    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        fetchCartData
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

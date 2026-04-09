import React, { createContext, useContext, useState, useCallback } from 'react';
import axiosInstance from "../config/axiosconfig";
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get('/cart');

      if (response.data?.cart?.items) {
        setCartItems(response.data.cart.items);
        setCartCount(response.data.cart.items.length);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
      setCartCount(0);
    }
  }, []);

  // Clear cart locally AND on the server (called after order is placed)
  const clearCart = useCallback(async () => {
    setCartItems([]);
    setCartCount(0);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axiosInstance.delete('/clear-cart');
      }
    } catch (error) {
      // Non-fatal: local state is already cleared
      console.error('Error clearing server cart:', error);
    }
  }, []);

  const removeFromCart = async (productId, size) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axiosInstance.delete(`/delete-cart/${productId}`, {
        params: { size }
      });
      await fetchCartData();
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  const addToCart = async (
    productId,
    quantity = 1,
    size,
    color = '',
    hsn = '',
    sku = '',
    length = '',
    width = '',
    height = '',
    weight = ''
  ) => {
    try {
      if (!size) {
        alert("Please select size");
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login-register');
        return;
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const payload = {
        productId,
        quantity,
        size: size.trim().toUpperCase(),
        color,
        hsn,
        sku,
        length,
        width,
        height,
        weight,
      };

      await axiosInstance.post(`/cart/${productId}`, payload);
      await fetchCartData();
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error);
      throw error; // Re-throw so callers can show error feedback
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        removeFromCart,
        addToCart,
        fetchCartData,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
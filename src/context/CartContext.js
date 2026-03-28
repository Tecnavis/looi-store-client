// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from "../config/axiosconfig";

// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);

//   const fetchCartData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axiosInstance.get('/cart');
//         console.log('Cart response:', response.data); // Log the response for debugging

//         if (response.data && response.data.cart) {
//           const { cart } = response.data;
//           if (Array.isArray(cart.items)) {
//             setCartItems(cart.items);
//             setCartCount(cart.items.length);
//           } else {
//             console.error("Unexpected items structure in cart:", cart);
//             setCartItems([]);
//             setCartCount(0);
//           }
//         } else {
//           console.error("Unexpected response structure:", response.data);
//           setCartItems([]);
//           setCartCount(0);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartItems([]);
//       setCartCount(0);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     console.log("Removing product with ID:", productId);
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         await axiosInstance.delete(`/delete-cart/${productId}`);
//         await fetchCartData(); // Fetch updated cart data after removal
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const addToCart = async (productId, quantity = 1, size = '') => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         await axiosInstance.post('/add-to-cart', { productId, quantity, size });
//         await fetchCartData(); // Fetch updated cart data after adding
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       removeFromCart, 
//       addToCart,
//       fetchCartData 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// code a1

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from "../config/axiosconfig";
// import { useNavigate } from 'react-router-dom';

// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);

//   const fetchCartData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axiosInstance.get('/cart');
//         console.log('Cart response:', response.data);

//         if (response.data && response.data.cart) {
//           const { cart } = response.data;
//           if (Array.isArray(cart.items)) {
//             setCartItems(cart.items);
//             setCartCount(cart.items.length);
//           } else {
//             console.error("Unexpected items structure in cart:", cart);
//             setCartItems([]);
//             setCartCount(0);
//           }
//         } else {
//           console.error("Unexpected response structure:", response.data);
//           setCartItems([]);
//           setCartCount(0);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartItems([]);
//       setCartCount(0);
//     }
//   };

//   const removeFromCart = async (productId, size, color) => {
//     console.log("Removing product with ID:", productId);
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
//         // Pass size and color as query parameters
//         await axiosInstance.delete(`/delete-cart/${productId}`, {
//           params: {
//             size,
//             color
//           }
//         });
  
//         await fetchCartData();
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };
  
//   const addToCart = async (productId, quantity = 1, size = '', color = '') => {
//     try {
//       const token = localStorage.getItem('token');
//       if(!token) {
//         navigate('/login-register');
//         return;
//       }
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axiosInstance.post(  `/cart/${productId}`, { productId, quantity, size, color });
        
//         // Immediately update the cart count and items
//         setCartCount(prevCount => prevCount + 1);
//         setCartItems(prevItems => [...prevItems, response.data.item]);
        
//         // Fetch updated cart data to ensure consistency
//         await fetchCartData();
      
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       removeFromCart, 
//       addToCart,
//       fetchCartData 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



// original code b1

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from "../config/axiosconfig";
// import { useNavigate } from 'react-router-dom';

// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);

//   const fetchCartData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axiosInstance.get('/cart');
//         console.log('Cart response:', response.data);

//         if (response.data && response.data.cart) {
//           const { cart } = response.data;
//           if (Array.isArray(cart.items)) {
//             setCartItems(cart.items);
//             setCartCount(cart.items.length);
//           } else {
//             console.error("Unexpected items structure in cart:", cart);
//             setCartItems([]);
//             setCartCount(0);
//           }
//         } else {
//           console.error("Unexpected response structure:", response.data);
//           setCartItems([]);
//           setCartCount(0);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartItems([]);
//       setCartCount(0);
//     }
//   };

//   // const removeFromCart = async (productId, size, color) => {
//   //   console.log("Removing product with ID:", productId);
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     if (token) {
//   //       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
//   //       // Pass size and color as query parameters
//   //       await axiosInstance.delete(`/delete-cart/${productId}`, {
//   //         params: { size, color }
//   //       });
  
//   //       await fetchCartData();
//   //     }
//   //   } catch (error) {
//   //     console.error("Error removing item from cart:", error);
//   //   }
//   // };
 
//   const removeFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
//         const response = await axiosInstance.delete(`/delete-cart/${productId}`);
        
//         console.log(response.data.message); // Log the success message
  
//         await fetchCartData(); // Refresh cart data after successful removal
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         console.log("Item not found in cart. Refreshing cart data...");
//         await fetchCartData();
//       } else {
//         console.error("Error removing item from cart:", error);
//       }
//     }
//   };

//   const addToCart = async (productId, quantity = 1, size = '', color = '') => {
//     try {
//       const token = localStorage.getItem('token');
//       if(!token) {
//         navigate('/login-register');
//         return;
//       }
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const response = await axiosInstance.post(`/cart/${productId}`, { productId, quantity, size, color });
      
//       // Immediately update the cart count and items
//       setCartCount(prevCount => prevCount + 1);
//       setCartItems(prevItems => [...prevItems, response.data.item]);
      
//       // Fetch updated cart data to ensure consistency
//       await fetchCartData();
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       removeFromCart, 
//       addToCart,
//       fetchCartData 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



// CartContext.jsx
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

  // ✅ FIXED REMOVE (with size)
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

  // ✅ FIXED ADD TO CART
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
        size: size.trim().toUpperCase(), // ✅ normalize
        color,
        hsn,
        sku,
        length,
        width,
        height,
        weight,
      };

      console.log("Adding to cart:", payload); // 🔍 debug

      await axiosInstance.post(`/cart/${productId}`, payload);

      await fetchCartData();

    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        removeFromCart,
        addToCart,
        fetchCartData
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


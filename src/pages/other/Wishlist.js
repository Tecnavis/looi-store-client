// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { getDiscountPrice } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import { addToCart } from "../../store/slices/cart-slice";
// import { deleteFromWishlist, deleteAllFromWishlist } from "../../store/slices/wishlist-slice"
// import { Button, Card, Col, Row } from "react-bootstrap";
// import axiosInstance from "../../config/axiosconfig";
// import { Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaTimes } from 'react-icons/fa';



// const Wishlist = () => {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         const response = await axiosInstance.get('/get-allproduct'); // Ensure this URL is correct
//         setProducts(response.data.products); // Adjust based on your actual response structure
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching new arrivals:", err);
//         setError("Failed to load new arrivals");
//         setLoading(false);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   if (loading) {
//     return <Spinner animation="border" variant="primary" />;
//   }

//   if (error) {
//     return <div className="text-center">{error}</div>;
//   }

//   const handleCardClick = (productId) => {
//     navigate(`/product-tab-left/1`); // Navigate to the /cart page with productId
//   };



//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="Wishlist"
//         description="Wishlist page of flone react minimalist eCommerce template."
//       />
//       <LayoutOne headerTop="visible">
//         <div className="main-div ms-5 me-5"> 
//           <h4>My Wishlist(4 items)</h4>
//           <Row className="justify-content-center mt-5">
//       {products.map((product) => (
//         <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={product._id}>
//           <Card style={{ width: '100%', position: 'relative' }} onClick={() => handleCardClick(product._id)}>
//             {/* Close button */}
//             <FaTimes 
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 // handleClose(product._id); // Handle close event
//               }}
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 cursor: 'pointer',
//                 zIndex: 1,
//                 color: '#666', // Customize color
//               }} 
//             />

//             {product.coverImage ? (
//               <img
//                 src={`http://localhost:8000/uploads/${product.coverImage}`} // Adjusted to use product.coverImage
//                 alt={product.name}
//                 style={{ width: '100%', height: 'auto' }} // Maintain aspect ratio
//               />
//             ) : (
//               <p>No Cover Image Available</p>
//             )}

//             <Card.Body>
//               <Card.Title>{product.name}</Card.Title>
//               <Card.Text>
//                 {/* {product.description} */}
//                 <br />
//                 ₹ {product.price}
//                 <br />
//               </Card.Text>
//             </Card.Body>

//             <button style={{color: 'green', border: 'none', height: '40px'}}>Add to Cart</button>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//         </div>

//         {/* <div className="cart-main-area pt-90 pb-100">
//           <div className="container">
//             {wishlistItems && wishlistItems.length >= 1 ? (
//               <Fragment>
//                 <h3 className="cart-page-title">Your wishlist items</h3>
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="table-content table-responsive cart-table-content">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>Image</th>
//                             <th>Product Name</th>
//                             <th>Unit Price</th>
//                             <th>Add To Cart</th>
//                             <th>action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {wishlistItems.map((wishlistItem, key) => {
//                             const discountedPrice = getDiscountPrice(
//                               wishlistItem.price,
//                               wishlistItem.discount
//                             );
//                             const finalProductPrice = (
//                               wishlistItem.price * currency.currencyRate
//                             ).toFixed(2);
//                             const finalDiscountedPrice = (
//                               discountedPrice * currency.currencyRate
//                             ).toFixed(2);
//                             const cartItem = cartItems.find(
//                               item => item.id === wishlistItem.id
//                             );
//                             return (
//                               <tr key={key}>
//                                 <td className="product-thumbnail">
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       wishlistItem.id
//                                     }
//                                   >
//                                     <img
//                                       className="img-fluid"
//                                       src={
//                                         process.env.PUBLIC_URL +
//                                         wishlistItem.image[0]
//                                       }
//                                       alt=""
//                                     />
//                                   </Link>
//                                 </td>

//                                 <td className="product-name text-center">
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       wishlistItem.id
//                                     }
//                                   >
//                                     {wishlistItem.name}
//                                   </Link>
//                                 </td>

//                                 <td className="product-price-cart">
//                                   {discountedPrice !== null ? (
//                                     <Fragment>
//                                       <span className="amount old">
//                                         {currency.currencySymbol +
//                                           finalProductPrice}
//                                       </span>
//                                       <span className="amount">
//                                         {currency.currencySymbol +
//                                           finalDiscountedPrice}
//                                       </span>
//                                     </Fragment>
//                                   ) : (
//                                     <span className="amount">
//                                       {currency.currencySymbol +
//                                         finalProductPrice}
//                                     </span>
//                                   )}
//                                 </td>

//                                 <td className="product-wishlist-cart">
//                                   {wishlistItem.affiliateLink ? (
//                                     <a
//                                       href={wishlistItem.affiliateLink}
//                                       rel="noopener noreferrer"
//                                       target="_blank"
//                                     >
//                                       {" "}
//                                       Buy now{" "}
//                                     </a>
//                                   ) : wishlistItem.variation &&
//                                     wishlistItem.variation.length >= 1 ? (
//                                     <Link
//                                       to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
//                                     >
//                                       Select option
//                                     </Link>
//                                   ) : wishlistItem.stock &&
//                                     wishlistItem.stock > 0 ? (
//                                     <button
//                                       onClick={() =>
//                                         dispatch(addToCart(wishlistItem))
//                                       }
//                                       className={
//                                         cartItem !== undefined &&
//                                         cartItem.quantity > 0
//                                           ? "active"
//                                           : ""
//                                       }
//                                       disabled={
//                                         cartItem !== undefined &&
//                                         cartItem.quantity > 0
//                                       }
//                                       title={
//                                         wishlistItem !== undefined
//                                           ? "Added to cart"
//                                           : "Add to cart"
//                                       }
//                                     >
//                                       {cartItem !== undefined &&
//                                       cartItem.quantity > 0
//                                         ? "Added"
//                                         : "Add to cart"}
//                                     </button>
//                                   ) : (
//                                     <button disabled className="active">
//                                       Out of stock
//                                     </button>
//                                   )}
//                                 </td>

//                                 <td className="product-remove">
//                                   <button
//                                     onClick={() =>
//                                       dispatch(deleteFromWishlist(wishlistItem.id))
//                                     }
//                                   >
//                                     <i className="fa fa-times"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="cart-shiping-update-wrapper">
//                       <div className="cart-shiping-update">
//                         <Link
//                           to={process.env.PUBLIC_URL + "/shop-grid-standard"}
//                         >
//                           Continue Shopping
//                         </Link>
//                       </div>
//                       <div className="cart-clear">
//                         <button onClick={() => dispatch(deleteAllFromWishlist())}>
//                           Clear Wishlist
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="item-empty-area text-center">
//                     <div className="item-empty-area__icon mb-30">
//                       <i className="pe-7s-like"></i>
//                     </div>
//                     <div className="item-empty-area__text">
//                       No items found in wishlist <br />{" "}
//                       <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//                         Add Items
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div> */}


//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default Wishlist;

// --------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTimes } from 'react-icons/fa';
// import { Spinner, Row, Col, Card, Container } from "react-bootstrap";
// import axiosInstance from "../../config/axiosconfig";
// import LayoutOne from "../../layouts/LayoutOne";
// import SEO from "../../components/seo";


// const Wishlist = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem('token');

//         if (!token) {
//           navigate('/login-register');
//           setError("You need to be logged in to view your wishlist");
//           setLoading(false);
//           return;
//         }

//         // Set the Authorization header
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//         const response = await axiosInstance.get('/get-wishlist');
//         setWishlistItems(response.data.wishlist.products);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//         if (err.response && err.response.status === 406) {
//           setError("Authentication failed. Please log in again.");
//         } else {
//           setError("Failed to load wishlist. Please try again later.");
//         }
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   const handleCardClick = (productId) => {
//     navigate(`/product-tab-left/${productId}`);
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       await axiosInstance.delete(`/delete-wishlist/${productId}`);
//       setWishlistItems(wishlistItems.filter(item => item.productId._id !== productId));

//     } catch (err) {
//       console.error("Error removing item from wishlist:", err);
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await axiosInstance.post('/add-to-cart', { productId });
//       // Optionally, you can show a success message or update the UI
//     } catch (err) {
//       console.error("Error adding item to cart:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="text-center">{error}</div>
//       </Container>
//     );
//   }


//   return (
//     // <React.Fragment>
//     //   <SEO
//     //     titleTemplate="Wishlist"
//     //     description="Wishlist page of your e-commerce application."
//     //   />
//     //   <LayoutOne headerTop="visible">
//     //     <div className="main-div ms-5 me-5">
//     //       <h4>My Wishlist ({wishlistItems.length} items)</h4>
//     //       <Row className="justify-content-center mt-5">
//     //         {wishlistItems.map((item) => (
//     //           <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={item.productId._id}>
//     //             <Card style={{ width: '100%', position: 'relative' }} onClick={() => handleCardClick(item.productId._id)}>
//     //               <FaTimes
//     //                 onClick={(e) => {
//     //                   e.stopPropagation();
//     //                   handleRemoveFromWishlist(item.productId._id);
//     //                 }}
//     //                 style={{
//     //                   position: 'absolute',
//     //                   top: '10px',
//     //                   right: '10px',
//     //                   cursor: 'pointer',
//     //                   zIndex: 1,
//     //                   color: '#666',
//     //                 }}
//     //               />

//     //               {item.productId.coverImage ? (
//     //                 <Card.Img
//     //                   variant="top"
//     //                   src={`http://localhost:8000/uploads/${item.productId.coverImage}`}
//     //                   alt={item.productId.name}
//     //                 />
//     //               ) : (
//     //                 <Card.Body>No Cover Image Available</Card.Body>
//     //               )}

//     //               <Card.Body>
//     //                 <Card.Title>{item.productId.name}</Card.Title>
//     //                 <Card.Text>
//     //                   ₹ {item.productId.price}
//     //                 </Card.Text>
//     //               </Card.Body>

//     //               <button 
//     //                 style={{color: 'green', border: 'none', height: '40px'}}
//     //                 onClick={(e) => {
//     //                   e.stopPropagation();
//     //                   handleAddToCart(item.productId._id);
//     //                 }}
//     //               >
//     //                 Add to Cart
//     //               </button>
//     //             </Card>
//     //           </Col>
//     //         ))}
//     //       </Row>
//     //     </div>
//     //   </LayoutOne>
//     // </React.Fragment>
//     <React.Fragment>
//     <SEO
//       titleTemplate="Wishlist"
//       description="Wishlist page of your e-commerce application."
//     />
//     <LayoutOne headerTop="visible">
//       <Container className="py-5">
//         {wishlistItems.length === 0 ? (
//           <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//             <h4 className="text-center">Your wishlist is empty</h4>
//           </div>
//         ) : (
//           <>
//             <h4 className="mb-4">My Wishlist ({wishlistItems.length} items)</h4>
//             <Row>
//               {wishlistItems.map((item) => (
//                 <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.productId._id}>
//                   <Card style={{ height: '100%' }} onClick={() => handleCardClick(item.productId._id)}>
//                     <div className="position-relative">
//                       <FaTimes
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleRemoveFromWishlist(item.productId._id);
//                         }}
//                         style={{
//                           position: 'absolute',
//                           top: '10px',
//                           right: '10px',
//                           cursor: 'pointer',
//                           zIndex: 1,
//                           color: '#666',
//                         }}
//                       />
//                       {item.productId.coverImage ? (
//                         <Card.Img
//                           variant="top"
//                           src={`http://localhost:8000/uploads/${item.productId.coverImage}`}
//                           alt={item.productId.name}
//                         />
//                       ) : (
//                         <div className="p-3 text-center">No Cover Image Available</div>
//                       )}
//                     </div>
//                     <Card.Body className="d-flex flex-column">
//                       <Card.Title>{item.productId.name}</Card.Title>
//                       <Card.Text>₹ {item.productId.price}</Card.Text>
//                                   <button 
//                    style={{color: 'green', border: 'none', height: '40px'}}
//                    onClick={(e) => {
//                        e.stopPropagation();
//                        handleAddToCart(item.productId._id);
//                      }}
//                    >
//                     Add to Cart
//                   </button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </>
//         )}
//       </Container>
//     </LayoutOne>
//   </React.Fragment>
//   );
// };

// export default Wishlist;


// --------------------------------------------------------------------------


// import React, { useEffect, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTimes } from 'react-icons/fa';
// import { Spinner, Row, Col, Card, Container } from "react-bootstrap";
// import axiosInstance from "../../config/axiosconfig";
// import LayoutOne from "../../layouts/LayoutOne";
// import SEO from "../../components/seo";
// import { WishlistContext } from "../../context/WishlistContext";
// import cogoToast from 'cogo-toast';


// const Wishlist = () => {
//   const { wishlistItems, removeFromWishlist, fetchWishlistData } = useContext(WishlistContext);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeWishlist = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login-register');
//           setError("You need to be logged in to view your wishlist");
//           return;
//         }
//         await fetchWishlistData();
//       } catch (err) {
//         console.error("Error initializing wishlist:", err);
//         if (err.response && err.response.status === 406) {
//           setError("Authentication failed. Please log in again.");
//         } else {
//           setError("Failed to load wishlist. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeWishlist();
//   }, []);

//   const handleCardClick = (productId) => {
//     navigate(`/product-tab-left/${productId}`);
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     await removeFromWishlist(productId);
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await axiosInstance.post('/add-to-cart', { productId });
//       // Optionally show a success message
//     } catch (err) {
//       console.error("Error adding item to cart:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="text-center">{error}</div>
//       </Container>
//     );
//   }

//   return (
//     <React.Fragment>
//       <SEO
//         titleTemplate="Wishlist"
//         description="Wishlist page of your e-commerce application."
//       />
//       <LayoutOne headerTop="visible">
//         <Container className="py-5">
//           {wishlistItems.length === 0 ? (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//               <h4 className="text-center">Your wishlist is empty</h4>
//             </div>
//           ) : (
//             <>
//               <h4 className="mb-4">My Wishlist ({wishlistItems.length} items)</h4>
//               <Row>
//                 {wishlistItems.map((item) => (
//                   <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.productId._id}>
//                     <Card style={{ height: '100%' }} onClick={() => handleCardClick(item.productId._id)}>
//                       <div className="position-relative">
//                         <FaTimes
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRemoveFromWishlist(item.productId._id);
//                           }}
//                           style={{
//                             position: 'absolute',
//                             top: '10px',
//                             right: '10px',
//                             cursor: 'pointer',
//                             zIndex: 1,
//                             color: '#666',
//                           }}
//                         />
//                         {item.productId.coverImage ? (
//                           <Card.Img
//                             variant="top"
//                             src={`http://localhost:8000/uploads/${item.productId.coverImage}`}
//                             alt={item.productId.name}
//                           />
//                         ) : (
//                           <div className="p-3 text-center">No Cover Image Available</div>
//                         )}
//                       </div>
//                       {/* <Card.Body className="d-flex flex-column">
//                         <Card.Title>{item.productId.name}</Card.Title>
//                         <Card.Text>₹ {item.productId.price}</Card.Text>
//                         <button 
//                           style={{color: 'green', border: 'none', height: '40px'}}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAddToCart(item.productId._id);
//                           }}
//                         >
//                           Move to Cart
//                         </button>
//                       </Card.Body> */}
//                       <Card.Body style={{ height: '100%' }}>
//                         <Card.Title className="product-name" style={{ color: '#5b5b5b', fontSize: '16px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                           <b>{item.productId.name}</b>
//                         </Card.Title>
//                         <hr />
//                         <Card.Text style={{ flex: 1 }}>

//                           {/* <h5 style={{ color: '#999999' }}>{item.productId.subcategory}</h5> */}
//                           <b>₹ {item.productId.price}</b>
//                         </Card.Text>
//                         <button 
//                           style={{color: 'green', border: 'none', height: '40px'}}
//                           className="w-100"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAddToCart(item.productId._id);
//                           }}
//                         >
//                           Move to Cart
//                         </button>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </>
//           )}
//         </Container>
//       </LayoutOne>
//     </React.Fragment>
//   );
// };

// export default Wishlist;

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { Spinner, Row, Col, Card, Container, Modal, Form } from "react-bootstrap";
import axiosInstance from "../../config/axiosconfig";
import LayoutOne from "../../layouts/LayoutOne";
import SEO from "../../components/seo";
import { WishlistContext } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import cogoToast from 'cogo-toast';
import { Loader } from 'lucide-react';


const BASE_URL = 'https://looi-store-server-1.onrender.com';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, fetchWishlistData } = useContext(WishlistContext);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // States for the modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantityCount, setQuantityCount] = useState(1);
  const [productStock, setProductStock] = useState(0);

  useEffect(() => {
    const initializeWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login-register');
          setError("You need to be logged in to view your wishlist");
          return;
        }
        await fetchWishlistData();
      } catch (err) {
        console.error("Error initializing wishlist:", err);
        if (err.response && err.response.status === 406) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError("Failed to load wishlist. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeWishlist();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product-tab-left/${productId}`);
  };

  const handleRemoveFromWishlist = async (productId) => {
    await removeFromWishlist(productId);
  };

  const handleMoveToCart = (product) => {
    setSelectedProduct(product);
    // Set initial values
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].size);
      if (product.sizes[0].colors && product.sizes[0].colors.length > 0) {
        setSelectedColor(product.sizes[0].colors[0].color);
        setProductStock(product.sizes[0].colors[0].stock);
      }
    }
    setShowModal(true);
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSize || !selectedColor) {
        cogoToast.error("Please select size and color", { position: "top-right" });
        return;
      }

      await addToCart(selectedProduct._id, quantityCount, selectedSize, selectedColor);
      cogoToast.success("Product added to cart successfully", { position: "top-right" });
      setShowModal(false);
      // Optionally remove from wishlist after adding to cart
      await removeFromWishlist(selectedProduct._id);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      cogoToast.error("Failed to add product to cart", { position: "top-right" });
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSizeData = selectedProduct.sizes.find(s => s.size === size);
    const selectedColorData = selectedSizeData.colors.find(c => c.color === selectedColor);
    if (selectedColorData) {
      setProductStock(selectedColorData.stock);
    }
    setQuantityCount(1);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const sizeData = selectedProduct.sizes.find(s => s.size === selectedSize);
    if (sizeData) {
      const colorData = sizeData.colors.find(c => c.color === color);
      if (colorData) {
        setProductStock(colorData.stock);
      }
    }
    setQuantityCount(1);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loader size={38} className="animate-spin text-center" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">{error}</div>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Wishlist page of your e-commerce application."
      />
      <LayoutOne headerTop="visible">
        <Container className="py-5">
          {wishlistItems.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
              <h4 className="text-center">Your wishlist is empty</h4>
            </div>
          ) : (
            <>
              <h4 className="mb-4">My Wishlist ({wishlistItems.length} items)</h4>
              <Row>
                {wishlistItems.map((item) => (
                  <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.productId._id}>
                    <Card style={{ height: '100%' }} onClick={() => handleCardClick(item.productId._id)} className="ms-3 me-3">
                      <div className="position-relative">
                        <FaTimes
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromWishlist(item.productId._id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer',
                            zIndex: 1,
                            color: '#666',
                          }}
                        />
                        {item.productId.coverImage ? (
                          <Card.Img
                            variant="top"
                            src={`${BASE_URL}/uploads/${item.productId.coverImage}`}
                            alt={item.productId.name}
                            
                          />
                        ) : (
                          <div className="p-3 text-center">No Cover Image Available</div>
                        )}
                      </div>
                      <Card.Body style={{ height: '100%' }}>
                        <Card.Title className="product-name" style={{ color: '#5b5b5b', fontSize: '16px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <b>{item.productId.name}</b>
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ flex: 1 }}>
                          <b>₹ {item.productId.price}</b>
                        </Card.Text>
                        <button 
                          style={{color: 'green', border: '1px solid green', height: '40px', backgroundColor: 'white'}}
                          className="w-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveToCart(item.productId);
                          }}
                        >
                          Move to Cart
                        </button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>

        {/* Modal for size and color selection */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Select 
                    value={selectedSize} 
                    onChange={(e) => handleSizeChange(e.target.value)}
                  >
                    {selectedProduct.sizes.map((size, index) => (
                      <option key={index} value={size.size}>
                        {size.size}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Select 
                    value={selectedColor} 
                    onChange={(e) => handleColorChange(e.target.value)}
                  >
                    {selectedProduct.sizes
                      .find(s => s.size === selectedSize)?.colors
                      .map((color, index) => (
                        <option key={index} value={color.color}>
                          {color.color}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <div className="d-flex align-items-center">
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantityCount(Math.max(1, quantityCount - 1))}
                    >
                      -
                    </button>
                    <span className="mx-3">{quantityCount}</span>
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantityCount(Math.min(productStock, quantityCount + 1))}
                    >
                      +
                    </button>
                  </div>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button 
              style={{
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                padding: '8px 16px',
                borderRadius: '4px'
              }} 
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button 
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px'
              }} 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </Modal.Footer>
        </Modal>
      </LayoutOne>
    </React.Fragment>
  );
};

export default Wishlist;

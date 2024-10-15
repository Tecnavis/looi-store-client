
// -code a1

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { Accordion, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import image from "../../assets/images/logo/product/10011.jpg";
import '../../wrappers/product/styles/cartstyle.css';
import { useCart } from "../../context/CartContext";
import CheckoutHeader from "../../components/checkout-header/CheckOutHeader";


const Cart = () => {
  const { cartItems, removeFromCart, fetchCartData } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleClick = () => {
    const billingDetails = {
      cartTotal: calculateTotal(),
      gst: 0,  
      shippingCharges: 0,  
    };
  
    // Passing cartItems and billing details to the DeliveryAddress component
    navigate('/delivery-address', {
      state: { cartItems, billingDetails }
    });
  };
  

  // const handleRemoveItem = (productId, size, color) => {
  //   removeFromCart(productId, size, color);
  // };
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const renderCartContent = () => {
    if (!cartItems || cartItems.length === 0) {
      return (
        <div className="item-empty-area text-center">
          <div className="item-empty-area__icon mb-30">
            <i className="pe-7s-cart"></i>
          </div>
          <div className="item-empty-area__text">
            No items found in cart
          </div>
        </div>
      );
    }
    const handleQuantityChange = async (productId, size, newQuantity) => {
      try {
        const token = localStorage.getItem("token");  // Assuming the token is stored in localStorage
        
        const response = await fetch(`http://localhost:8000/cart/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add Authorization header
          },
          body: JSON.stringify({ size, quantity: newQuantity }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          fetchCartData(); // Refresh the cart data
        } else {
          console.error("Error updating cart:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    
    return (
      <>
        {cartItems.map((item) => (
          <Card className="cart-item-card" key={item._id}>
            <Card.Body>
              <Row className="align-items-center">
                {/* Product Image */}
                <Col xs={12} sm={3}>
                  <img
                    src={`http://localhost:8000/uploads/${item.coverImage || item.product?.coverImage || image}`}
                    alt="Product"
                    className="product-image"
                  />
                </Col>

                {/* Product Details */}
                <Col xs={12} sm={6} className="product-details">
                  <h5 style={{ fontFamily: '' }}><b>{item.productName || item.product?.name}</b></h5>
                  <h6 className="text-muted">Oversized T-Shirts</h6>

                  {/* Size and Quantity Section */}
                  {/* <Form.Group as={Row} className="align-items-center">
                    <Form.Label column xs="auto">Size:</Form.Label>
                    <Col xs="auto">
                      <Form.Control type="text" value={item.size} readOnly className="size-input" />
                    </Col>
                    <Form.Label column xs="auto">Qty:</Form.Label>
                    <Col xs="auto">
                      <Form.Select aria-label="Select quantity" defaultValue={item.quantity} className="quantity-select"
                     onChange={(e) => handleQuantityChange(item.product._id, item.size, e.target.value)}>
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group> */}
                  <Form.Group as={Row} className="align-items-center">
                    <Form.Label column xs="auto">Size:</Form.Label>
                    <Col xs="auto">
                      <Form.Control type="text" value={item.size} readOnly className="size-input" />
                    </Col>
                    <Form.Label column xs="auto">Qty:</Form.Label>
                    <Col xs="auto">
                      <Form.Select
                        aria-label="Select quantity"
                        defaultValue={item.quantity}
                        className="quantity-select"
                        onChange={(e) => handleQuantityChange(item.product._id, item.size, e.target.value)}
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>


                  <p className="text-danger">Hurry! Only 1 in stock</p>
                  {/* <p>Estimated Delivery by <strong>20 Oct</strong></p> */}
                </Col>

                {/* Price and Actions */}
                <Col xs={12} sm={3} className="price-and-actions">
                  <h5>₹ {item.price || item.product?.price}</h5>
                  <p className="text-muted mb-5">MRP incl. of all taxes</p>

                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}></Col> {/* This is kept empty, you can remove if unnecessary */}
                <Col xs={12} md={6}>
                  <div className="actions-buttons mt-3 d-flex flex-column flex-md-row">
                    <button
                      variant="outline-secondary"
                      className="remove-btn w-100 w-md-50 mb-2 mb-md-0 me-md-2"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      REMOVE
                    </button>

                    <button
                      className="wishlist-btn w-100 w-md-50"
                      variant="outline-secondary"
                    >
                      MOVE TO WISHLIST
                    </button>
                  </div>
                </Col>
              </Row>

            </Card.Body>
          </Card>

        ))}
        {/* <Button className="wishlist-btn w-100 mb-5" variant="outline-secondary">
          MOVE TO WISHLIST
        </Button> */}
      </>
    );
  };

  // const calculateTotal = () => {
  //   return cartItems.reduce((total, item) => total + ((item.price || item.product?.price || 0) * item.quantity), 0);
  // };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + ((item.price || item.product?.price || 0) * item.quantity), 0);
  };


  return (
    <React.Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-20 pb-100">
          {cartItems.length > 0 && (
            <>
              <CheckoutHeader currentStep="bag" />
              <hr />
            </>

          )}
          <Container className="mt-5">
            <Row>
              <Col md={8}>
                {renderCartContent()}
              </Col>
              <Col md={4}>
                {cartItems.length > 0 && (
                  <>
                    <Accordion defaultActiveKey="0" className="mb-4">
                      <Accordion.Item>
                        <Accordion.Header className="custom-accordion-header">Apply Coupons</Accordion.Header>
                        <Accordion.Body>
                          <Form className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Enter Code Here"
                              className="me-2 form-control-sm"
                            />
                            <Button variant="outline-success" size="sm">
                              APPLY
                            </Button>
                          </Form>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <h5 style={{ color: 'gray' }}>BILLING DETAILS</h5>
                    <Card className="mb-4" style={{ border: '0.5px solid lightgrey', borderRadius: 'none' }}>
                      <Card.Body>
                        <Row className="mb-2">
                          <Col>Cart Total</Col>
                          <Col className="text-end">₹ {calculateTotal()}</Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>GST</Col>
                          <Col className="text-end">₹ 0</Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>Shipping Charges</Col>
                          <Col className="text-end">₹ 0</Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Total Amount</Col>
                          <Col className="text-end">₹ {calculateTotal()}</Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    <Button onClick={handleClick} className="w-100" style={{ backgroundColor: 'teal', border: 'none' }}>
                      PLACE ORDER
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </React.Fragment>
  );
};

export default Cart;








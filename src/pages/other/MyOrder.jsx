// import React, { Fragment, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './myorder.css';
// import LayoutOne from "../../layouts/LayoutOne";
// import { Container, Card } from 'react-bootstrap';
// import axiosInstance from '../../config/axiosconfig'; 

// const MyOrder = () => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [cancelling, setCancelling] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrderById = async () => {
//             try {
//                 const token = localStorage.getItem('token');

//                 const response = await axiosInstance.get(`/getOrders/${orderId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (response.data.success) {
//                     setOrder(response.data.order);
//                 } else {
//                     console.error('Failed to fetch order:', response.data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching order data:', error);
//             }
//         };

//         fetchOrderById();
//     }, [orderId]);

//     const downloadInvoice = async () => {
//         try {
//             const response = await axiosInstance.get(`/invoice/${orderId}`, {
//                 responseType: 'blob',
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `invoice-${orderId}.pdf`);
//             document.body.appendChild(link);
//             link.click();
//         } catch (error) {
//             console.error('Error downloading invoice:', error);
//         }
//     };

//     if (!order) {
//         return <p>Loading...</p>;
//     }

//     const handlehome=()=>{
//         window.location.href="/";
//     }

//     // cancel order

//     const handleCancelOrder = async () => {
//         if (!window.confirm('Are you sure you want to cancel this order?')) {
//             return;
//         }

//         setCancelling(true);
//         setError(null);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axiosInstance.post(
//                 `/orders/${orderId}/cancel`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 // Update the order status in the state
//                 setOrder(prev => ({
//                     ...prev,
//                     orderStatus: 'Cancelled'
//                 }));
//                 alert('Order cancelled successfully');
//             } else {
//                 setError(response.data.message);
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to cancel order');
//         } finally {
//             setCancelling(false);
//         }
//     };

//     const renderCancelButton = () => {
//         if (order.orderStatus === 'Cancelled') {
//             return <button className="btn-download" disabled>Cancelled</button>;
//         }
        
//         if (order.orderStatus === 'Shipped') {
//             return <button className="btn-download" disabled>Cannot Cancel (Shipped)</button>;
//         }

//         return (
//             <button 
//                 className="btn-download" 
//                 onClick={handleCancelOrder}
//                 disabled={cancelling}
//             >
//                 {cancelling ? 'Cancelling...' : 'Cancel Order'}
//             </button>
//         );
//     };

//     return (
//         <Fragment>
//             <LayoutOne headerTop="visible">
//                 <Container className="mt-5 mb-5">
//                     <div className="my-orders">
//                         <h2>Order Details</h2>
//                         {order.orderItems.map((item, index) => (
//                             <Card className="order-item-card mb-4" key={index}>
//                                 <Card.Body>
//                                     <div className="order-header">
//                                         <div className="product-details">
//                                             <h4>{item.productName}</h4>
//                                             <p>Color: {item.color} | Size: {item.size}</p>
//                                             <p>₹{item.price} </p>
//                                         </div>
//                                         <div className="delivery-address">
//                                             <h5>Delivery Address</h5>
//                                             <p><strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong></p>
//                                             <p>{order.shippingAddress.houseBuilding}, {order.shippingAddress.streetArea}, {order.shippingAddress.cityDistrict} - {order.shippingAddress.postalCode}</p>
//                                             <p><strong>Phone number</strong>: {order.shippingAddress.phoneNumber}</p>
//                                         </div>
//                                         <div className="actions">
//                                             <h5>More Actions</h5>
//                                             <button onClick={downloadInvoice} className="btn-download">
//                                                 Invoice
//                                             </button>
//                                             {/* <button  className="btn-download ">
//                                                 Cancel
//                                             </button> */}
//                                             {renderCancelButton()}
//                                         </div>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         ))}
//                     </div>
//                 </Container>
//                 <div className='mt-5 mb-5 text-center'>
//                         <button className="btn" style={{ backgroundColor: '#000', color: '#fff' }} onClick={() => handlehome()}>Continue Shopping</button>
//                 </div>
//             </LayoutOne>
//         </Fragment>
//     );
// };

// export default MyOrder;
// -----------------------------------------------------------------------------
// modified code

// import React, { Fragment, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import LayoutOne from "../../layouts/LayoutOne";
// import { Container, Card, Row, Col, Button, Modal, Spinner, Alert, ProgressBar } from 'react-bootstrap';
// import axiosInstance from '../../config/axiosconfig';
// import './myorder.css';

// const OrderStatusBadge = ({ status }) => {
//   const getStatusColor = () => {
//     switch (status) {
//       case 'Shipped':
//         return 'success';
//       case 'Cancelled':
//         return 'danger';
//       case 'Processing':
//         return 'warning';
//       default:
//         return 'primary';
//     }
//   };

//   return (
//     <span className={`badge bg-${getStatusColor()} fs-6`}>
//       {status}
//     </span>
//   );
// };

// const OrderTimeline = ({ status }) => {
//   const steps = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
//   const currentStep = steps.indexOf(status) !== -1 ? steps.indexOf(status) : 1;
  
//   return (
//     <div className="order-timeline my-4">
//       <ProgressBar 
//         now={(currentStep / (steps.length - 1)) * 100} 
//         className="mb-3"
//       />
//       <Row className="text-center">
//         {steps.map((step, index) => (
//           <Col key={step}>
//             <div className={`timeline-step ${index <= currentStep ? 'active' : ''}`}>
//               <div className="timeline-number">{index + 1}</div>
//               <div className="timeline-label">{step}</div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// const MyOrder = () => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [cancelling, setCancelling] = useState(false);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [showCancelModal, setShowCancelModal] = useState(false);

//     useEffect(() => {
//         const fetchOrderById = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axiosInstance.get(`/getOrders/${orderId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (response.data.success) {
//                     setOrder(response.data.order);
//                 } else {
//                     setError(response.data.message);
//                 }
//             } catch (error) {
//                 setError('Failed to fetch order details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrderById();
//     }, [orderId]);

//     const downloadInvoice = async () => {
//         try {
//             const response = await axiosInstance.get(`/invoice/${orderId}`, {
//                 responseType: 'blob',
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `invoice-${orderId}.pdf`);
//             document.body.appendChild(link);
//             link.click();
//         } catch (error) {
//             setError('Error downloading invoice');
//         }
//     };

//     const handleCancelOrder = async () => {
//         setCancelling(true);
//         setError(null);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axiosInstance.post(
//                 `/orders/${orderId}/cancel`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 setOrder(prev => ({
//                     ...prev,
//                     orderStatus: 'Cancelled'
//                 }));
//                 setShowCancelModal(false);
//             } else {
//                 setError(response.data.message);
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'Failed to cancel order');
//         } finally {
//             setCancelling(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center min-vh-100">
//                 <Spinner animation="border" variant="primary" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="danger">
//                     <Alert.Heading>Error</Alert.Heading>
//                     <p>{error}</p>
//                 </Alert>
//             </Container>
//         );
//     }

//     if (!order) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="info">
//                     <Alert.Heading>No Order Found</Alert.Heading>
//                     <p>This order could not be found.</p>
//                 </Alert>
//             </Container>
//         );
//     }
    
//     return (
//         <Fragment>
//             <LayoutOne headerTop="visible">
//                 <Container className="py-5">
//                     {/* Order Header */}
//                     <Card className="mb-4 shadow-sm">
//                         <Card.Body>
//                             <Row className="align-items-center">
//                                 <Col md={8}>
//                                     <h4 className="mb-1">Order #{orderId}</h4>
//                                     <p className="text-muted mb-0">
//                                         Placed on {new Date(order.createdAt).toLocaleDateString()}
//                                     </p>
//                                 </Col>
//                                 <Col md={4} className="text-md-end">
//                                     <OrderStatusBadge status={order.orderStatus} />
//                                 </Col>
//                             </Row>
//                             <OrderTimeline status={order.orderStatus} />
//                         </Card.Body>
//                     </Card>

//                     {/* Order Items */}
//                     {order.orderItems.map((item, index) => (
//                         <Card key={index} className="mb-4 order-card shadow-sm">
//                             <Card.Body>
//                                 <Row>
//                                     {/* Product Details */}
//                                     <Col lg={4} className="mb-4 mb-lg-0">
//                                         <div className="product-info">
//                                             <h4>{item.productName}</h4>
//                                             <p className="text-muted mb-2">
//                                                 Color: {item.color} | Size: {item.size}
//                                             </p>
//                                             <h5 className="price">₹{item.price}</h5>
//                                         </div>
//                                     </Col>

//                                     {/* Delivery Address */}
//                                     <Col lg={4} className="mb-4 mb-lg-0">
//                                         <div className="delivery-info">
//                                             <h5 className="text-primary mb-3">Delivery Address</h5>
//                                             <p className="mb-1">
//                                                 <strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong>
//                                             </p>
//                                             <p className="mb-1">
//                                                 {order.shippingAddress.houseBuilding},
//                                                 <br />
//                                                 {order.shippingAddress.streetArea},
//                                                 <br />
//                                                 {order.shippingAddress.cityDistrict} - {order.shippingAddress.postalCode}
//                                             </p>
//                                             <p className="mb-0">
//                                                 <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
//                                             </p>
//                                         </div>
//                                     </Col>

//                                     {/* Actions */}
//                                     <Col lg={4}>
//                                         <div className="d-grid gap-2">
//                                             <Button 
//                                                 variant="outline-primary" 
//                                                 onClick={downloadInvoice}
//                                                 className="mb-2 w-75"
//                                                 size='sm'
//                                             >
//                                                 <i className="bi bi-download me-2"></i>
//                                                 Download Invoice
//                                             </Button>

//                                             {order.orderStatus !== 'Cancelled' && 
//                                              order.orderStatus !== 'Shipped' && (
//                                                 <Button 
//                                                     variant="outline-danger"
//                                                     onClick={() => setShowCancelModal(true)}
//                                                     disabled={cancelling}
//                                                     size='sm'
//                                                     className='w-75'
//                                                 >
//                                                     {cancelling ? 'Cancelling...' : 'Cancel Order'}
//                                                 </Button>
//                                             )}
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </Card.Body>
//                         </Card>
//                     ))}

//                     {/* Continue Shopping Button */}
//                     <div className="text-center mt-4">
//                         <Button 
//                             variant="dark" 
//                             size="md"
//                             onClick={() => window.location.href="/"}
//                             className="px-3"
//                         >
//                             Continue Shopping
//                         </Button>
//                     </div>
//                 </Container>

//                 {/* Cancel Order Modal */}
//                 <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Cancel Order</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Are you sure you want to cancel this order? This action cannot be undone.
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
//                             No, Keep Order
//                         </Button>
//                         <Button 
//                             variant="danger" 
//                             onClick={handleCancelOrder}
//                             disabled={cancelling}
//                         >
//                             {cancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </LayoutOne>
//         </Fragment>
//     );
// };

// export default MyOrder;


// --------------------------------------------------------

import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LayoutOne from "../../layouts/LayoutOne";
import { Container, Card, Row, Col, Button, Modal, Spinner, Alert, ProgressBar } from 'react-bootstrap';
import axiosInstance from '../../config/axiosconfig';
import './myorder.css';

const OrderStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Shipped':
        return 'success';
      case 'Cancelled':
        return 'danger';
      case 'Processing':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <span className={`badge bg-${getStatusColor()} fs-6`}>
      {status}
    </span>
  );
};

const OrderTimeline = ({ status }) => {
  const steps = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(status) !== -1 ? steps.indexOf(status) : 1;
  
  return (
    <div className="order-timeline my-4">
      <ProgressBar 
        now={(currentStep / (steps.length - 1)) * 100} 
        className="mb-3"
      />
      <Row className="text-center">
        {steps.map((step, index) => (
          <Col key={step}>
            <div className={`timeline-step ${index <= currentStep ? 'active' : ''}`}>
              <div className="timeline-number">{index + 1}</div>
              <div className="timeline-label">{step}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const MyOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get(`/getOrders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.success) {
                    setOrder(response.data.order);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Failed to fetch order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderById();
    }, [orderId]);

    const downloadInvoice = async () => {
        try {
            const response = await axiosInstance.get(`/invoice/${orderId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            setError('Error downloading invoice');
        }
    };

    const handleCancelOrder = async () => {
        setCancelling(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.post(
                `/orders/${orderId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                setOrder(prev => ({
                    ...prev,
                    orderStatus: 'Cancelled'
                }));
                setShowCancelModal(false);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container className="mt-5">
                <Alert variant="info">
                    <Alert.Heading>No Order Found</Alert.Heading>
                    <p>This order could not be found.</p>
                </Alert>
            </Container>
        );
    }

    const calculateTotalAmount = () => {
        return order.orderItems.reduce((total, item) => total + item.price, 0);
    };
    
    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <Container className="py-5">
                    {/* Order Header */}
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h4 className="mb-1">Order #{orderId}</h4>
                                    <p className="text-muted mb-0">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </Col>
                                <Col md={4} className="text-md-end">
                                    <OrderStatusBadge status={order.orderStatus} />
                                </Col>
                            </Row>
                            <OrderTimeline status={order.orderStatus} />
                        </Card.Body>
                    </Card>

                    {/* Order Details Card */}
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            {/* Order Items */}
                            <h5 className="mb-4">Order Items</h5>
                            {order.orderItems.map((item, index) => (
                                <Row key={index} className={`mb-3 ${index !== order.orderItems.length - 1 ? 'border-bottom pb-3' : ''}`}>
                                    <Col md={8}>
                                        <div className="product-info">
                                            <h6 className="mb-1">{item.productName}</h6>
                                            <p className="text-muted mb-1">
                                                Color: {item.color} | Size: {item.size}
                                            </p>
                                            <p className="mb-0">₹{item.price}</p>
                                        </div>
                                    </Col>
                                </Row>
                            ))}

                            <div className="border-top pt-3 mt-3">
                                <h6 className="mb-3">Total Amount: ₹{calculateTotalAmount()}</h6>
                            </div>

                            {/* Delivery Address */}
                            <div className="mt-4">
                                <h5 className="mb-3">Delivery Address</h5>
                                <p className="mb-1">
                                    <strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong>
                                </p>
                                <p className="mb-1">
                                    {order.shippingAddress.houseBuilding},
                                    <br />
                                    {order.shippingAddress.streetArea},
                                    <br />
                                    {order.shippingAddress.cityDistrict} - {order.shippingAddress.postalCode}
                                </p>
                                <p className="mb-0">
                                    <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 mt-4 justify-content-end">
                                <Button 
                                    variant="outline-primary" 
                                    onClick={downloadInvoice}
                                    size="sm"
                                >
                                    <i className="bi bi-download me-2"></i>
                                    Download Invoice
                                </Button>

                                {order.orderStatus !== 'Cancelled' && 
                                 order.orderStatus !== 'Shipped' && (
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => setShowCancelModal(true)}
                                        disabled={cancelling}
                                        size="sm"
                                    >
                                        {cancelling ? 'Cancelling...' : 'Cancel Order'}
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Continue Shopping Button */}
                    <div className="text-center mt-4">
                        <Button 
                            variant="dark" 
                            size="md"
                            onClick={() => window.location.href="/"}
                            className="px-3"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </Container>
                
                {/* Cancel Order Modal */}
                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to cancel this order? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
                            No, Keep Order
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={handleCancelOrder}
                            disabled={cancelling}
                        >
                            {cancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </LayoutOne>
        </Fragment>
    );
};

export default MyOrder;
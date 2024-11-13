import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './myorder.css';
import LayoutOne from "../../layouts/LayoutOne";
import { Container, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axiosconfig'; 

const MyOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [error, setError] = useState(null);

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
                    console.error('Failed to fetch order:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
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
            console.error('Error downloading invoice:', error);
        }
    };

    if (!order) {
        return <p>Loading...</p>;
    }

    const handlehome=()=>{
        window.location.href="/";
    }

    // cancel order

    const handleCancelOrder = async () => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }

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
                // Update the order status in the state
                setOrder(prev => ({
                    ...prev,
                    orderStatus: 'Cancelled'
                }));
                alert('Order cancelled successfully');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setCancelling(false);
        }
    };

    const renderCancelButton = () => {
        if (order.orderStatus === 'Cancelled') {
            return <button className="btn-download" disabled>Cancelled</button>;
        }
        
        if (order.orderStatus === 'Shipped') {
            return <button className="btn-download" disabled>Cannot Cancel (Shipped)</button>;
        }

        return (
            <button 
                className="btn-download" 
                onClick={handleCancelOrder}
                disabled={cancelling}
            >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
        );
    };

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <Container className="mt-5 mb-5">
                    <div className="my-orders">
                        <h2>Order Details</h2>
                        {order.orderItems.map((item, index) => (
                            <Card className="order-item-card mb-4" key={index}>
                                <Card.Body>
                                    <div className="order-header">
                                        <div className="product-details">
                                            <h4>{item.productName}</h4>
                                            <p>Color: {item.color} | Size: {item.size}</p>
                                            <p>₹{item.price} </p>
                                        </div>
                                        <div className="delivery-address">
                                            <h5>Delivery Address</h5>
                                            <p><strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong></p>
                                            <p>{order.shippingAddress.houseBuilding}, {order.shippingAddress.streetArea}, {order.shippingAddress.cityDistrict} - {order.shippingAddress.postalCode}</p>
                                            <p><strong>Phone number</strong>: {order.shippingAddress.phoneNumber}</p>
                                        </div>
                                        <div className="actions">
                                            <h5>More Actions</h5>
                                            <button onClick={downloadInvoice} className="btn-download">
                                                Invoice
                                            </button>
                                            {/* <button  className="btn-download ">
                                                Cancel
                                            </button> */}
                                            {renderCancelButton()}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Container>
                <div className='mt-5 mb-5 text-center'>
                        <button className="btn" style={{ backgroundColor: '#000', color: '#fff' }} onClick={() => handlehome()}>Continue Shopping</button>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default MyOrder;

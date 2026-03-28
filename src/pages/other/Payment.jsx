import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Form, Spinner, Row, Col, Alert, Badge } from 'react-bootstrap';
import Logo from '../../../src/assets/images/logo/LOOInew.png';
import axiosInstance from '../../config/axiosconfig';
import LayoutOne from "../../layouts/LayoutOne";
import CheckoutHeader from "../../components/checkout-header/CheckOutHeader";
import cogoToast from 'cogo-toast';
import { useCart } from '../../context/CartContext';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [paymentMode, setPaymentMode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    const { cartItems, billingDetails, selectedAddress } = location.state || {};

    // ── Read user info from localStorage ──────────────────────────────────────
    // Support multiple possible key names set during login
    const userId    = localStorage.getItem('userId')   || localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('email')    || localStorage.getItem('userEmail') || localStorage.getItem('user_email');
    const user      = (() => {
        try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
    })();

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                if (window.Razorpay) { resolve(true); return; }
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload  = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };
        loadRazorpayScript().then(setScriptLoaded);
    }, []);

    // Guard: redirect if navigated to directly without state
    if (!cartItems || !billingDetails || !selectedAddress) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Missing Information</Alert.Heading>
                    <p>Please go back and complete your delivery details.</p>
                </Alert>
            </Container>
        );
    }

    const handlePaymentChange = (event) => {
        setPaymentMode(event.target.value);
    };

    // ─── Build orderItems from cart items ────────────────────────────────────
    const buildOrderItems = () =>
        cartItems.map(item => ({
            productId:   item.productId   || item.product?._id || item.product,
            productName: item.productName || item.product?.name,
            quantity:    item.quantity,
            price:       item.price       || item.product?.price,
            color:       item.color  || '',
            size:        item.size   || '',
            hsn:         item.hsn    || '',
            sku:         item.sku    || '',
            length:      item.length || 0,
            width:       item.width  || 0,
            height:      item.height || 0,
            weight:      item.weight || 0,
        }));

    const buildShippingAddress = () => ({
        firstName:     selectedAddress.firstName,
        lastName:      selectedAddress.lastName,
        houseBuilding: selectedAddress.houseBuilding,
        streetArea:    selectedAddress.streetArea,
        landmark:      selectedAddress.landmark,
        postalCode:    selectedAddress.postalCode,
        cityDistrict:  selectedAddress.cityDistrict,
        country:       selectedAddress.country || 'India',
        state:         selectedAddress.state,
        phoneNumber:   selectedAddress.phoneNumber,
    });

    // ─── Pay on Delivery ─────────────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        if (!paymentMode) {
            cogoToast.error('Please select a payment method.');
            return;
        }
        // Validate essential user data before hitting the API
        if (!userId) {
            cogoToast.error('Session expired. Please log in again.');
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const orderData = {
                user:            userId,
                email:           userEmail || user?.email || '',
                orderItems:      buildOrderItems(),
                shippingAddress: buildShippingAddress(),
                paymentMethod:   'COD',
                paymentStatus:   'Pending',
                totalAmount:     billingDetails.cartTotal,
                skipShipping:    true,
            };

            const response = await axiosInstance.post('/postOrder', orderData);
            const orderId = response.data.order?._id || response.data?.orderId;

            if (!orderId) throw new Error('No order ID returned from server');

            clearCart();
            cogoToast.success('Order placed successfully!');
            navigate(`/myorders/${orderId}`);
        } catch (error) {
            console.error('Error placing order:', error);

            const errMsg = error.response?.data?.message || '';
            const fallbackOrderId =
                error.response?.data?.order?._id ||
                error.response?.data?.orderId;

            if (
                fallbackOrderId &&
                (errMsg.toLowerCase().includes('shipping') ||
                 errMsg.toLowerCase().includes('courier'))
            ) {
                clearCart();
                cogoToast.success('Order placed! Shipping label will be created shortly.');
                navigate(`/myorders/${fallbackOrderId}`);
                return;
            }

            cogoToast.error(errMsg || 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // ─── Razorpay Online Payment ──────────────────────────────────────────────
    // Correct flow:
    //   1. Create order in YOUR DB first  (/postOrder)  → get dbOrderId
    //   2. Open Razorpay with that amount
    //   3. On success → verify signature (/verify-payment) passing dbOrderId
    //      → backend marks order as Paid + Processing
    const handleRazorpayPayment = async (e) => {
        e.preventDefault();

        if (!scriptLoaded) {
            cogoToast.error('Payment gateway is loading. Please try again in a moment.');
            return;
        }
        if (!userId) {
            cogoToast.error('Session expired. Please log in again.');
            navigate('/login');
            return;
        }

        setIsLoading(true);
        let dbOrderId = null; // will hold the MongoDB _id of the saved order

        try {
            // ── STEP 1: Save order to DB first (paymentStatus = Pending) ──────
            const orderData = {
                user:            userId,
                email:           userEmail || user?.email || '',
                orderItems:      buildOrderItems(),
                shippingAddress: buildShippingAddress(),
                paymentMethod:   'Razorpay',
                paymentStatus:   'Pending',   // will be updated to Paid after verify
                totalAmount:     billingDetails.cartTotal,
                skipShipping:    true,         // courier will be pushed after payment
            };

            const orderRes = await axiosInstance.post('/postOrder', orderData);
            dbOrderId = orderRes.data.order?._id;

            if (!dbOrderId) throw new Error('Failed to create order record');

            // ── STEP 2: Create Razorpay payment order ─────────────────────────
            const amount = Math.round(billingDetails.cartTotal * 100); // paise
            const razorpayOrderRes = await axiosInstance.post('/order', {
                amount,
                currency: 'INR',
                receipt:  userId,
            });

            if (!razorpayOrderRes.data?.id) {
                throw new Error('Failed to create Razorpay order');
            }

            // ── STEP 3: Open Razorpay checkout ────────────────────────────────
            const options = {
                key:         process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount,
                currency:    'INR',
                name:        'LOOI',
                description: 'Payment for your order',
                image:       Logo,
                order_id:    razorpayOrderRes.data.id,
                handler: async function (response) {
                    try {
                        // ── STEP 4: Verify payment & update DB order to Paid ──
                        const verifyRes = await axiosInstance.post('/verify-payment', {
                            razorpay_order_id:   response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature:  response.razorpay_signature,
                            dbOrderId,   // ← tells backend which order to mark Paid
                        });

                        if (verifyRes.data?.success) {
                            clearCart();
                            cogoToast.success('Payment successful, order placed!');
                            navigate(`/myorders/${dbOrderId}`);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        cogoToast.error('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name:    user?.username || '',
                    email:   userEmail || user?.email || '',
                    contact: user?.phonenumber || user?.phone || '',
                },
                theme: { color: '#3399cc' },
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                cogoToast.error('Payment failed. Please try again.');
            });
            razorpayInstance.open();

        } catch (error) {
            console.error('Error initiating Razorpay payment:', error);
            const errMsg = error.response?.data?.message || error.message || '';
            cogoToast.error(errMsg || 'Failed to initiate payment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <CheckoutHeader currentStep="payment" />
                <hr className="mb-4" />

                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <Card className="shadow-lg border-0 rounded-3">
                                <Card.Header className="bg-primary text-white p-4">
                                    <h3 className="text-center mb-0 text-white">Complete Your Payment</h3>
                                </Card.Header>

                                <Card.Body className="p-4">
                                    {/* Order Summary Toggle */}
                                    <div className="mb-4">
                                        <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            onClick={() => setShowOrderSummary(!showOrderSummary)}
                                        >
                                            <h5 className="d-flex align-items-center">
                                                <i className={`bi bi-chevron-${showOrderSummary ? 'up' : 'down'} me-2`}></i>
                                                Order Summary
                                                <Badge bg="secondary" className="ms-2">₹{billingDetails.cartTotal}</Badge>
                                            </h5>
                                        </button>

                                        {showOrderSummary && (
                                            <div className="mt-3 p-3 bg-light rounded">
                                                <p className="mb-2"><strong>Shipping to:</strong></p>
                                                <p className="mb-1">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                                                <p className="mb-1">{selectedAddress.houseBuilding}, {selectedAddress.streetArea}</p>
                                                <p className="mb-1">{selectedAddress.cityDistrict}, {selectedAddress.postalCode}</p>
                                                <p className="mb-0">Phone: {selectedAddress.phoneNumber}</p>
                                                <hr />
                                                <p className="mb-1"><strong>Items:</strong></p>
                                                {cartItems.map((item, i) => (
                                                    <p key={i} className="mb-0 small">
                                                        {item.productName || item.product?.name} × {item.quantity} — ₹{(item.price || item.product?.price) * item.quantity}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Options */}
                                    <div className="payment-options">
                                        <h5 className="mb-3">Select Payment Method</h5>

                                        <div className="payment-option mb-3">
                                            <Form.Check
                                                type="radio"
                                                id="payOnDelivery"
                                                name="payment"
                                                className="payment-radio"
                                            >
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="payOnDelivery"
                                                    checked={paymentMode === 'payOnDelivery'}
                                                    onChange={handlePaymentChange}
                                                />
                                                <Form.Check.Label className="d-flex align-items-center">
                                                    <i className="bi bi-cash-coin me-2 text-success"></i>
                                                    Pay on Delivery
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>

                                        <div className="payment-option mb-4">
                                            <Form.Check
                                                type="radio"
                                                id="razorPay"
                                                name="payment"
                                                className="payment-radio"
                                            >
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="razorPay"
                                                    checked={paymentMode === 'razorPay'}
                                                    onChange={handlePaymentChange}
                                                    disabled={!scriptLoaded}
                                                />
                                                <Form.Check.Label className="d-flex align-items-center">
                                                    <i className="bi bi-credit-card me-2 text-primary"></i>
                                                    Pay Online with Razorpay
                                                    {!scriptLoaded && <span className="ms-2 text-muted">(Loading...)</span>}
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>

                                        {isLoading ? (
                                            <div className="text-center py-3">
                                                <Spinner animation="border" variant="primary" />
                                                <p className="mt-2 text-muted">Processing your order...</p>
                                            </div>
                                        ) : (
                                            <div className="d-grid gap-2">
                                                {paymentMode === 'payOnDelivery' && (
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="button"
                                                        onClick={handlePlaceOrder}
                                                    >
                                                        Place Order — ₹{billingDetails.cartTotal}
                                                    </button>
                                                )}

                                                {paymentMode === 'razorPay' && (
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="button"
                                                        onClick={handleRazorpayPayment}
                                                        disabled={!scriptLoaded}
                                                    >
                                                        Pay Now — ₹{billingDetails.cartTotal}
                                                    </button>
                                                )}

                                                {!paymentMode && (
                                                    <p className="text-center text-muted small">
                                                        Please select a payment method above
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </LayoutOne>
        </Fragment>
    );
};

export default Payment;

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

    const [paymentMode, setPaymentMode]           = useState('');
    const [isLoading, setIsLoading]               = useState(false);
    const [scriptLoaded, setScriptLoaded]         = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    const { cartItems, billingDetails, selectedAddress } = location.state || {};

    // ── Read user info from localStorage ─────────────────────────────────────
    const userId    = localStorage.getItem('userId')   || localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('email')    || localStorage.getItem('userEmail') || localStorage.getItem('user_email');
    const user      = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();

    // ── Compute total — tries EVERY possible field name / nesting shape ───────
    // Root cause of ₹1: billingDetails.cartTotal was undefined AND
    // item.price was being read as 0 because getCart only populates 'name'.
    // Cart model stores price directly on each item — use item.price first.
    const computedCartTotal = (() => {
        // 1. Check all billing field name variants
        const billVal = [
            billingDetails?.cartTotal,
            billingDetails?.total,
            billingDetails?.totalAmount,
            billingDetails?.totalPrice,
            billingDetails?.amount,
            billingDetails?.cart?.totalPrice,
        ].find(v => v !== undefined && v !== null && Number(v) > 0);
        if (billVal) return Number(billVal);

        // 2. Sum from cartItems (price is stored directly on each cart item)
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            const sum = cartItems.reduce((acc, item) => {
                const price = Number(
                    item.price          ??
                    item.sellingPrice   ??
                    item.salePrice      ??
                    item.product?.price ??
                    0
                );
                return acc + (price * (Number(item.quantity) || 1));
            }, 0);
            if (sum > 0) return sum;
        }
        return 0;
    })();

    // ── Debug log — open DevTools Console to see cart data shape ─────────────
    useEffect(() => {
        console.log('[Payment DEBUG] billingDetails:', JSON.stringify(billingDetails));
        console.log('[Payment DEBUG] cartItems[0]:', JSON.stringify(cartItems?.[0]));
        console.log('[Payment DEBUG] computedCartTotal:', computedCartTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Load Razorpay script ──────────────────────────────────────────────────
    useEffect(() => {
        const load = () => new Promise((resolve) => {
            if (window.Razorpay) { resolve(true); return; }
            const s = document.createElement('script');
            s.src = 'https://checkout.razorpay.com/v1/checkout.js';
            s.async = true;
            s.onload  = () => resolve(true);
            s.onerror = () => resolve(false);
            document.body.appendChild(s);
        });
        load().then(setScriptLoaded);
    }, []);

    // ── Guards ────────────────────────────────────────────────────────────────
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
    if (computedCartTotal <= 0) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    <Alert.Heading>Invalid Order Amount</Alert.Heading>
                    <p>Cart total is ₹0. Please go back and check your cart.</p>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
                </Alert>
            </Container>
        );
    }

    const handlePaymentChange = (e) => setPaymentMode(e.target.value);

    // ── Build order items ─────────────────────────────────────────────────────
    const buildOrderItems = () => cartItems.map(item => ({
        productId:   item.productId   || item.product?._id || item.product,
        productName: item.productName || item.product?.name,
        quantity:    item.quantity,
        price:       Number(item.price ?? item.product?.price ?? 0),
        color:       item.color   || '',
        size:        item.size    || '',
        hsn:         item.hsn     || '',
        sku:         item.sku     || '',
        length:      item.length  || 0,
        width:       item.width   || 0,
        height:      item.height  || 0,
        weight:      item.weight  || 0,
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

    // ── PAY ON DELIVERY ───────────────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        if (!paymentMode) { cogoToast.error('Please select a payment method.'); return; }
        if (!userId)      { cogoToast.error('Session expired. Please log in again.'); navigate('/login'); return; }

        setIsLoading(true);
        try {
            const orderData = {
                user:            userId,
                email:           userEmail || user?.email || '',
                orderItems:      buildOrderItems(),
                shippingAddress: buildShippingAddress(),
                paymentMethod:   'COD',
                paymentStatus:   'Pending',
                totalAmount:     computedCartTotal,
                skipShipping:    true,
            };

            console.log('[Payment] COD payload totalAmount:', orderData.totalAmount);
            const response = await axiosInstance.post('/postOrder', orderData);
            const orderId  = response.data.order?._id || response.data?.orderId;
            if (!orderId) throw new Error('No order ID returned');

            clearCart();
            cogoToast.success('Order placed successfully!');
            navigate(`/myorders/${orderId}`);
        } catch (error) {
            console.error('Error placing order:', error);
            const errMsg = error.response?.data?.message || '';
            const fallbackId = error.response?.data?.order?._id || error.response?.data?.orderId;
            if (fallbackId && (errMsg.toLowerCase().includes('shipping') || errMsg.toLowerCase().includes('courier'))) {
                clearCart();
                cogoToast.success('Order placed! Shipping will be updated shortly.');
                navigate(`/myorders/${fallbackId}`);
                return;
            }
            cogoToast.error(errMsg || 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // ── RAZORPAY PAYMENT ──────────────────────────────────────────────────────
    const handleRazorpayPayment = async (e) => {
        e.preventDefault();
        if (!scriptLoaded) { cogoToast.error('Payment gateway loading. Please wait.'); return; }
        if (!userId)       { cogoToast.error('Session expired. Please log in again.'); navigate('/login'); return; }

        setIsLoading(true);
        let dbOrderId = null;

        try {
            // STEP 1: Save order in DB first
            const orderData = {
                user:            userId,
                email:           userEmail || user?.email || '',
                orderItems:      buildOrderItems(),
                shippingAddress: buildShippingAddress(),
                paymentMethod:   'Razorpay',
                paymentStatus:   'Pending',
                totalAmount:     computedCartTotal,
                skipShipping:    true,
            };

            console.log('[Payment] Razorpay payload totalAmount:', orderData.totalAmount);
            const orderRes = await axiosInstance.post('/postOrder', orderData);
            dbOrderId = orderRes.data.order?._id;
            if (!dbOrderId) throw new Error('Failed to create order record');

            // STEP 2: Create Razorpay order
            const amountInPaise = Math.round(computedCartTotal * 100);
            console.log('[Payment] amountInPaise:', amountInPaise);

            const rzpOrderRes = await axiosInstance.post('/order', {
                amount:   amountInPaise,
                currency: 'INR',
                receipt:  `receipt_${Date.now()}`,
            });
            if (!rzpOrderRes.data?.id) throw new Error(rzpOrderRes.data?.message || 'Failed to create Razorpay order');

            // STEP 3: Open Razorpay checkout
            // Support both CRA (process.env) and Vite (import.meta.env) safely
            const rzpKey = process.env.REACT_APP_RAZORPAY_KEY_ID
                        || (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_RAZORPAY_KEY_ID : undefined)
                        || '';

            const options = {
                key:         rzpKey,
                amount:      amountInPaise,
                currency:    'INR',
                name:        'LOOI',
                description: 'Order Payment',
                image:       Logo,
                order_id:    rzpOrderRes.data.id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axiosInstance.post('/verify-payment', {
                            razorpay_order_id:   response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature:  response.razorpay_signature,
                            dbOrderId,
                        });
                        if (verifyRes.data?.success) {
                            clearCart();
                            cogoToast.success('Payment successful! Order placed.');
                            navigate(`/myorders/${dbOrderId}`);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        cogoToast.error('Payment verification failed. Contact support.');
                    }
                },
                prefill: {
                    name:    `${selectedAddress.firstName || ''} ${selectedAddress.lastName || ''}`.trim(),
                    email:   userEmail || user?.email || '',
                    contact: selectedAddress.phoneNumber || '',
                },
                theme: { color: '#3399cc' },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (r) => {
                console.error('Payment failed:', r.error);
                cogoToast.error('Payment failed. Please try again.');
            });
            rzp.open();

        } catch (error) {
            console.error('Error initiating Razorpay payment:', error);
            cogoToast.error(error.response?.data?.message || error.message || 'Failed to initiate payment.');
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

                                    {/* Order Summary */}
                                    <div className="mb-4">
                                        <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            onClick={() => setShowOrderSummary(!showOrderSummary)}
                                        >
                                            <h5 className="d-flex align-items-center gap-2 mb-0">
                                                <i className={`bi bi-chevron-${showOrderSummary ? 'up' : 'down'}`}></i>
                                                Order Summary
                                                <Badge bg="secondary">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</Badge>
                                                <span className="text-dark fw-bold">₹{computedCartTotal.toLocaleString('en-IN')}</span>
                                            </h5>
                                        </button>

                                        {showOrderSummary && (
                                            <div className="mt-3 p-3 bg-light rounded">
                                                <p className="mb-2"><strong>Shipping to:</strong></p>
                                                <p className="mb-1">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                                                <p className="mb-1">{selectedAddress.houseBuilding}, {selectedAddress.streetArea}</p>
                                                <p className="mb-1">{selectedAddress.cityDistrict}, {selectedAddress.postalCode}</p>
                                                <p className="mb-3">📞 {selectedAddress.phoneNumber}</p>
                                                <hr className="my-2" />
                                                <p className="mb-2"><strong>Items:</strong></p>
                                                {cartItems.map((item, i) => {
                                                    const p = Number(item.price ?? item.product?.price ?? 0);
                                                    return (
                                                        <div key={i} className="d-flex justify-content-between small mb-1">
                                                            <span>
                                                                {item.productName || item.product?.name} × {item.quantity}
                                                                {(item.size || item.color) && <span className="text-muted"> ({[item.size, item.color].filter(Boolean).join(', ')})</span>}
                                                            </span>
                                                            <span>₹{(p * item.quantity).toLocaleString('en-IN')}</span>
                                                        </div>
                                                    );
                                                })}
                                                <hr className="my-2" />
                                                <div className="d-flex justify-content-between fw-bold">
                                                    <span>Total</span>
                                                    <span>₹{computedCartTotal.toLocaleString('en-IN')}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Options */}
                                    <div className="payment-options">
                                        <h5 className="mb-3">Select Payment Method</h5>

                                        <div className="payment-option mb-3">
                                            <Form.Check type="radio" id="payOnDelivery" name="payment">
                                                <Form.Check.Input type="radio" value="payOnDelivery" checked={paymentMode === 'payOnDelivery'} onChange={handlePaymentChange} />
                                                <Form.Check.Label className="d-flex align-items-center">
                                                    <i className="bi bi-cash-coin me-2 text-success"></i> Pay on Delivery
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>

                                        <div className="payment-option mb-4">
                                            <Form.Check type="radio" id="razorPay" name="payment">
                                                <Form.Check.Input type="radio" value="razorPay" checked={paymentMode === 'razorPay'} onChange={handlePaymentChange} disabled={!scriptLoaded} />
                                                <Form.Check.Label className="d-flex align-items-center">
                                                    <i className="bi bi-credit-card me-2 text-primary"></i> Pay Online with Razorpay
                                                    {!scriptLoaded && <span className="ms-2 text-muted small">(Loading...)</span>}
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
                                                    <button className="btn btn-primary btn-lg" type="button" onClick={handlePlaceOrder}>
                                                        Place Order — ₹{computedCartTotal.toLocaleString('en-IN')}
                                                    </button>
                                                )}
                                                {paymentMode === 'razorPay' && (
                                                    <button className="btn btn-primary btn-lg" type="button" onClick={handleRazorpayPayment} disabled={!scriptLoaded}>
                                                        Pay Now — ₹{computedCartTotal.toLocaleString('en-IN')}
                                                    </button>
                                                )}
                                                {!paymentMode && (
                                                    <p className="text-center text-muted small mt-2">Please select a payment method above</p>
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
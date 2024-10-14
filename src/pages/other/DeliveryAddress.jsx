import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { Button, Card, Col, Row, Spinner, Form, Container, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosconfig";
import CheckoutHeader from "../../components/checkout-header/CheckOutHeader";

function DeliveryAddress() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch products if needed
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/get-allproduct');
                // Assuming you would do something with response.data
                // setProducts(response.data.products); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    return (
        <Fragment>
            <SEO
                titleTemplate="Wishlist"
                description="Wishlist page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                <div className="main-div ms-5 me-5  pt-20 pb-100"> 
                <CheckoutHeader currentStep="address" />
                <hr />
                    <Container className="mt-5">
                        <Row>
                            {/* Delivery Section */}
                            <Col md={6}>
                            <h5 style={{color:'gray' }}>DELIVERY TO</h5>
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <Button onClick={handleShow} variant="light" className="rounded-circle p-3 mb-3">
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                        <p>Add New Address</p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Billing Details Section */}
                            <Col md={6}>
                            <h5 style={{color:'gray' }}>BILLING DETAILS</h5>
                                <Card className="p-4 mb-4">
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col>Cart Total (Excl. of all taxes)</Col>
                                            <Col className="text-end">₹ 1994.69</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>Member Savings</Col>
                                            <Col className="text-end text-success">- ₹ 100.00</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>GST</Col>
                                            <Col className="text-end">₹ 239.31</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>Shipping Charges</Col>
                                            <Col className="text-end">₹ 0</Col>
                                        </Row>
                                        <hr />
                                        <Row className="fw-bold">
                                            <Col>Total Amount</Col>
                                            <Col className="text-end">₹ 2134.00</Col>
                                        </Row>
                                        <Button className="mt-3 w-100" style={{backgroundColor:'teal',border:'none'}}>
                                            CONTINUE TO PAYMENT
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Add New Address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Last Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="House No., Building Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Street Name, Area" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Landmark" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Postal Code" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="City/District" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Phone No" />
                                    </Form.Group>
                                   
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal> 
                    </Container>
                </div>
            </LayoutOne>
        </Fragment>
    );
}

export default DeliveryAddress;

import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import { Button, Card, Col, Row, Form, Container, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosconfig";
import CheckoutHeader from "../../components/checkout-header/CheckOutHeader";
import EditAddressModal from "./EditAddressModal";
import cogoToast from 'cogo-toast';
import { Loader } from 'lucide-react';
import indiaData from './indiaStates.json'


function DeliveryAddress() {

    const [addressDetails, setAddressDetails] = useState([]);
    const [defaultSelectedIndex, setDefaultSelectedIndex] = useState(0); // Default to the first address

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userId = localStorage.getItem('userId');

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        houseBuilding: '',
        streetArea: '',
        landmark: '',
        postalCode: '',
        cityDistrict: '',
        state: '',
        country: 'India',
        phoneNumber: ''
    });

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = (address) => {
        setSelectedAddress(address);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAddress(null);
    };

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
        // const fetchAddress = async () => {
        //     try {
        //         const token = localStorage.getItem('token');
        //         const userId = localStorage.getItem('userId');
        //         const response = await axiosInstance.get(`/user-details/${userId}`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 'Content-Type': 'application/json',
        //             },
        //         });
        //         // console.log("Full response data:", response.data);
        //         if (response.data && response.data.user && response.data.user.address) {
        //             setAddressDetails(response.data.user.address);
        //             console.log("Address details set:", response.data.user.address);
        //         } else {
        //             console.log("No address found in response");
        //             setAddressDetails(null);
        //         }
        //         setLoading(false);
        //     } catch (err) {
        //         console.error("Error fetching address:", err);
        //         setError("Failed to load address");
        //         setLoading(false);
        //     }
        // };

        // fetchAddress();
        fetchProducts();
    }, []);
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const response = await axiosInstance.get(`/user-details/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.data && response.data.user && response.data.user.address) {
                    const addresses = response.data.user.address;
                    setAddressDetails(addresses);
    
                    // Automatically select the first address as the default
                    if (addresses.length > 0) {
                        setDefaultSelectedIndex(0); // Default index to the first address
                    }
                } else {
                    setAddressDetails([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching address:", err);
                setError("Failed to load address");
                setLoading(false);
            }
        };
    
        fetchAddress();
    }, []);
    // Fetch products if needed
    const location = useLocation();
    const { cartItems, billingDetails } = location.state || {};

    if (!cartItems || !billingDetails) {
        return <div>Error: No data received from the cart</div>;
    }

    if (loading) {
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Loader size={38} className="animate-spin text-center" />
        </div>
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };
    const handleSaveAddress = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            console.log(userId);  // This should log the userId to the console

            const response = await axiosInstance.post(`/add-address/${userId}`, address);
            if (response.status === 200) {
                // Handle successful address update
                cogoToast.success("Address updated successfully:", response.data);
                window.location.reload();
                handleClose();
            }
        } catch (error) {
            console.error("Error saving address:", error);
            setError("Failed to update address");
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await axiosInstance.delete(`/delete-user/${userId}/address/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Remove the deleted address from the state
                setAddressDetails((prevAddresses) => prevAddresses.filter((address) => address._id !== addressId));
            }

        } catch (error) {
            console.error('Error deleting address:', error);
            setError('Could not delete address.');
        } finally {
            setLoading(false);
        }
    };

    const handleContinueToPayment = () => {
        if (addressDetails.length === 0) {
            cogoToast.info('Please add a delivery address');
            return;
        }
    
        navigate('/payment', {
            state: {
                cartItems,
                billingDetails,
                selectedAddress: addressDetails[defaultSelectedIndex],
            },
        });
    };
    

    return (
      <Fragment>
        <LayoutOne headerTop="visible">
          <div className="main-div pt-20 pb-100">
            <>
              <CheckoutHeader currentStep="address" />
              <hr />
            </>
            {/* <CheckoutHeader currentStep="address" />
                    <hr /> */}
            <Container className="mt-5">
              <Row>
                <Col md={6}>
                  <h5 style={{ color: "gray" }}>DELIVERY TO</h5>
                  {addressDetails.length > 0 ? (
                    addressDetails.map((address, index) => (
                      <Card key={index} className="mb-3 bg-light">
                        <Card.Body className="d-flex align-items-start">
                          <div className="flex-grow-1">
                            <Card.Title className="h5 mb-3">
                              <h4>
                                {address.firstName} {address.lastName}
                              </h4>
                            </Card.Title>
                            <Card.Text className="mb-1">
                              {address.houseBuilding}
                            </Card.Text>
                            <Card.Text className="mb-1">
                              {address.streetArea}
                            </Card.Text>
                            <Card.Text className="mb-1">
                              {address.cityDistrict}, {address.postalCode}
                            </Card.Text>
                            <Card.Text className="mb-3">
                              Mobile: <strong>{address.phoneNumber}</strong>
                            </Card.Text>
                            <div className="d-flex gap-2">
                              <button
                                style={{
                                  border: "#007fff 1px solid",
                                  color: "#007fff",
                                }}
                                className="edit-btn w-50 w-md-50"
                                onClick={() => handleEditClick(address)}
                              >
                                EDIT
                              </button>
                              <button
                                style={{
                                  border: "none",
                                  color: "white",
                                  backgroundColor: "red",
                                }}
                                className="remove-btn w-50 w-md-50"
                                onClick={() => deleteAddress(address._id)}
                              >
                                REMOVE
                              </button>
                            </div>
                            {selectedAddress && (
                              <EditAddressModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                address={selectedAddress}
                                userId={userId}
                                //    refreshAddresses={refreshAddresses}
                              />
                            )}
                          </div>
                          <input
                            type="radio"
                            style={{width:"2em",height:"2em"}}
                            name="addressSelection"
                            id={`address-select-${index}`}
                            className="ms-3 mt-1"
                            checked={defaultSelectedIndex === index}
                            onChange={() => setDefaultSelectedIndex(index)} // Update selected index on change
                          />
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p></p>
                  )}
                  <Card className="text-center p-5">
                    <Card.Body>
                      <Button
                        onClick={handleShow}
                        variant="light"
                        className="rounded-circle p-3 mb-3"
                      >
                        <i
                          className="fa-solid fa-plus"
                          style={{ color: "#007fff" }}
                        ></i>
                      </Button>
                      <p>Add New Address</p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Billing Details Section */}
                <Col md={6}>
                  <h5 className="mt-2" style={{ color: "gray" }}>
                    BILLING DETAILS
                  </h5>
                  <Card className="p-4 mb-4">
                    <Card.Body>
                      <Row className="mb-2">
                        <Col>Cart Total (Excl. of all taxes)</Col>
                        <Col className="text-end">
                          {billingDetails.cartTotal}
                        </Col>
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
                      <Row className="fw-bold">
                        <Col>Total Amount</Col>
                        <Col className="text-end">
                          {billingDetails.cartTotal}
                        </Col>
                      </Row>
                      <Button
                        onClick={handleContinueToPayment}
                        className="mt-3 w-100"
                        style={{ backgroundColor: "#007fff", border: "none" }}
                      >
                        CONTINUE TO PAYMENT
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={address.firstName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={address.lastName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="House No., Building Name"
                        name="houseBuilding"
                        value={address.houseBuilding}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Street Name, Area"
                        name="streetArea"
                        value={address.streetArea}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Landmark"
                        name="landmark"
                        value={address.landmark}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="City/District"
                        name="cityDistrict"
                        value={address.cityDistrict}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="country"
                        value={address.country}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State</option>
                        {indiaData.states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Phone No"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="secondary" onClick={handleSaveAddress}>
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


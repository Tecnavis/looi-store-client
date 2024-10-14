import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import axiosInstance from '../../config/axiosconfig';
import './styles/newarrivalstyle.css';
import { useNavigate } from 'react-router-dom';

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axiosInstance.get('/newarrival-product'); // Ensure this URL is correct
        setProducts(response.data.products); // Adjust based on your actual response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals");
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  // Limit the displayed products to 4
  const limitedProducts = products.slice(0, 4);

  const handleCardClick = (productId) => {
    navigate(`/product-tab-left/${productId}`); // Navigate to the /cart page with productId
  };

  return (
    <div className="product-area pb-60 section-padding-1">
      <div className="container-fluid">
        <h3 className="text-center my-5"><b>New Arrivals</b></h3>

        <Row className="justify-content-center">
          {limitedProducts.map((product) => (
            <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={product._id}>
              <Card style={{ width: '100%', border: 'none', height: '100%' }} onClick={() => handleCardClick(product._id)}>
                {product.coverImage ? (
                  <img
                    src={`http://localhost:8000/uploads/${product.coverImage}`}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                ) : (
                  <p>No Cover Image Available</p>
                )}
                <Card.Body style={{ height: '100%' }}>
                  <Card.Title className="product-name" style={{ color: '#5b5b5b', fontSize: '16px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <b>{product.name}</b>
                  </Card.Title>
                  <hr />
                  <Card.Text style={{ flex: 1 }}>

                    <h5 style={{ color: '#999999' }}>Men's T-shirts</h5>
                    <b>₹ {product.price}</b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    </div>
  );
}

export default NewArrival;

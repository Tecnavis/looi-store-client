import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import axiosInstance from '../../config/axiosconfig';
import './styles/newarrivalstyle.css';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageUrl';

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/get-allproduct');
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top selling:", err);
        setError("Failed to load top selling products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <div className="text-center">{error}</div>;

  const limitedProducts = products.slice(0, 4);
  const handleCardClick = (productId) => navigate(`/product-tab-left/${productId}`);

  return (
    <div className="product-area pb-60 section-padding-1">
      <div className="container-fluid">
        <h2 className='text-center mt-5 mb-4' style={{ color: "grey", fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>Top Selling</h2>
        <Row className="justify-content-center">
          {limitedProducts.map((product) => (
            <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={product._id}>
              <Card style={{ width: '100%' }} onClick={() => handleCardClick(product._id)}>
                {product.coverImage ? (
                  <img
                    src={getImageUrl(product.coverImage)}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : (
                  <p>No Cover Image Available</p>
                )}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}<br />₹ {product.price}<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopSelling;

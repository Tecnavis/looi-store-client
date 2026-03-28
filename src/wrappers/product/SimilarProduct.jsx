import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import axiosInstance from '../../config/axiosconfig';
import './styles/newarrivalstyle.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../helpers/imageUrl';

const SimilarProducts = ({ subcategory, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!subcategory || !subcategory._id) {
        setError("No subcategory provided");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get('/get-allproduct');
        if (!response.data?.products || !Array.isArray(response.data.products)) {
          setError("Unexpected data format from server");
          setLoading(false);
          return;
        }
        const filteredProducts = response.data.products.filter(
          p => p.subcategory === subcategory._id && p._id !== currentProductId
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load similar products: " + err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subcategory, currentProductId]);

  const handleCardClick = (productId) => {
    navigate(`/product-tab-left/${productId}`);
    window.location.reload();
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>{error}</p>;

  const limitedProducts = products.slice(0, 4);

  return (
    <div className="product-area pb-20 pt-60 section-padding-1">
      <div className="container-fluid">
        <h3 className="text-center my-5"><b>SIMILAR PRODUCTS</b></h3>
        <Row className="justify-content-center">
          {limitedProducts.map((product) => (
            <Col xs={6} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={product._id}>
              <Card style={{ width: '100%', border: 'none', height: '100%' }} onClick={() => handleCardClick(product._id)}>
                {product.coverImage ? (
                  <img
                    src={getImageUrl(product.coverImage)}
                    alt={product.name}
                    style={{ width: '100%', height: '380px', objectFit: 'cover' }}
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
                    <h5 style={{ color: '#999999' }}>{product.category}</h5>
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
};

SimilarProducts.propTypes = {
  subcategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    subcategoryname: PropTypes.string.isRequired
  }).isRequired,
  currentProductId: PropTypes.string.isRequired
};

export default SimilarProducts;

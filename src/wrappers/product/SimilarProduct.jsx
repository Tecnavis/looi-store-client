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
  const [navigatingId, setNavigatingId] = useState(null);
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
                  <div style={{ position: 'relative' }}>
                    <img
                      src={getImageUrl(product.coverImage)}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '380px',
                        objectFit: 'cover',
                        opacity: product.totalStock === 0 ? 0.6 : 1,
                        filter: product.totalStock === 0 ? 'grayscale(30%)' : 'none',
                      }}
                    />
                    {product.totalStock === 0 && (
                      <span style={{
                        position: 'absolute', top: '12px', left: '12px',
                        background: '#cc3333', color: '#fff', fontSize: '10px',
                        fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                        padding: '4px 10px', borderRadius: '50px',
                      }}>
                        Out of Stock
                      </span>
                    )}
                  </div>
                ) : (
                  <p>No Cover Image Available</p>
                )}
                <Card.Body style={{ height: '100%' }}>
                  <Card.Title className="product-name" style={{ color: '#5b5b5b', fontSize: '16px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <b>{product.name}</b>
                  </Card.Title>
                  <hr />
                  <Card.Text style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                    <span>
                      <h5 style={{ color: '#999999', margin: 0 }}>{product.category}</h5>
                      <b>₹ {product.price}</b>
                    </span>
                    {product.totalStock !== 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigatingId) return; // guard against double taps
                          setNavigatingId(product._id);
                          navigate(`/product-tab-left/${product._id}`);
                        }}
                        disabled={navigatingId === product._id}
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.4px',
                          textTransform: 'uppercase',
                          color: '#fff',
                          background: '#000000',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '7px 14px',
                          cursor: navigatingId === product._id ? 'wait' : 'pointer',
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {navigatingId === product._id && (
                          <Spinner animation="border" size="sm" style={{ width: '10px', height: '10px', borderWidth: '1.5px' }} />
                        )}
                        Buy Now
                      </button>
                    )}
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

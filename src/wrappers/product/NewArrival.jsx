import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosconfig';
import './styles/newarrivalstyle.css';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageUrl';

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axiosInstance.get('/newarrival-product');
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals");
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (error) return <div className="na-error">{error}</div>;
  if (loading) return (
    <section className="na-section">
      <div className="na-header">
        <span className="na-eyebrow">Just Dropped</span>
        <h2 className="na-title">New Arrivals</h2>
      </div>
      <div className="na-grid">
        {[1,2,3,4].map(i => <div key={i} className="na-skeleton" />)}
      </div>
    </section>
  );

  const limitedProducts = products.slice(0, 4);
  if (!limitedProducts.length) return null;

  return (
    <section className="na-section">
      <div className="na-header">
        <div>
          <span className="na-eyebrow">Just Dropped</span>
          <h2 className="na-title">New Arrivals</h2>
        </div>
        <button className="na-view-all" onClick={() => navigate('/shop-grid-full-width')}>
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>

      <div className="na-grid">
        {limitedProducts.map((product, i) => (
          <article
            key={product._id}
            className={`na-card ${hoveredId === product._id ? 'na-card--hovered' : ''}`}
            style={{ animationDelay: `${i * 100}ms` }}
            onClick={() => navigate(`/product-tab-left/${product._id}`)}
            onMouseEnter={() => setHoveredId(product._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="na-card-img-wrap">
              {product.coverImage ? (
                <img
                  src={getImageUrl(product.coverImage)}
                  alt={product.name}
                  className="na-card-img"
                />
              ) : (
                <div className="na-no-img">No Image</div>
              )}
              <div className="na-card-tag">New</div>
              <div className="na-card-overlay">
                <button className="na-quick-view">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Quick View
                </button>
              </div>
            </div>
            <div className="na-card-body">
              <div className="na-card-meta">{product.subcategory?.subcategoryname}</div>
              <h3 className="na-card-name">{product.name}</h3>
              <div className="na-card-footer">
                <span className="na-card-price">₹{product.price?.toLocaleString()}</span>
                <span className="na-card-arrow">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;

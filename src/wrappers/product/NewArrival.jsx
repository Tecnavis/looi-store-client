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
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [wishlistLoading, setWishlistLoading] = useState(new Set());
  const navigate = useNavigate();

  // Fetch user's existing wishlist so hearts render correctly
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axiosInstance.get('/get-wishlist');
        const ids = new Set(
          (res.data?.wishlist?.products || []).map(p =>
            p.productId?._id || p.productId
          )
        );
        setWishlistIds(ids);
      } catch (e) {
        // not logged in or no wishlist yet — silently ignore
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlist = async (e, product) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login-register'); return; }

    const id = product._id;
    if (wishlistLoading.has(id)) return;

    setWishlistLoading(prev => new Set([...prev, id]));
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      if (wishlistIds.has(id)) {
        await axiosInstance.delete(`/delete-wishlist/${id}`);
        setWishlistIds(prev => { const s = new Set(prev); s.delete(id); return s; });
      } else {
        await axiosInstance.post(`/add-wishlist/${id}`);
        setWishlistIds(prev => new Set([...prev, id]));
      }
    } catch (err) {
      console.error('Wishlist error:', err);
    } finally {
      setWishlistLoading(prev => { const s = new Set(prev); s.delete(id); return s; });
    }
  };

  const handleShare = (e, product) => {
    e.stopPropagation();
    const url = `${window.location.origin}/product-tab-left/${product._id}`;
    if (navigator.share) {
      navigator.share({ title: product.name, text: `Check out ${product.name}`, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        // Brief visual feedback handled by CSS class toggle
        const btn = e.currentTarget;
        btn.classList.add('na-share-copied');
        setTimeout(() => btn.classList.remove('na-share-copied'), 1800);
      });
    }
  };

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
    <section className="na-section" id="new-arrivals">
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
            className={`na-card ${hoveredId === product._id ? 'na-card--hovered' : ''} ${product.totalStock === 0 ? 'na-card--oos' : ''}`}
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
              {product.totalStock === 0 ? (
                <div className="na-card-tag na-card-tag--oos">Out of Stock</div>
              ) : (
                <div className="na-card-tag">New</div>
              )}
              <div className="na-card-overlay">
                <button
                  className="na-quick-view"
                  onClick={(e) => { e.stopPropagation(); navigate(`/product-tab-left/${product._id}`); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Quick View
                </button>
              </div>

              {/* Wishlist & Share — always visible, top-right corner */}
              <div className="na-card-actions">
                <button
                  className={`na-action-btn na-wishlist-btn ${wishlistIds.has(product._id) ? 'na-wishlist-btn--active' : ''} ${wishlistLoading.has(product._id) ? 'na-action-btn--loading' : ''}`}
                  onClick={(e) => handleWishlist(e, product)}
                  aria-label={wishlistIds.has(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={wishlistIds.has(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlistIds.has(product._id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>

                <button
                  className="na-action-btn na-share-btn"
                  onClick={(e) => handleShare(e, product)}
                  aria-label="Share product"
                  title="Share"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
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
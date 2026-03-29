import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosconfig';
import './styles/categories.css';

const resolveImage = (src) => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `https://looi-store-server-izvs.onrender.com/uploads/${src}`;
};

const CategoryGrid = () => {
  const navigate = useNavigate();
  const [categories, setCategories]     = useState([]);
  const [prints, setPrints]             = useState([]);
  const [catLoading, setCatLoading]     = useState(true);
  const [printLoading, setPrintLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/get-subcategory')
      .then(res => setCategories(res.data || []))
      .catch(err => console.error('Error fetching categories:', err))
      .finally(() => setCatLoading(false));
  }, []);

  useEffect(() => {
    axiosInstance.get('/get-print')
      .then(res => {
        const data = res.data?.prints || res.data || [];
        setPrints(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching prints:', err))
      .finally(() => setPrintLoading(false));
  }, []);

  return (
    <div className="looi-home-sections">

      {/* ── PRINTS SECTION ── */}
      <section className="looi-prints-section">
        <div className="looi-section-header">
          <span className="looi-section-tag">Explore</span>
          <h2 className="looi-section-title">Shop by Print</h2>
          <p className="looi-section-sub">Find your vibe, wear your story</p>
        </div>

        {printLoading ? (
          <div className="looi-grid-skeleton">
            {[1,2,3,4].map(i => <div key={i} className="looi-skeleton-card" />)}
          </div>
        ) : prints.length === 0 ? (
          <p className="looi-empty-msg">No prints available yet</p>
        ) : (
          <div className="looi-prints-grid">
            {prints.map((print, idx) => (
              <div
                key={print._id || idx}
                className="looi-print-card"
                onClick={() => navigate('/shop-grid-full-width')}
              >
                <div className="looi-print-img-wrap">
                  <img
                    src={resolveImage(print.image)}
                    alt={`print-${idx + 1}`}
                    className="looi-print-img"
                    onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                  />
                  <div className="looi-print-overlay">
                    <span className="looi-print-btn">Shop Now →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="looi-categories-section">
        <div className="looi-section-header">
          <span className="looi-section-tag">Browse</span>
          <h2 className="looi-section-title">Categories</h2>
          <p className="looi-section-sub">Discover our curated collections</p>
        </div>

        {catLoading ? (
          <div className="looi-grid-skeleton">
            {[1,2,3].map(i => <div key={i} className="looi-skeleton-card tall" />)}
          </div>
        ) : categories.length === 0 ? (
          <p className="looi-empty-msg">No categories available</p>
        ) : (
          <>
            <div className="looi-cat-grid-top">
              {categories.slice(0, 3).map((cat) => (
                <div
                  key={cat._id}
                  className="looi-cat-card"
                  onClick={() => navigate(`/shop-grid-full-width/${cat._id}`)}
                >
                  <div className="looi-cat-img-wrap">
                    <img
                      src={resolveImage(cat.images?.[0])}
                      alt={cat.subcategoryname || 'Category'}
                      className="looi-cat-img"
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                    <div className="looi-cat-overlay">
                      <span className="looi-cat-name">{cat.subcategoryname}</span>
                      <span className="looi-cat-cta">Explore →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {categories.length > 3 && (
              <div className="looi-cat-grid-bottom">
                {categories.slice(3).map((cat) => (
                  <div
                    key={cat._id}
                    className="looi-cat-card"
                    onClick={() => navigate(`/shop-grid-full-width/${cat._id}`)}
                  >
                    <div className="looi-cat-img-wrap">
                      <img
                        src={resolveImage(cat.images?.[0])}
                        alt={cat.subcategoryname || 'Category'}
                        className="looi-cat-img"
                        onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                      />
                      <div className="looi-cat-overlay">
                        <span className="looi-cat-name">{cat.subcategoryname}</span>
                        <span className="looi-cat-cta">Explore →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CategoryGrid;

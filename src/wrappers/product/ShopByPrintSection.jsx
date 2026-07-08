import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosconfig';
import './styles/categories.css';

const resolveImage = (src) => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `https://looi-store-server-izvs.onrender.com/uploads/${src}`;
};

const ShopByPrintSection = () => {
  const navigate = useNavigate();
  const [prints, setPrints] = useState([]);
  const [printLoading, setPrintLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/get-print')
      .then(res => {
        const data = res.data?.prints || res.data || [];
        setPrints(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching prints:', err))
      .finally(() => setPrintLoading(false));
  }, []);

  if (!printLoading && prints.length === 0) return null;

  return (
    <div className="looi-home-sections">
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
    </div>
  );
};

export default ShopByPrintSection;

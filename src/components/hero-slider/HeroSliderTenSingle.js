import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from '../../config/axiosconfig';
import { getImageUrl } from '../../helpers/imageUrl';

const HeroSliderTenSingle = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    axiosInstance.get('/get-allbanner')
      .then(res => {
        if (res.data.success && res.data.banners.length > 0) {
          setBanners(res.data.banners);
        } else {
          setError('No banners found');
        }
      })
      .catch(err => setError(err.response?.data?.message || 'Error fetching banners'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % banners.length);
        setTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setTransitioning(false);
    }, 400);
  };

  if (loading) {
    return (
      <div style={{
        width: '100%', height: '90vh', maxHeight: '760px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          width: '40px', height: '40px', border: '2px solid #333',
          borderTop: '2px solid #b08d6a', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  const imageUrl = getImageUrl(currentBanner.images[0]);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Main Slide */}
      <div
        style={{
          width: '100%',
          height: '90vh',
          maxHeight: '760px',
          minHeight: '420px',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          transition: 'opacity 0.5s ease',
          opacity: transitioning ? 0 : 1,
          position: 'relative',
        }}
      >
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          padding: '0 48px',
        }}>
          <div style={{ maxWidth: '520px' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: '#b08d6a', marginBottom: '18px',
            }}>
              New Collection
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(42px, 6vw, 76px)',
              fontWeight: 600, color: '#fff',
              lineHeight: 1.05, letterSpacing: '-1.5px',
              margin: '0 0 20px', textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}>
              {currentBanner.title || 'New Season\nArrival'}
            </h1>
            {currentBanner.subtitle && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px', color: 'rgba(255,255,255,0.8)',
                margin: '0 0 32px', lineHeight: 1.6,
              }}>
                {currentBanner.subtitle}
              </p>
            )}
            <a
              href="/shop-grid-full-width"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
                color: '#fff', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.7)',
                padding: '14px 32px', borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1a1a1a';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
              }}
            >
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Slide dots */}
        {banners.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '32px', left: '48px',
            display: 'flex', gap: '8px', alignItems: 'center',
          }}>
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === currentIndex ? '28px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', right: '48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          opacity: 0.5,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase', color: '#fff',
            writingMode: 'vertical-rl',
          }}>Scroll</span>
          <div style={{
            width: '1px', height: '40px', background: '#fff',
            animation: 'scrollPulse 1.8s ease infinite',
          }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        @media (max-width: 768px) {
          .hero-content-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </div>
  );
};

HeroSliderTenSingle.propTypes = { data: PropTypes.shape({}) };
export default HeroSliderTenSingle;

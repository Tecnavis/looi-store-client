import React, { useState, useEffect, Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewArrival from "../../wrappers/product/NewArrival";
import BestSellers from "../../wrappers/product/BestSellers";
import CategoryGrid from "../../wrappers/product/CategoryGrid";

// ── Scrolling promo ticker — items fetched from /api/get-marquee ──────────────
const FALLBACK_ITEMS = [
  { text: 'Free Shipping on Orders ₹999+', icon: '✦' },
  { text: 'Secure & Easy Returns',          icon: '✦' },
  { text: 'New Drops Every Week',           icon: '✦' },
];

const PromoBanner = () => {
  const [items, setItems] = useState(FALLBACK_ITEMS);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'https://looi-store-server-izvs.onrender.com/api'}/get-marquee`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.success && data.items?.length) setItems(data.items);
      })
      .catch(() => {}); // silently fall back to defaults
  }, []);

  // Duplicate items so the scroll loops seamlessly
  const track = [...items, ...items];

  return (
    <div style={{ background: '#1a1a1a', overflow: 'hidden', padding: '13px 0', position: 'relative' }}>
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">{item.icon || '✦'}</span>
            {item.text}
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track {
          display: inline-flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          animation: looi-marquee ${Math.max(18, items.length * 7)}s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #f5f5f0;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 40px;
        }
        .marquee-dot {
          color: #b08d6a;
          font-size: 15px;
          flex-shrink: 0;
        }
        @keyframes looi-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 576px) {
          .marquee-item { font-size: 11px; padding: 0 28px; letter-spacing: 1px; }
        }
      `}</style>
    </div>
  );
};

const HomeFashionThree = () => {
  return (
    <Fragment>
      <SEO titleTemplate="LOOI" />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* Hero Slider */}
        <HeroSliderTen />

        {/* Promo strip */}
        <PromoBanner />

        {/* Best Sellers */}
        <BestSellers />

        {/* Shop by Print + Categories (dark bg) */}
        <CategoryGrid />

        {/* New Arrivals */}
        <NewArrival />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionThree;

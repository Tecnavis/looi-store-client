import React, { useState, useEffect, Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewArrival from "../../wrappers/product/NewArrival";
import BestSellers from "../../wrappers/product/BestSellers";
import CategoryGrid from "../../wrappers/product/CategoryGrid";

// Minimal inline promo banner — no extra dep needed
const PromoBanner = () => (
  <div style={{
    background: '#1a1a1a',
    padding: '18px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    overflow: 'hidden',
  }}>
    {['Free Shipping on Orders ₹999+', 'Secure & Easy Returns', 'New Drops Every Week'].map((text, i) => (
      <span key={i} style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#f5f5f0',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ color: '#b08d6a', fontSize: '16px' }}>✦</span>
        {text}
      </span>
    ))}
  </div>
);

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

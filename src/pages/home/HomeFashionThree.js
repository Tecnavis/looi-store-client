import React, { useState, useEffect, Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewArrival from "../../wrappers/product/NewArrival";
import BestSellers from "../../wrappers/product/BestSellers";
import CategoryGrid from "../../wrappers/product/CategoryGrid";

// Minimal inline promo banner — no extra dep needed
const PromoBanner = () => (
  <div className="promo-banner-wrap">
    {['Free Shipping on Orders ₹999+', 'Secure & Easy Returns', 'New Drops Every Week'].map((text, i) => (
      <span key={i} className="promo-banner-item">
        <span className="promo-banner-dot">✦</span>
        {text}
      </span>
    ))}
    <style>{`
      .promo-banner-wrap {
        background: #1a1a1a;
        padding: 18px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
      }
      .promo-banner-item {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #f5f5f0;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .promo-banner-dot {
        color: #b08d6a;
        font-size: 16px;
      }
      @media (max-width: 576px) {
        .promo-banner-wrap {
          flex-direction: column;
          gap: 12px;
          padding: 16px 20px;
          text-align: center;
        }
        .promo-banner-item {
          font-size: 11px;
          letter-spacing: 1px;
          white-space: normal;
          justify-content: center;
        }
      }
    `}</style>
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

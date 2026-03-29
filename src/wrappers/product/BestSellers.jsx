import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../config/axiosconfig';
import './styles/beststyle.css';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageUrl';

const BestSellers = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
          axiosInstance.get('/get-category'),
          axiosInstance.get('/get-subcategory')
        ]);
        setCategoriesData(categoriesResponse.data);
        setSubcategoriesData(subcategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const slides = [];
  for (let i = 0; i < categoriesData.length; i += 3) {
    slides.push(categoriesData.slice(i, i + 3));
  }
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    intervalRef.current = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const go = (dir) => {
    if (isAnimating) return;
    clearInterval(intervalRef.current);
    setIsAnimating(true);
    setSlideIdx(prev => (prev + dir + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleCategoryClick = (categoryId) => {
    const relatedSubcategories = subcategoriesData.filter(
      sub => sub.category && sub.category._id === categoryId
    );
    if (relatedSubcategories.length > 0) {
      navigate(`/shop-grid-full-width/${relatedSubcategories[0]._id}`);
    }
  };

  if (!categoriesData.length) return null;
  const currentSlide = slides[slideIdx] || [];

  return (
    <section className="bs-section">
      <div className="bs-header">
        <div className="bs-header-left">
          <span className="bs-eyebrow">Curated for you</span>
          <h2 className="bs-title">Best Sellers</h2>
        </div>
        <div className="bs-header-right">
          <button className="bs-nav-btn" onClick={() => go(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span className="bs-counter">{slideIdx + 1} / {totalSlides}</span>
          <button className="bs-nav-btn" onClick={() => go(1)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <div className={`bs-grid ${isAnimating ? 'bs-grid--out' : 'bs-grid--in'}`}>
        {currentSlide.map((category, i) => (
          <div
            key={category._id}
            className="bs-card"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="bs-card-img-wrap">
              <img
                src={getImageUrl(category.images?.[0])}
                alt={category.name}
                className="bs-card-img"
              />
              <div className="bs-card-overlay">
                <button className="bs-shop-btn">
                  Shop Now
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
              <span className="bs-badge">★ Top Pick</span>
            </div>
            <div className="bs-card-info">
              <h4 className="bs-card-name">{category.name}</h4>
              <span className="bs-card-sub">View collection →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bs-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`bs-dot ${i === slideIdx ? 'bs-dot--active' : ''}`}
            onClick={() => { clearInterval(intervalRef.current); setSlideIdx(i); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;

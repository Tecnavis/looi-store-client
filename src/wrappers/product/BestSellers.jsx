import React, { useEffect, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import axiosInstance from '../../config/axiosconfig';
import './styles/beststyle.css';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageUrl';

const BestSellers = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
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

  const handleCategoryClick = (categoryId) => {
    const relatedSubcategories = subcategoriesData.filter(
      sub => sub.category && sub.category._id === categoryId
    );
    if (relatedSubcategories.length > 0) {
      navigate(`/shop-grid-full-width/${relatedSubcategories[0]._id}`);
    }
  };

  return (
    <div className="carousel-container">
      <h3 className="text-center my-5"><b>BEST SELLERS</b></h3>
      <Carousel interval={3000} className="full-screen-carousel">
        {[...Array(Math.ceil(categoriesData.length / 3))].map((_, carouselIndex) => (
          <Carousel.Item key={carouselIndex}>
            <Row className="text-center">
              {categoriesData.slice(carouselIndex * 3, carouselIndex * 3 + 3).map((category) => (
                <Col key={category._id} xs={12} md={4} className="carousel-col" onClick={() => handleCategoryClick(category._id)}>
                  <img
                    src={getImageUrl(category.images?.[0])}
                    alt={category.name}
                    className="d-block w-100"
                    style={{ height: '430px', objectFit: 'cover' }}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BestSellers;

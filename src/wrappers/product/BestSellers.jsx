
import React from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import image1 from '../../assets/images/bestseller/10012.jpg';
import image2 from '../../assets/images/bestseller/10013.jpg';
import image3 from '../../assets/images/bestseller/10014.jpg';
import image4 from '../../assets/images/bestseller/10015.jpg';
import image5 from '../../assets/images/bestseller/10016.jpg';
import './styles/beststyle.css';  
import { useNavigate } from 'react-router-dom';

const BestSellers = () => {

    const navigate=useNavigate();

    const handleImageClick = () => {
        navigate('/cart');
      };
  return (
    <div className="carousel-container">
      <h3 className="text-center my-5"><b>BEST SELLERS</b></h3>
      <Carousel interval={3000} className="full-screen-carousel">
        <Carousel.Item>
          <Row className="text-center">
            <Col xs={12} md={4} className="carousel-col" onClick={handleImageClick} >
              <img
                src={image1}
                alt="T-Shirts"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              
            </Col>
            <Col xs={12} md={4} className="carousel-col" onClick={handleImageClick}>
              <img
                src={image2}
                alt="Shirts"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              
            </Col>
            <Col xs={12} md={4} className="carousel-col">
              <img
                src={image3}
                alt="Polos"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
             
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className="text-center">
            <Col  className="carousel-col">
              <img
                src={image3}
                alt="T-Shirts"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              
            </Col>
            <Col className="carousel-col">
              <img
                src={image4}
                alt="Shirts"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              
            </Col>
            <Col className="carousel-col">
              <img
                src={image5}
                alt="Polos"
                className="d-block w-100"
                style={{ height: '430px', objectFit: 'cover' }}
              />
             
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BestSellers;


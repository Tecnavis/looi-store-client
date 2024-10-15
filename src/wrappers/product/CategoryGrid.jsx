// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import sweatshirtImag from '../../assets/images/logo/product/10071.webp'
// import fullSleeveImage from '../../assets/images/logo/product/10072.webp';
// import shacketImage from '../../assets/images/logo/product/10073.webp';
// import tshirtImage from '../../assets/images/logo/product/10074.webp';
// import shirtImage from '../../assets/images/logo/product/10075.webp';
// import hoodieImage from '../../assets/images/logo/product/10072.webp';

// const categories = [
//   { name: 'SWEATSHIRTS', image: sweatshirtImag },
//   { name: 'FULL SLEEVE T-SHIRTS', image: fullSleeveImage },
//   { name: 'SHACKETS', image: shacketImage },
//   { name: 'T-SHIRTS', image: shacketImage },
//   { name: 'SHIRTS', image: tshirtImage },
//   { name: 'HOODIES', image: shirtImage },
// ];

// const CategoryGrid = () => {
//   return (
//     <Container className="my-4">
//       <h3 className="text-center my-5"><b>CATEGORIES</b></h3>
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {categories.map((category, idx) => (
//           <Col key={idx}>
//             <Card className="h-100">
//               <Card.Img 
//                 variant="top" 
//                 src={category.image} 
//                 style={{ height: '400px', objectFit: 'cover' }}
//               />
//               <Card.ImgOverlay className="d-flex align-items-end">
               
//               </Card.ImgOverlay>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default CategoryGrid;


import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import image1 from '../../assets/images/categories/10018.jpg'
import image2 from '../../assets/images/categories/10020.jpg'
import image3 from '../../assets/images/categories/10021.jpg'
import image4 from '../../assets/images/categories/10023.jpg'
import image5 from '../../assets/images/categories/10024.jpg'
import image6 from '../../assets/images/categories/10025.jpg'
import image7 from '../../assets/images/categories/10026.jpg' 
import image8 from '../../assets/images/categories/10027.jpg'
import image9 from '../../assets/images/categories/10028.jpg'
import image10 from '../../assets/images/categories/10029.jpg'
import image11 from '../../assets/images/categories/10030.jpg'
import image12 from '../../assets/images/categories/10031.jpg'
import image13 from '../../assets/images/categories/10032.jpg'
import image14 from '../../assets/images/categories/10033.jpg'
import image15 from '../../assets/images/categories/10035.jpg'
import './styles/categories.css'
import { useNavigate } from 'react-router-dom';


const CategoryGrid = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Oversized T-Shirt', image: image1 },
    { name: 'Jeans', image: image2 },
    { name: 'Shirts', image: image3 },
    { name: 'Footwear', image: image4 },
    { name: 'Accessories', image: image5 },
    { name: 'Jackets', image:image6 },
    { name: 'Hats', image: image7 },
    { name: 'Jean', image: image8 },
    { name: 'Shirt', image: image9 },
    { name: 'Footwea', image: image10 },
    { name: 'Accessorie', image: image11 },
    { name: 'Jacket', image:image12 },
    { name: 'Hat', image: image13},
    { name: 'Jacket', image:image14 },
    { name: 'Hat', image: image15},

  ];
  const handleImageClick = () => {
    navigate('/shop-grid-full-width');
  };

  return (
    <Container fluid onClick={handleImageClick}>
      <h3 className="text-center my-5"><b>CATEGORIES</b></h3>
      {/* First Row - 3 Cards */}
      <Row className="mb-4">
        {categories.slice(0, 3).map((category, index) => (
          <Col key={index} md={4}>
            <Card className="h-100 mb-3" style={{ border: 'none' }}>
            <div className="zoom-container">
              <Card.Img variant="top" className='zoom-image' src={category.image} alt={category.name} />
            </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Second Row - 4 Cards */}
      <Row>
        {categories.slice(3).map((category, index) => (
          <Col key={index} md={3}>
            <Card className="h-100 mb-3" style={{ border: 'none' }}>
            <div className="zoom-container">
              <Card.Img variant="top" className='zoom-image' src={category.image} alt={category.name} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      
    </Container>
  );
};

export default CategoryGrid;



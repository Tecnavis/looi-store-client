
// import React from 'react';
// import { Carousel, Col, Row } from 'react-bootstrap';
// import image1 from '../../assets/images/bestseller/10012.jpg';
// import image2 from '../../assets/images/bestseller/10013.jpg';
// import image3 from '../../assets/images/bestseller/10014.jpg';
// import image4 from '../../assets/images/bestseller/10015.jpg';
// import image5 from '../../assets/images/bestseller/10016.jpg';
// import './styles/beststyle.css';  
// import { useNavigate } from 'react-router-dom';

// const BestSellers = () => {
//     const navigate=useNavigate();
//     const handleImageClick = () => {
//         navigate('/shop-grid-full-width');
//       };
//   return (
//     <div className="carousel-container">
//       <h3 className="text-center my-5"><b>BEST SELLERS</b></h3>
//       <Carousel interval={3000} className="full-screen-carousel">
//         <Carousel.Item>
//           <Row className="text-center">
//             <Col xs={12} md={4} className="carousel-col" onClick={handleImageClick} >
//               <img
//                 src={image1}
//                 alt="T-Shirts"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
              
//             </Col>
//             <Col xs={12} md={4} className="carousel-col" onClick={handleImageClick}>
//               <img
//                 src={image2}
//                 alt="Shirts"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
              
//             </Col>
//             <Col xs={12} md={4} className="carousel-col">
//               <img
//                 src={image3}
//                 alt="Polos"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
             
//             </Col>
//           </Row>
//         </Carousel.Item>
//         <Carousel.Item>
//           <Row className="text-center">
//             <Col  className="carousel-col">
//               <img
//                 src={image3}
//                 alt="T-Shirts"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
              
//             </Col>
//             <Col className="carousel-col">
//               <img
//                 src={image4}
//                 alt="Shirts"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
              
//             </Col>
//             <Col className="carousel-col">
//               <img
//                 src={image5}
//                 alt="Polos"
//                 className="d-block w-100"
//                 style={{ height: '430px', objectFit: 'cover' }}
//               />
             
//             </Col>
//           </Row>
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// };

// export default BestSellers;


// original code

// import React, { useEffect, useState } from 'react';
// import { Carousel, Col, Row } from 'react-bootstrap';
// import axiosInstance from '../../config/axiosconfig'
// import './styles/beststyle.css';  
// import { useNavigate } from 'react-router-dom';

// const BestSellers = () => {
//   const [productsData, setProductsData] = useState([]); 
//   const navigate = useNavigate();

//   // Fetch product data from API using axios
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/get-category'); 
//         setProductsData(response.data); 
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchData();
//   }, []); 

//   // Handle image click navigation
//   // const handleImageClick = () => {
//   //   navigate('/shop-grid-full-width');
//   // };
//   const handleSubcategoryClick = (subcategoryId) => {
//     navigate(`/shop-grid-full-width/${subcategoryId}`);
//   };

//   return (
//     <div className="carousel-container">
//       <h3 className="text-center my-5"><b>BEST SELLERS</b></h3>
//       <Carousel interval={3000} className="full-screen-carousel">
//         {/* Divide the products into groups of 3 to render each group in a separate Carousel.Item */}
//         {[...Array(Math.ceil(productsData.length / 3))].map((_, carouselIndex) => (
//           <Carousel.Item key={carouselIndex}>
//             <Row className="text-center">
//               {productsData.slice(carouselIndex * 3, carouselIndex * 3 + 3).map((product) => (
//                 <Col key={product._id} xs={12} md={4} className="carousel-col" onClick={() => handleSubcategoryClick(product._id)}>
//                   <img
//                     src={`http://localhost:8000/uploads/${product.images[0]}`} // Assuming your images are stored on a server
//                     alt={product.name}
//                     className="d-block w-100"
//                     style={{ height: '430px', objectFit: 'cover' }}
//                   />
//                 </Col>
//               ))}
//             </Row>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default BestSellers;


// modified code
import React, { useEffect, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import axiosInstance from '../../config/axiosconfig';
import './styles/beststyle.css';
import { useNavigate } from 'react-router-dom';

const BestSellers = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = 'https://looi-store-server-ypdx.onrender.com';

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
    const relatedSubcategories = subcategoriesData.filter(subcategory => 
      subcategory.category && subcategory.category._id === categoryId
    );
  
    if (relatedSubcategories.length > 0) {
      const firstSubcategoryId = relatedSubcategories[0]._id;
      navigate(`/shop-grid-full-width/${firstSubcategoryId}`);
    } else {
      console.log('No subcategories found for this category');
      // Optionally, you could navigate to a general category page or show an error message
      // navigate(`/category/${categoryId}`);
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
                    src={`${BASE_URL}/uploads/${category.images[0]}`}
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

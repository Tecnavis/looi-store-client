// import { Fragment } from "react"; 
// import { useSelector } from "react-redux";
// import { useParams, useLocation } from "react-router-dom";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
// import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
// import SimilarProduct from "../../wrappers/product/SimilarProduct";


// const ProductTabLeft = () => {
//   let { pathname } = useLocation();
//   let { id } = useParams();
//   const { products } = useSelector((state) => state.product);
//   const product = products.find(product => product.id === id);

//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="Product Page"
//         description="Product page of flone react minimalist eCommerce template."
//       />

//       <LayoutOne headerTop="visible">
      
//         {/* product description with image */}
//         <ProductImageDescription
//           spaceTopClass="pt-100"
//           spaceBottomClass="pb-100"
//           product={product}
//           galleryType="leftThumb"
//         />

//         {/* product description tab */}
//         <ProductDescriptionTab
//           spaceBottomClass="pb-90"
//           productFullDesc={product.fullDescription}
//         />

        
//       <SimilarProduct/>
//       </LayoutOne>
//     </Fragment>
//   );
// };


// export default ProductTabLeft;


import React, { useEffect, useState, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import SimilarProduct from "../../wrappers/product/SimilarProduct";
import axiosInstance from '../../config/axiosconfig';

const ProductTabLeft = () => {
  let { pathname}=useLocation();
  let { productId } = useParams(); // Get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by id from API or static data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/get-productid/${productId}`); // Fetch product by id
        setProduct(response.data.product); // Adjust based on your actual response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        {/* <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
          product={product}
        /> */}

        <SimilarProduct />
      </LayoutOne>
    </Fragment>
  );
};

export default ProductTabLeft;


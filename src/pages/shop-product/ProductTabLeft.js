import React, { useEffect, useState, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import axiosInstance from '../../config/axiosconfig';
import { Loader } from 'lucide-react';


const ProductTabLeft = () => {
  let { productId } = useParams(); // Get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); 
  useEffect(() => {
   localStorage.setItem("lastVisitedPage", location.pathname);
 }, [location.pathname]);

  // Fetch product by id from API or static data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/get-product/${productId}`); // Fetch product by id
        setProduct(response.data.product); // Adjust based on your actual response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        if (err.response) {
          // Server responded with an error status
          if (err.response.status === 404) {
            setError("This product could not be found. It may have been removed.");
          } else {
            setError(err.response.data?.message || `Server error (${err.response.status}) while loading this product.`);
          }
        } else if (err.request) {
          // Request was made but no response received — server down/unreachable
          setError("Could not reach the server. Please check your connection and try again.");
        } else {
          setError("Failed to load product.");
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
 
  if (loading) {
    return (

     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loader size={38} className="animate-spin text-center" />
      </div>
    );
  }

  if (error) {
    return (
      <Fragment>
        <SEO titleTemplate="Product Page" description="Product page" />
        <LayoutOne headerTop="visible">
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '60vh', padding: '0 20px' }}>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ borderRadius: '12px', backgroundColor: '#000000', padding: '10px 28px', color: 'white', border: 'none', fontWeight: '600' }}
            >
              Try Again
            </button>
          </div>
        </LayoutOne>
      </Fragment>
    );
  }

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

      
      </LayoutOne>
    
    </Fragment>
  );
};

export default ProductTabLeft;


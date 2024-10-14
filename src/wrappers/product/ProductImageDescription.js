// import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
// import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
// import ProductImageGallery from "../../components/product/ProductImageGallery";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
// import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
// import ProductImageFixed from "../../components/product/ProductImageFixed";
// import { useState } from "react";
// import { EffectFade, Thumbs } from 'swiper';
// import image1 from '../../assets/images/logo/product/10011.jpg';
// import image2 from '../../assets/images/logo/product/10084.jpg';
// import { Fragment} from "react";
// import AnotherLightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Swiper, { SwiperSlide } from "../../components/swiper";

// const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product }) => {
//   const currency = useSelector((state) => state.currency);
//   const { cartItems } = useSelector((state) => state.cart);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const { compareItems } = useSelector((state) => state.compare);
//   const wishlistItem = wishlistItems.find(item => item.id === product.id);
//   const compareItem = compareItems.find(item => item.id === product.id);

//   const discountedPrice = getDiscountPrice(product.price, product.discount);
//   const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
//   const finalDiscountedPrice = +(
//     discountedPrice * currency.currencyRate
//   ).toFixed(2);


//   // image content
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [index, setIndex] = useState(-1);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Local images array for the main gallery
//   const slides = [image1, image2].map((img, i) => ({
//     src: img,
//     key: i,
//   }));

//   const gallerySwiperParams = {
//     spaceBetween: 10,
//     loop: true,
//     effect: "fade",
//     fadeEffect: { crossFade: true },
//     thumbs: { swiper: thumbsSwiper },
//     modules: [EffectFade, Thumbs],
//   };

//   const thumbnailSwiperParams = {
//     onSwiper: setThumbsSwiper,
//     spaceBetween: 10,
//     slidesPerView: 4,
//     touchRatio: 0.2,
//     loop: true,
//     slideToClickedSlide: true,
//     direction: "vertical",
//     breakpoints: {
//       320: { slidesPerView: 4, direction: "horizontal" },
//       640: { slidesPerView: 4, direction: "horizontal" },
//       768: { slidesPerView: 4, direction: "horizontal" },
//       992: { slidesPerView: 4, direction: "horizontal" },
//       1200: { slidesPerView: 4, direction: "vertical" },
//     },
//   };

//   const handleThumbnailClick = (key) => {
//     setCurrentIndex(key);
//     setIndex(key);
//   };
//   const thumbPosition = "left";


//   return (
//     <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6 col-md-6">

//             {/* {galleryType === "leftThumb" ? (
//               <ProductImageGallerySideThumb
//                 product={product}
//                 thumbPosition="left"
//               />
//             ) : galleryType === "rightThumb" ? (
//               <ProductImageGallerySideThumb product={product} />
//             ) : galleryType === "fixedImage" ? (
//               <ProductImageFixed product={product} />
//             ) : (
//               <ProductImageGallery product={product} />
//             )} */}

// <div className="row row-5">
//         {/* Main image display */}
//         <div className={clsx(thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10")}>
//           <div className="product-large-image-wrapper">
//             {slides.length && (
//               <Swiper options={gallerySwiperParams}>
//                 {slides.map((single, key) => (
//                   <SwiperSlide key={key}>
//                     <button className="lightgallery-button" onClick={() => handleThumbnailClick(key)}>
//                       <i className="pe-7s-expand1"></i>
//                     </button>
//                     <div className="single-image">
//                       <img src={single.src} className="img-fluid" alt="" />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//                 <AnotherLightbox
//                   open={index >= 0}
//                   index={index}
//                   close={() => setIndex(-1)}
//                   slides={slides}
//                   plugins={[Thumbnails, Zoom, Fullscreen]}
//                 />
//               </Swiper>
//             )}
//           </div>
//         </div>
//         {/* Thumbnails */}
//         <div className={clsx(thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")}>
//           <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
//             {slides.length && (
//               <Swiper options={thumbnailSwiperParams}>
//                 {slides.map((single, key) => (
//                   <SwiperSlide key={key}>
//                     <div className="single-image" onClick={() => handleThumbnailClick(key)}>
//                       <img src={single.src} className="img-fluid" alt="" />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             )}
//           </div>
//         </div>
//       </div>





//           </div>
//           <div className="col-lg-6 col-md-6">

//             <ProductDescriptionInfo
//               product={product}
//               discountedPrice={discountedPrice}
//               currency={currency}
//               finalDiscountedPrice={finalDiscountedPrice}
//               finalProductPrice={finalProductPrice}
//               cartItems={cartItems}
//               wishlistItem={wishlistItem}
//               compareItem={compareItem}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductImageDescription.propTypes = {
//   galleryType: PropTypes.string,
//   product: PropTypes.shape({}),
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
// };

// ProductImageGalleryLeftThumb.propTypes = {
//   product: PropTypes.shape({}),
//   thumbPosition: PropTypes.string,
// };

// export default ProductImageDescription;


// last updated code

// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
// import { useState } from "react";
// import { EffectFade, Thumbs } from 'swiper';
// import image1 from '../../assets/images/logo/product/10011.jpg';
// import image2 from '../../assets/images/logo/product/10084.jpg';
// import { Fragment } from "react";
// import AnotherLightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Swiper, { SwiperSlide } from "../../components/swiper";

// const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product }) => {
//   const { name, price, coverImage, sizes, totalStock, description, countryOfOrigin, manufacturer, packedBy, commodity } = product;
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [index, setIndex] = useState(-1);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Local images array for the main gallery
//   const slides = [image1, image2].map((img, i) => ({
//     src: img,
//     key: i,
//   }));

//   const gallerySwiperParams = {
//     spaceBetween: 10,
//     loop: true,
//     effect: "fade",
//     fadeEffect: { crossFade: true },
//     thumbs: { swiper: thumbsSwiper },
//     modules: [EffectFade, Thumbs],
//   };

//   const thumbnailSwiperParams = {
//     onSwiper: setThumbsSwiper,
//     spaceBetween: 10,
//     slidesPerView: 4,
//     touchRatio: 0.2,
//     loop: true,
//     slideToClickedSlide: true,
//     direction: "vertical",
//     breakpoints: {
//       320: { slidesPerView: 4, direction: "horizontal" },
//       640: { slidesPerView: 4, direction: "horizontal" },
//       768: { slidesPerView: 4, direction: "horizontal" },
//       992: { slidesPerView: 4, direction: "horizontal" },
//       1200: { slidesPerView: 4, direction: "vertical" },
//     },
//   };

//   const handleThumbnailClick = (key) => {
//     setCurrentIndex(key);
//     setIndex(key);
//   };

//   // You can either set thumbPosition statically or pass it as a prop
//   const thumbPosition = "left"; // Defined thumbPosition here

//   return (
//     <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6 col-md-6">
//             <div className="row row-5">
//               {/* Main image display */}
//               <div className={clsx(thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10")}>
//                 <div className="product-large-image-wrapper">
//                   {slides.length && (
//                     <Swiper options={gallerySwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <button className="lightgallery-button" onClick={() => handleThumbnailClick(key)}>
//                             <i className="pe-7s-expand1"></i>
//                           </button>
//                           <div className="single-image">
//                             <img src={single.src} className="img-fluid" alt="" />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                       <AnotherLightbox
//                         open={index >= 0}
//                         index={index}
//                         close={() => setIndex(-1)}
//                         slides={slides}
//                         plugins={[Thumbnails, Zoom, Fullscreen]}
//                       />
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//               {/* Thumbnails */}
//               <div className={clsx(thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")}>
//                 <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
//                   {slides.length && (
//                     <Swiper options={thumbnailSwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <div className="single-image" onClick={() => handleThumbnailClick(key)}>
//                             <img src={single.src} className="img-fluid" alt="" />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6">
//             <ProductDescriptionInfo
//               product={product}
//               discountedPrice={getDiscountPrice(product.price, product.discount)}
//               finalProductPrice={+(product.price * 1).toFixed(2)} // Assuming currency rate as 1
//               cartItems={[]} // Assuming empty cart, adjust accordingly
//               wishlistItem={null}
//               compareItem={null}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductImageDescription.propTypes = {
//   galleryType: PropTypes.string,
//   product: PropTypes.shape({
//     id: PropTypes.number,
//     price: PropTypes.number,
//     discount: PropTypes.number
//   }),
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
// };

// export default ProductImageDescription;


// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
// import { useState } from "react";
// import { EffectFade, Thumbs } from 'swiper';
// import { Fragment } from "react";
// import AnotherLightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Swiper, { SwiperSlide } from "../../components/swiper";
// import { Link, useNavigate, useParams } from "react-router-dom";


// const BASE_URL = 'http://localhost:8000/uploads/';

// const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product, wishlistItem,
//   compareItem, }) => {
//   const {
//     name,
//     price,
//     color,
//     sizes,
//     totalStock,
//     description,
//     countryOfOrigin,
//     manufacturer,
//     packedBy,
//     commodity,
//     coverImage
//   } = product;

//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [index, setIndex] = useState(-1);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Extract all images from the sizes array and include coverImage
//   const getAllImages = () => {
//     let allImages = [coverImage]; // Start with coverImage
//     sizes.forEach(sizeItem => {
//       sizeItem.colors.forEach(colorItem => {
//         allImages = [...allImages, ...colorItem.images.map(img => `${img}.jpg`)];
//       });
//     });
//     return [...new Set(allImages)]; // Remove duplicates if any
//   };

//   // Create slides array from all available images
//   const slides = getAllImages().map((imgFileName, i) => ({
//     src: `${BASE_URL}${imgFileName}`,
//     key: i,
//   }));

//   const gallerySwiperParams = {
//     spaceBetween: 10,
//     loop: true,
//     effect: "fade",
//     fadeEffect: { crossFade: true },
//     thumbs: { swiper: thumbsSwiper },
//     modules: [EffectFade, Thumbs],
//   };

//   const thumbnailSwiperParams = {
//     onSwiper: setThumbsSwiper,
//     spaceBetween: 10,
//     slidesPerView: 4,
//     touchRatio: 0.2,
//     loop: true,
//     slideToClickedSlide: true,
//     direction: "vertical",
//     breakpoints: {
//       320: { slidesPerView: 4, direction: "horizontal" },
//       640: { slidesPerView: 4, direction: "horizontal" },
//       768: { slidesPerView: 4, direction: "horizontal" },
//       992: { slidesPerView: 4, direction: "horizontal" },
//       1200: { slidesPerView: 4, direction: "vertical" },
//     },
//   };

//   const handleThumbnailClick = (key) => {
//     setCurrentIndex(key);
//     setIndex(key);
//   };

//   const thumbPosition = "left";



//   // description content
//   const { id } = useParams();
//   const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];

//   const [selectedProductColor, setSelectedProductColor] = useState(
//     product.variation ? product.variation[0].color : ""
//   );
//   const [selectedProductSize, setSelectedProductSize] = useState(
//     product.variation ? product.variation[0].size[0].name : ""
//   );
//   const [productStock, setProductStock] = useState(
//     product.variation ? product.variation[0].size[0].stock : product.stock
//   );
//   const [quantityCount, setQuantityCount] = useState(1);

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/cart');
//   }


//   return (
//     <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6 col-md-6">
//             <div className="row row-5">
//               {/* Main image display */}
//               <div className={clsx(thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10")}>
//                 <div className="product-large-image-wrapper">
//                   {slides.length > 0 && (
//                     <Swiper options={gallerySwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <button className="lightgallery-button" onClick={() => handleThumbnailClick(key)}>
//                             <i className="pe-7s-expand1"></i>
//                           </button>
//                           <div className="single-image">
//                             <img src={single.src} className="img-fluid" alt={`${name} - Image ${key + 1}`} />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                       <AnotherLightbox
//                         open={index >= 0}
//                         index={index}
//                         close={() => setIndex(-1)}
//                         slides={slides}
//                         plugins={[Thumbnails, Zoom, Fullscreen]}
//                       />
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//               {/* Thumbnails */}
//               <div className={clsx(thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")}>
//                 <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
//                   {slides.length > 0 && (
//                     <Swiper options={thumbnailSwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <div className="single-image" onClick={() => handleThumbnailClick(key)}>
//                             <img src={single.src} className="img-fluid" alt={`${name} - Thumbnail ${key + 1}`} />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6">


//             {/* <ProductDescriptionInfo
//               product={product}
//               discountedPrice={getDiscountPrice(price, product.discount)}
//               finalProductPrice={+(price * 1).toFixed(2)}
//               cartItems={[]}
//               wishlistItem={null}
//               compareItem={null}
//             /> */}

//             <div className="product-details-content ml-70">
//               <h1 style={{ color: 'grey' }}>{product.name}</h1>
//               <hr className="product-divider" style={{ border: '0', height: '1px', backgroundColor: 'grey', marginBottom: '20px' }} />

//               <div>
//                 <h2 className="mt-3 mb-3">${product.price}</h2>
//               </div>



//               {product.variation && (
//                 <div className="pro-details-size-color">
//                   <div className="pro-details-color-wrap">
//                     <span>Color</span>
//                     <select>
//                       {colors.map((color, index) => (
//                         <option key={index} value={color}>
//                           {color}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="pro-details-size">
//                     <span>Size</span>
//                     <div className="pro-details-size-content">
//                       {product.variation.map(single =>
//                         single.color === selectedProductColor
//                           ? single.size.map((singleSize, key) => (
//                             <label key={key}>
//                               <input
//                                 type="radio"
//                                 value={singleSize.name}
//                                 checked={singleSize.name === selectedProductSize}
//                                 onChange={() => {
//                                   setSelectedProductSize(singleSize.name);
//                                   setProductStock(singleSize.stock);
//                                   setQuantityCount(1);
//                                 }}
//                               />
//                               <span className="size-name">{singleSize.name}</span>
//                             </label>
//                           ))
//                           : null
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )} 


//               <div className="pro-details-quality">
//                 <div className="cart-plus-minus">
//                   <button
//                     onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
//                     className="dec qtybutton"
//                   >
//                     -
//                   </button>
//                   <input
//                     className="cart-plus-minus-box"
//                     type="text"
//                     value={quantityCount}
//                     readOnly
//                   />
//                   <button
//                     onClick={() => setQuantityCount(quantityCount < productStock ? quantityCount + 1 : quantityCount)}
//                     className="inc qtybutton"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <div className="pro-details-cart btn-hover">
//                   {productStock > 0 ? (
//                     <button onClick={handleClick}>
//                       Add To Cart
//                     </button>
//                   ) : (
//                     <button disabled>Out of Stock</button>
//                   )}
//                 </div>
//                 <div className="pro-details-wishlist">
//                   <button
//                     className={wishlistItem ? "active" : ""}
//                     disabled={!!wishlistItem}
//                     title={wishlistItem ? "Added to wishlist" : "Add to wishlist"}
//                     onClick={() => console.log("Add to Wishlist", product)}
//                   >
//                     <i className="pe-7s-like" />
//                   </button>
//                 </div>
//                 <div className="pro-details-compare">
//                   <button
//                     className={compareItem ? "active" : ""}
//                     disabled={!!compareItem}
//                     title={compareItem ? "Added to compare" : "Add to compare"}
//                     onClick={() => console.log("Add to Compare", product)}
//                   >
//                     <i className="pe-7s-shuffle" />
//                   </button>
//                 </div>
//               </div>

//               {product.category && (
//                 <div className="pro-details-meta">
//                   <span>Categories :</span>
//                   <ul>
//                     {product.category.map((single, key) => (
//                       <li key={key}>
//                         <Link to={`/shop-grid-standard`}>
//                           {single}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductImageDescription.propTypes = {
//   galleryType: PropTypes.string,
//   product: PropTypes.shape({
//     name: PropTypes.string,
//     price: PropTypes.number,
//     coverImage: PropTypes.string,
//     sizes: PropTypes.arrayOf(
//       PropTypes.shape({
//         size: PropTypes.string,
//         colors: PropTypes.arrayOf(
//           PropTypes.shape({
//             color: PropTypes.string,
//             images: PropTypes.arrayOf(PropTypes.string),
//             stock: PropTypes.number,
//           })
//         ),
//       })
//     ),
//     totalStock: PropTypes.number,
//     description: PropTypes.string,
//     countryOfOrigin: PropTypes.string,
//     manufacturer: PropTypes.string,
//     packedBy: PropTypes.string,
//     commodity: PropTypes.string,
//     discount: PropTypes.number,
//   }).isRequired,
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
// };

// ProductDescriptionInfo.propTypes = {
//   cartItems: PropTypes.array,
//   compareItem: PropTypes.shape({}),
//   currency: PropTypes.shape({}),
//   product: PropTypes.shape({
//     variation: PropTypes.array,
//     rating: PropTypes.number,
//     stock: PropTypes.number,
//     category: PropTypes.array,
//   }).isRequired,
//   wishlistItem: PropTypes.shape({}),
// };

// export default ProductImageDescription;



// ------------------------------------------------------------------------------



// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
// import { useState } from "react";
// import { EffectFade, Thumbs } from 'swiper';
// import AnotherLightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Swiper, { SwiperSlide } from "../../components/swiper";
// import { Link, useNavigate } from "react-router-dom";
// import '../../wrappers/product/styles/cartstyle.css';
// import { Accordion } from "react-bootstrap";


// const BASE_URL = 'http://localhost:8000/uploads/';

// const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product, wishlistItem, compareItem }) => {
//   const {
//     name,
//     price,
//     sizes,
//     totalStock,
//     description,
//     countryOfOrigin,
//     manufacturer,
//     packedBy,
//     commodity,
//     coverImage
//   } = product;

//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [index, setIndex] = useState(-1);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // State for color and size selection
//   const [selectedSize, setSelectedSize] = useState(sizes[0]?.size || "");
//   const [selectedColor, setSelectedColor] = useState(sizes[0]?.colors[0]?.color || "");
//   const [productStock, setProductStock] = useState(sizes[0]?.colors[0]?.stock || 0);
//   const [quantityCount, setQuantityCount] = useState(1);

//   // Get all available colors
//   const allColors = [...new Set(sizes.flatMap(size => size.colors.map(color => color.color)))];

//   // Get sizes available for the selected color
//   const availableSizes = sizes.filter(size =>
//     size.colors.some(color => color.color === selectedColor)
//   ).map(size => size.size);

//   // Get all images
//   const getAllImages = () => {
//     let allImages = [coverImage];
//     sizes.forEach(sizeItem => {
//       sizeItem.colors.forEach(colorItem => {
//         allImages = [...allImages, ...colorItem.images.map(img => `${img}.jpg`)];
//       });
//     });
//     return [...new Set(allImages)];
//   };

//   const slides = getAllImages().map((imgFileName, i) => ({
//     src: `${BASE_URL}${imgFileName}`,
//     key: i,
//   }));

//   const gallerySwiperParams = {
//     spaceBetween: 10,
//     loop: true,
//     effect: "fade",
//     fadeEffect: { crossFade: true },
//     thumbs: { swiper: thumbsSwiper },
//     modules: [EffectFade, Thumbs],
//   };

//   const thumbnailSwiperParams = {
//     onSwiper: setThumbsSwiper,
//     spaceBetween: 10,
//     slidesPerView: 4,
//     touchRatio: 0.2,
//     loop: true,
//     slideToClickedSlide: true,
//     direction: "vertical",
//     breakpoints: {
//       320: { slidesPerView: 4, direction: "horizontal" },
//       640: { slidesPerView: 4, direction: "horizontal" },
//       768: { slidesPerView: 4, direction: "horizontal" },
//       992: { slidesPerView: 4, direction: "horizontal" },
//       1200: { slidesPerView: 4, direction: "vertical" },
//     },
//   };

//   const handleThumbnailClick = (key) => {
//     setCurrentIndex(key);
//     setIndex(key);
//   };

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     const availableSizesForColor = sizes.filter(size =>
//       size.colors.some(c => c.color === color)
//     );
//     if (availableSizesForColor.length > 0) {
//       setSelectedSize(availableSizesForColor[0].size);
//       const selectedColorData = availableSizesForColor[0].colors.find(c => c.color === color);
//       setProductStock(selectedColorData.stock);
//     }
//     setQuantityCount(1);
//   };

//   const handleSizeChange = (size) => {
//     setSelectedSize(size);
//     const selectedSizeData = sizes.find(s => s.size === size);
//     const selectedColorData = selectedSizeData.colors.find(c => c.color === selectedColor);
//     setProductStock(selectedColorData.stock);
//     setQuantityCount(1);
//   };

//   const navigate = useNavigate();

//   const handleAddToCart = () => {
//     navigate('/cart');
//   };

//   const thumbPosition = "left";

//   return (
//     <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6 col-md-6">
//             <div className="row row-5">
//               <div className={clsx(thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10")}>
//                 <div className="product-large-image-wrapper">
//                   {slides.length > 0 && (
//                     <Swiper options={gallerySwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <button className="lightgallery-button" onClick={() => handleThumbnailClick(key)}>
//                             <i className="pe-7s-expand1"></i>
//                           </button>
//                           <div className="single-image">
//                             <img src={single.src} className="img-fluid" alt={`${name} - Image ${key + 1}`} />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                       <AnotherLightbox
//                         open={index >= 0}
//                         index={index}
//                         close={() => setIndex(-1)}
//                         slides={slides}
//                         plugins={[Thumbnails, Zoom, Fullscreen]}
//                       />
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//               <div className={clsx(thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")}>
//                 <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
//                   {slides.length > 0 && (
//                     <Swiper options={thumbnailSwiperParams}>
//                       {slides.map((single, key) => (
//                         <SwiperSlide key={key}>
//                           <div className="single-image" onClick={() => handleThumbnailClick(key)}>
//                             <img src={single.src} className="img-fluid" alt={`${name} - Thumbnail ${key + 1}`} />
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6 col-md-6">
//             <div className="product-details-content ml-70">
//               <h1 style={{ color: 'grey' }}>{name}</h1>
//               <hr className="product-divider" style={{ border: '0', height: '1px', backgroundColor: 'grey', marginBottom: '20px' }} />

//               <div>
//                 <h2 className="mt-3 mb-3">${price}</h2>
//               </div>

//               <div className="pro-details-size-color">
//                 <div className="pro-details-color-wrap">
//                   <span>Color</span>
//                   <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)}>
//                     {allColors.map((color, index) => (
//                       <option key={index} value={color}>
//                         {color}
//                       </option>
//                     ))}
//                   </select>
//                 </div>


//                 <div className="pro-details-size">
//                   <span>Please select a size</span>
//                   <div className="pro-details-size-content">
//                     {availableSizes.map((size, key) => (
//                       <button
//                         key={key}
//                         className={`size-button ${size === selectedSize ? 'selected' : ''}`}
//                         onClick={() => handleSizeChange(size)}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="pro-details-quality">
//                 <div className="cart-plus-minus">
//                   <button
//                     onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
//                     className="dec qtybutton"
//                   >
//                     -
//                   </button>
//                   <input
//                     className="cart-plus-minus-box"
//                     type="text"
//                     value={quantityCount}
//                     readOnly
//                   />
//                   <button
//                     onClick={() => setQuantityCount(quantityCount < productStock ? quantityCount + 1 : quantityCount)}
//                     className="inc qtybutton"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <div className="pro-details-cart btn-hover">
//                   {productStock > 0 ? (
//                     <button onClick={handleAddToCart}>
//                       Add To Cart
//                     </button>
//                   ) : (
//                     <button disabled>Out of Stock</button>
//                   )}
//                 </div>
//                 <div className="pro-details-wishlist">
//                   <button
//                     className={wishlistItem ? "active" : ""}
//                     disabled={!!wishlistItem}
//                     title={wishlistItem ? "Added to wishlist" : "Add to wishlist"}
//                     onClick={() => console.log("Add to Wishlist", product)}
//                   >
//                     <i className="pe-7s-like" />
//                   </button>
//                 </div>
//                 <div className="pro-details-compare">
//                   <button
//                     className={compareItem ? "active" : ""}
//                     disabled={!!compareItem}
//                     title={compareItem ? "Added to compare" : "Add to compare"}
//                     onClick={() => console.log("Add to Compare", product)}
//                   >
//                     <i className="pe-7s-shuffle" />
//                   </button>
//                 </div>
//               </div>

//               <div className="accordion-div">
//                 <Accordion >
//                   <Accordion.Item eventKey="0">
//                     <Accordion.Header>
//                       <h3 className="h5 mb-0" style={{ color: 'grey' }}>Product Details</h3>
//                     </Accordion.Header>
//                     <Accordion.Body>
//                       <p>{description}</p>

//                       <div className="mb-3">
//                         <h3 className="h6 mb-2">Country of Origin - </h3>
//                         <p className="ms-3">{countryOfOrigin}</p>
//                       </div>

//                       <div className="mb-3">
//                         <h3 className="h6 mb-2">Manufactured By - </h3>
//                         <p className="ms-3">{manufacturer}</p>
//                       </div>

//                       <div className="mb-3">
//                         <h3 className="h6 mb-2">Packed By - </h3>
//                         <p className="ms-3">{packedBy}</p>
//                       </div>

//                       <div className="mb-3">
//                         <h3 className="h6 mb-2">Commodity - </h3>
//                         <p className="ms-3">{commodity}</p>
//                       </div>
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 </Accordion>
//               </div>

//               {/* Additional product details can be added here */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductImageDescription.propTypes = {
//   galleryType: PropTypes.string,
//   product: PropTypes.shape({
//     name: PropTypes.string,
//     price: PropTypes.number,
//     coverImage: PropTypes.string,
//     sizes: PropTypes.arrayOf(
//       PropTypes.shape({
//         size: PropTypes.string,
//         colors: PropTypes.arrayOf(
//           PropTypes.shape({
//             color: PropTypes.string,
//             images: PropTypes.arrayOf(PropTypes.string),
//             stock: PropTypes.number,
//           })
//         ),
//       })
//     ),
//     totalStock: PropTypes.number,
//     description: PropTypes.string,
//     countryOfOrigin: PropTypes.string,
//     manufacturer: PropTypes.string,
//     packedBy: PropTypes.string,
//     commodity: PropTypes.string,
//     discount: PropTypes.number,
//   }).isRequired,
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
//   wishlistItem: PropTypes.object,
//   compareItem: PropTypes.object,
// };

// export default ProductImageDescription;

// ------------------------------------------------------------------------------




import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { Link, useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import './styles/cartstyle.css'
import axiosInstance from '../../config/axiosconfig'
import { WishlistContext } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext"; // Import useCart

const BASE_URL = 'http://localhost:8000/uploads/';

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product, wishlistItem, compareItem }) => {
  const {
    name,
    price,
    sizes,
    totalStock,
    description,
    countryOfOrigin,
    manufacturer,
    packedBy,
    commodity,
    coverImage
  } = product;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for color and size selection
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.size || "");
  const [selectedColor, setSelectedColor] = useState(sizes[0]?.colors[0]?.color || "");
  const [productStock, setProductStock] = useState(sizes[0]?.colors[0]?.stock || 0);
  const [quantityCount, setQuantityCount] = useState(1);
  const [currentImages, setCurrentImages] = useState([]);

  const [wishlistStatus, setWishlistStatus] = useState(null);

  const { addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  // Get all available colors
  const allColors = [...new Set(sizes.flatMap(size =>
    size.colors.map(color => color.color)
  ))];

  // Get sizes available for the selected color
  const availableSizes = sizes.filter(size =>
    size.colors.some(color => color.color === selectedColor)
  ).map(size => size.size);

  // Update images when color changes
  // useEffect(() => {
  //   const getImagesForColor = () => {
  //     let colorImages = [];
  //     sizes.forEach(sizeItem => {
  //       const colorData = sizeItem.colors.find(c => c.color === selectedColor);
  //       if (colorData) {
  //         colorImages = [...colorImages, ...colorData.images.map(img => `${img}.jpg`)];
  //       }
  //     });
  //     return [coverImage, ...colorImages];
  //   };

  //   const newImages = getImagesForColor();
  //   setCurrentImages(newImages);
  // }, [selectedColor, sizes, coverImage]);


  // Update images when color changes
  useEffect(() => {
    const getImagesForColor = () => {
      let colorImages = [];
      sizes.forEach(sizeItem => {
        const colorData = sizeItem.colors.find(c => c.color === selectedColor);
        if (colorData) {
          colorImages = [...colorImages, ...colorData.images];
        }
      });
      return [coverImage, ...colorImages];
    };

    const newImages = getImagesForColor();
    setCurrentImages(newImages);
  }, [selectedColor, sizes, coverImage]);

  const slides = currentImages.map((imgFileName, i) => ({
    src: `${BASE_URL}${imgFileName}`,
    key: i,
  }));

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: { slidesPerView: 4, direction: "horizontal" },
      640: { slidesPerView: 4, direction: "horizontal" },
      768: { slidesPerView: 4, direction: "horizontal" },
      992: { slidesPerView: 4, direction: "horizontal" },
      1200: { slidesPerView: 4, direction: "vertical" },
    },
  };

  const handleThumbnailClick = (key) => {
    setCurrentIndex(key);
    setIndex(key);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const availableSizesForColor = sizes.filter(size =>
      size.colors.some(c => c.color === color)
    );
    if (availableSizesForColor.length > 0) {
      setSelectedSize(availableSizesForColor[0].size);
      const selectedColorData = availableSizesForColor[0].colors.find(c => c.color === color);
      setProductStock(selectedColorData.stock);
    }
    setQuantityCount(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSizeData = sizes.find(s => s.size === size);
    const selectedColorData = selectedSizeData.colors.find(c => c.color === selectedColor);
    setProductStock(selectedColorData.stock);
    setQuantityCount(1);
  };




  const thumbPosition = "left";

  // wishlist
  const { addToWishlist } = useContext(WishlistContext);

  const handleAddToWishlist = async () => {
    
    try {
      const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage

      if (!token) {
        navigate('/login-register');
        return;
      }

      const response = await axiosInstance.post(
        `/add-wishlist/${product._id}`,
        {}, // No data in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in headers
          },
        }
      );
      if (response.status === 200) {
        addToWishlist();
        setWishlistStatus("Product added to wishlist successfully!");
      } else {
        setWishlistStatus(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setWishlistStatus("Failed to add product to wishlist.");
    }
  };
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to add a product to the cart

  const [cartStatus, setCartStatus] = useState('');


  // const handleAddToCart = async (productId, size, color, quantity) => {
  //   try {
  //     const token = localStorage.getItem('token');

  //     if (!token) {
  //       navigate('/login-register');
  //       return;
  //     }

  //     const response = await axiosInstance.post(
  //       `/cart/${productId}`,
  //       { size, color, quantity },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log('Product added to cart:', data);
  //       setCartStatus('Product added to cart successfully!');
  //       setIsInCart(true);
  //     } else {
  //       setCartStatus(response.data.message);
  //     }

  //   } catch (error) {
  //     console.error('Error adding to cart:', error.message);
  //     setCartStatus('Failed to add product to cart.');
  //     alert(error.message);
  //   }
  // };

  const handleAddToCart = async () => {
    
    try {
      const token = localStorage.getItem('token');

      // if (!token) {
      //   navigate('/login-register');
      //   return;
      // }
      await addToCart(product._id, quantityCount, selectedSize, selectedColor);
      setIsInCart(true);
      setCartStatus('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      setCartStatus('Failed to add product to cart.');
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="row row-5">
              <div className={clsx(thumbPosition === "left" ? "col-xl-10 order-1 order-xl-2" : "col-xl-10")}>
                <div className="product-large-image-wrapper">
                  {slides.length > 0 && (
                    <Swiper options={gallerySwiperParams}>
                      {slides.map((single, key) => (
                        <SwiperSlide key={key}>
                          <button className="lightgallery-button" onClick={() => handleThumbnailClick(key)}>
                            <i className="pe-7s-expand1"></i>
                          </button>
                          <div className="single-image">
                            <img src={single.src} className="img-fluid" alt={`${name} - Image ${key + 1}`} />
                          </div>
                        </SwiperSlide>
                      ))}
                      <AnotherLightbox
                        open={index >= 0}
                        index={index}
                        close={() => setIndex(-1)}
                        slides={slides}
                        plugins={[Thumbnails, Zoom, Fullscreen]}
                      />
                    </Swiper>
                  )}
                </div>
              </div>
              <div className={clsx(thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")}>
                <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
                  {slides.length > 0 && (
                    <Swiper options={thumbnailSwiperParams}>
                      {slides.map((single, key) => (
                        <SwiperSlide key={key}>
                          <div className="single-image" onClick={() => handleThumbnailClick(key)}>
                            <img src={single.src} className="img-fluid" alt={`${name} - Thumbnail ${key + 1}`} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>
            </div>
          </div>
         

          <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">
              <h1 style={{ color: 'grey' }}>{name}</h1>
              <hr className="product-divider" style={{ border: '0', height: '1px', backgroundColor: 'grey', marginBottom: '20px' }} />

              <div>
                <h2 className="mt-3 ">${price}</h2>
                <p className="mb-4">MRP incl. of all taxes</p>
              </div>

              <div className="pro-details-size-color">
                <div className="pro-details-color-wrap">
                  <span>Color</span>
                  <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)}>
                    {allColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pro-details-size">
                  <span>Please select a size</span>
                  <div className="pro-details-size-content">
                    {availableSizes.map((size, key) => (
                      <button
                        key={key}
                        className={`size-button ${size === selectedSize ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pro-details-quality">
                <div className="cart-plus-minus">
                  <button
                    onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
                    className="dec qtybutton"
                  >
                    -
                  </button>
                  <input
                    className="cart-plus-minus-box"
                    type="text"
                    value={quantityCount}
                    readOnly
                  />
                  <button
                    onClick={() => setQuantityCount(quantityCount < productStock ? quantityCount + 1 : quantityCount)}
                    className="inc qtybutton"
                  >
                    +
                  </button>
                </div>
                

                





               

                {/* <div className="pro-details-compare">
                  <button
                    className={compareItem ? "active" : ""}
                    disabled={!!compareItem}
                    title={compareItem ? "Added to compare" : "Add to compare"}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                  {wishlistStatus && <p>{wishlistStatus}</p>}
                </div> */}
              </div>
              <div className="d-flex justify-space-between">
              <div className="pro-details-cart " style={{width:'100%'}}>
                  {isInCart ? (
                    <button onClick={handleGoToCart} style={{border: 'none', height: '40px',width:'90%',backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go to Cart</button>
                  ) : (
                    <button onClick={handleAddToCart} style={{border: 'none', height: '40px',width:'90%',backgroundColor:'red',color:'white',borderRadius:'5px'}}>
                      Add To Cart
                    </button>
                  )}
              </div>

              <div className="pro-details-cart " style={{width:'100%'}}>
                 
                    <button  onClick={handleAddToWishlist} style={{ height: '40px',width:'75%',border:'green 1px solid',borderRadius:'5px',color:'green'}}>
                      <i className="pe-7s-like me-2" style={{color:'green'}} />
                      Add To Wishlist
                    </button>
                 
              </div>

              {/* <div className="pro-details-wishlist">
                  <button 
                    onClick={handleAddToWishlist}
                  >
                    <i className="pe-7s-like" />
                  </button>
              </div> */}

             
                </div>

              <div className="accordion-div mt-4">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h3 className="h5 mb-0" style={{ color: 'grey' }}>Product Details</h3>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{description}</p>
                      <div className="mb-3 mt-3">
                        <h5 className="mb-2"><b>Country of Origin -</b> </h5>
                        <p className="ms-3">{countryOfOrigin}</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="mb-2"><b>Manufactured By - </b></h5>
                        <p className="ms-3">{manufacturer}</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="mb-2"><b>Packed By -</b> </h5>
                        <p className="ms-3">{packedBy}</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="mb-2"><b>Commodity -</b> </h5>
                        <p className="ms-3">{commodity}</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    coverImage: PropTypes.string,
    sizes: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string,
        colors: PropTypes.arrayOf(
          PropTypes.shape({
            color: PropTypes.string,
            images: PropTypes.arrayOf(PropTypes.string),
            stock: PropTypes.number,
          })
        ),
      })
    ),
    totalStock: PropTypes.number,
    description: PropTypes.string,
    countryOfOrigin: PropTypes.string,
    manufacturer: PropTypes.string,
    packedBy: PropTypes.string,
    commodity: PropTypes.string,
  }).isRequired,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  compareItem: PropTypes.object,
};

export default ProductImageDescription;



// ------------------------------------------------------------------------------

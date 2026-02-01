import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import { EffectFade, Thumbs } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import "./styles/cartstyle.css";
import axiosInstance from "../../config/axiosconfig";
import { WishlistContext } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import SimilarProduct from "../../wrappers/product/SimilarProduct";
import cogoToast from "cogo-toast";
import { getImageUrl } from "../../utils/imageUrl";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product
}) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { addToWishlist } = useContext(WishlistContext);

  // ✅ SAFETY: product not loaded
  if (!product) {
    return <div className="text-center py-5">Loading product...</div>;
  }

  const {
    _id,
    name,
    price,
    oldPrice,
    sizes = [],
    totalStock,
    description,
    countryOfOrigin,
    manufacturer,
    packedBy,
    commodity,
    coverImage,
    subcategory
  } = product;

  const safeSizes = Array.isArray(sizes) ? sizes : [];

  const [selectedSize, setSelectedSize] = useState(
    safeSizes[0]?.size || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    safeSizes[0]?.colors?.[0]?.color || ""
  );
  const [productStock, setProductStock] = useState(
    safeSizes[0]?.colors?.[0]?.stock || 0
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const [currentImages, setCurrentImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [isInCart, setIsInCart] = useState(false);

  // ✅ Sync cart button state
  useEffect(() => {
    const found = cartItems?.some(
      item => item.product?._id === _id
    );
    setIsInCart(found);
  }, [cartItems, _id]);

  // ✅ Available colors
  const allColors = [
    ...new Set(
      safeSizes.flatMap(size =>
        size.colors.map(color => color.color)
      )
    )
  ];

  const availableSizes = safeSizes
    .filter(size =>
      size.colors.some(c => c.color === selectedColor)
    )
    .map(size => size.size);

  // ✅ Update images on color change
  useEffect(() => {
    let images = [coverImage];
    safeSizes.forEach(size => {
      const colorData = size.colors.find(
        c => c.color === selectedColor
      );
      if (colorData?.images?.length) {
        images = images.concat(colorData.images);
      }
    });
    setCurrentImages(images);
  }, [selectedColor, coverImage, safeSizes]);

  const slides = currentImages.map((img, i) => ({
    src: getImageUrl(img),
    key: i
  }));

  const handleColorChange = color => {
    setSelectedColor(color);
    const sizeData = safeSizes.find(s =>
      s.colors.some(c => c.color === color)
    );
    if (sizeData) {
      setSelectedSize(sizeData.size);
      const colorData = sizeData.colors.find(
        c => c.color === color
      );
      setProductStock(colorData?.stock || 0);
    }
    setQuantityCount(1);
  };

  const handleSizeChange = size => {
    setSelectedSize(size);
    const sizeData = safeSizes.find(s => s.size === size);
    const colorData = sizeData?.colors.find(
      c => c.color === selectedColor
    );
    setProductStock(colorData?.stock || 0);
    setQuantityCount(1);
  };

  const handleAddToCart = async (redirect = false) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login-register");

    await addToCart(_id, quantityCount, selectedSize, selectedColor);
    cogoToast.success("Product added to cart", {
      position: "top-right"
    });

    if (redirect) navigate("/cart");
  };

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login-register");

    await axiosInstance.post(
      `/add-wishlist/${_id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    addToWishlist();
    cogoToast.success("Added to wishlist", {
      position: "top-right"
    });
  };

  const isOutOfStock =
    Number(totalStock) <= 0 || Number(productStock) <= 0;

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {/* IMAGE */}
          <div className="col-lg-6">
            {slides.length > 0 && (
              <Swiper
                options={{
                  loop: true,
                  effect: "fade",
                  thumbs: { swiper: thumbsSwiper },
                  modules: [EffectFade, Thumbs]
                }}
              >
                {slides.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <img src={slide.src} className="img-fluid" alt={name} />
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

          {/* DETAILS */}
          <div className="col-lg-6">
            <h1>{name}</h1>
            <h2>₹{price}</h2>
            <span className="text-muted text-decoration-line-through">
              ₹{oldPrice}
            </span>

            <div className="mt-3">
              <label>Color</label>
              <select
                value={selectedColor}
                onChange={e => handleColorChange(e.target.value)}
              >
                {allColors.map(color => (
                  <option key={color}>{color}</option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <label>Size</label>
              <div>
                {availableSizes.map(size => (
                  <button
                    key={size}
                    className={size === selectedSize ? "selected" : ""}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <button
                disabled={isOutOfStock}
                onClick={() => handleAddToCart(false)}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                className="ms-2"
                onClick={() => handleAddToCart(true)}
              >
                Buy Now
              </button>

              <button
                className="ms-2"
                onClick={handleAddToWishlist}
              >
                Wishlist
              </button>
            </div>

            <Accordion className="mt-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Product Details</Accordion.Header>
                <Accordion.Body>
                  <p>{description}</p>
                  <p><b>Country:</b> {countryOfOrigin}</p>
                  <p><b>Manufacturer:</b> {manufacturer}</p>
                  <p><b>Packed By:</b> {packedBy}</p>
                  <p><b>Commodity:</b> {commodity}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <SimilarProduct
        subcategory={subcategory}
        currentProductId={_id}
      />
    </div>
  );
};

ProductImageDescription.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductImageDescription;

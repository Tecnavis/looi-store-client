import { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import cogoToast from 'cogo-toast';

const Checkout = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India", // Default or empty
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: ""
  });

  useEffect(() => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const discountedPrice = getDiscountPrice(
        cartItem.price,
        cartItem.discount
      );
      const finalProductPrice = (
        cartItem.price * currency.currencyRate
      ).toFixed(2);
      const finalDiscountedPrice = (
        discountedPrice * currency.currencyRate
      ).toFixed(2);

      discountedPrice != null
        ? (total += finalDiscountedPrice * cartItem.quantity)
        : (total += finalProductPrice * cartItem.quantity);
    });
    setCartTotalPrice(total);
  }, [cartItems, currency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.streetAddress ||
      !billingDetails.city ||
      !billingDetails.phone ||
      !billingDetails.email
    ) {
      cogoToast.error("Please fill in all required fields.");
      return;
    }

    const orderData = {
        cartItems: cartItems,
        billingDetails: {
            ...billingDetails,
            cartTotal: cartTotalPrice.toFixed(2)
        },
        selectedAddress: {
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            houseBuilding: billingDetails.apartment,
            streetArea: billingDetails.streetAddress,
            landmark: "", // Not in form
            postalCode: billingDetails.postcode,
            cityDistrict: billingDetails.city,
            country: billingDetails.country,
            state: billingDetails.state,
            phoneNumber: billingDetails.phone,
            email: billingDetails.email
        }
    };

    navigate("/payment", { state: orderData });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input 
                            type="text" 
                            name="firstName"
                            value={billingDetails.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input 
                            type="text" 
                            name="lastName"
                            value={billingDetails.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input 
                            type="text" 
                            name="companyName"
                            value={billingDetails.companyName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select 
                            name="country"
                            value={billingDetails.country}
                            onChange={handleChange}
                          >
                            <option>Select a country</option>
                            <option>India</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="streetAddress"
                            value={billingDetails.streetAddress}
                            onChange={handleChange}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            name="apartment"
                            value={billingDetails.apartment}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input 
                            type="text" 
                            name="city"
                            value={billingDetails.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input 
                            type="text" 
                            name="state"
                            value={billingDetails.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input 
                            type="text" 
                            name="postcode"
                            value={billingDetails.postcode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input 
                            type="text" 
                            name="phone"
                            value={billingDetails.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input 
                            type="text" 
                            name="email"
                            value={billingDetails.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="orderNotes"
                          value={billingDetails.orderNotes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;

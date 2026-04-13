import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosconfig";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMainCategories();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchMainCategories = async () => {
    try {
      const response = await axiosInstance.get("/get-maincategory");
      setMainCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/get-category");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axiosInstance.get("/get-subcategory");
      setSubcategories(response.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const getCategoriesByMainCategory = (mainCategoryId) => {
    return categories.filter(
      (category) => category.maincategoriesData?._id === mainCategoryId
    );
  };

  const getSubcategoriesByCategory = (categoryId) => {
    return subcategories.filter(
      (subcategory) => subcategory.category?._id === categoryId
    );
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate(process.env.PUBLIC_URL + "/login-register");
  };

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {/* Home Link */}
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
        </li>

        {/* Main Categories */}
        {mainCategories.map((mainCategory) => (
          <li key={mainCategory._id} className="menu-item-has-children">
            <Link to="#">{mainCategory.mainCategoryName}</Link>
            <ul className="sub-menu">
              {getCategoriesByMainCategory(mainCategory._id).map((category) => (
                <li key={category._id} className="menu-item-has-children">
                  <Link to="#">{category.name}</Link>
                  <ul className="sub-menu">
                    {getSubcategoriesByCategory(category._id).map(
                      (subcategory) => (
                        <li key={subcategory._id}>
                          <Link
                            to={
                              process.env.PUBLIC_URL +
                              `/shop-grid-full-width/${subcategory._id}`
                            }
                          >
                            {subcategory.subcategoryname}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* Wishlist & Cart */}
        <li>
          <Link to={process.env.PUBLIC_URL + "/cart"}>{t("Wishlist")}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>{t("Cart")}</Link>
        </li>

        {/* Profile (only when logged in) */}
        {token && (
          <li className="menu-item-has-children">
            <Link to="#">PROFILE</Link>
            <ul className="sub-menu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>My ORDERS</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/addressbook"}>ADDRESS BOOK</Link>
              </li>
            </ul>
          </li>
        )}

        {/* Contact Us */}
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>

        {/* About Us */}
        <li className="menu-item-has-children">
          <Link to="#">ABOUT US</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/about"}>About us</Link>
            </li>
            <li>
              <a
                href="https://merchant.razorpay.com/policy/PFsg9pWAtycjFk/contact_us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </li>

        {/* More (Policies) */}
        <li className="menu-item-has-children">
          <Link to="#">MORE</Link>
          <ul className="sub-menu">
            <li>
              <a
                href="https://merchant.razorpay.com/policy/PFsg9pWAtycjFk/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://merchant.razorpay.com/policy/PFsg9pWAtycjFk/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </li>
            <li>
              <a
                href="https://merchant.razorpay.com/policy/PFsg9pWAtycjFk/refund"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cancellation and Refund
              </a>
            </li>
            <li>
              <a
                href="https://merchant.razorpay.com/policy/PFsg9pWAtycjFk/shipping"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shipping and Delivery
              </a>
            </li>
          </ul>
        </li>

        {/* Follow Us */}
        <li className="menu-item-has-children">
          <Link to="#">FOLLOW US</Link>
          <ul className="sub-menu">
            <li>
              <a href="//www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a href="//www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li>
              <a href="//www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href="//www.youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
            </li>
          </ul>
        </li>

        {/* ── LOGIN / LOGOUT — always last, always highlighted ── */}
        <li className="mobile-nav-login-item">
          {token ? (
            <Link to="#" onClick={handleLogout} className="mobile-nav-login-btn mobile-nav-logout-btn">
              Logout
            </Link>
          ) : (
            <Link to={process.env.PUBLIC_URL + "/login-register"} className="mobile-nav-login-btn">
              Login
            </Link>
          )}
        </li>
      </ul>

      <style>{`
        /* ── Mobile Login/Logout highlight ── */
        .mobile-nav-login-item {
          margin-top: 12px !important;
          padding-top: 12px !important;
          border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        .mobile-nav-login-btn {
          display: block !important;
          background: #b08d6a !important;
          color: #fff !important;
          border-radius: 6px !important;
          padding: 12px 20px !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          letter-spacing: 1.5px !important;
          text-transform: uppercase !important;
          text-align: center !important;
          text-decoration: none !important;
          transition: background 0.2s ease !important;
        }
        .mobile-nav-login-btn:hover {
          background: #9a7a58 !important;
          color: #fff !important;
        }
        .mobile-nav-logout-btn {
          background: #c0392b !important;
        }
        .mobile-nav-logout-btn:hover {
          background: #a93226 !important;
        }
      `}</style>
    </nav>
  );
};

export default MobileNavMenu;

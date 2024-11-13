// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import clsx from "clsx";
// import axiosInstance from "../../config/axiosconfig";
// import { useEffect, useState } from "react";


// const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
//   const { t } = useTranslation();

//   const [mainCategories, setMainCategories] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//     fetchMainCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/get-maincategory");
//       return response.data.categories;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       return [];
//     }
//   };

//   const fetchMainCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/get-category");
//       return response.data.categories;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       return [];
//     }
//   };

//   const getCategoriesByMainCategory = (mainCategoryId) => {
//     return categories.filter(category => category.maincategoriesData._id === mainCategoryId);
//   };

  
//   return (
    
//     <div
//       className={clsx(sidebarMenu
//           ? "sidebar-menu"
//           : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
//     >
//       <nav>
//         <ul>
//           <li>
//             {/* first home */}
//             {/* <Link to={process.env.PUBLIC_URL + "/"}> */}
//             {/* set category data here */}
//               {/* {t("home")}
//               {sidebarMenu ? (
//                 <span>
//                   <i className="fa fa-angle-right"></i>
//                 </span>
//               ) : (
//                 <i className="fa fa-angle-down" />
//               )}
//             </Link> */}
//             {/* map main category here */}
//             <ul className="mega-menu mega-menu-padding">
//               <li>
//                 <ul>
//                   <li className="mega-menu-title">
//                     <Link to={process.env.PUBLIC_URL + "/"}>
//                       {t("home_group_one")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
//                       {t("home_fashion")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-two"}>
//                       {t("home_fashion_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-three"}>
//                       {t("home_fashion_three")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-four"}>
//                       {t("home_fashion_four")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-five"}>
//                       {t("home_fashion_five")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-six"}>
//                       {t("home_fashion_six")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-seven"}>
//                       {t("home_fashion_seven")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-fashion-eight"}>
//                       {t("home_fashion_eight")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
//                       {t("home_kids_fashion")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-cosmetics"}>
//                       {t("home_cosmetics")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
//                       {t("home_furniture")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
//                       {t("home_furniture_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-three"}>
//                       {t("home_furniture_three")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-four"}>
//                       {t("home_furniture_four")}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 {/* second home */}
//                 <ul>
//                   <li className="mega-menu-title">
//                     <Link to={process.env.PUBLIC_URL + "/"}>
//                       {t("home_group_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
//                       {t("home_furniture_five")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
//                       {t("home_furniture_six")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-furniture-seven"}>
//                       {t("home_furniture_seven")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-electronics"}>
//                       {t("home_electronics")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
//                       {t("home_electronics_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/home-electronics-three"}
//                     >
//                       {t("home_electronics_three")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-book-store"}>
//                       {t("home_book_store")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-book-store-two"}>
//                       {t("home_book_store_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-plants"}>
//                       {t("home_plants")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-flower-shop"}>
//                       {t("home_flower_shop")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-flower-shop-two"}>
//                       {t("home_flower_shop_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
//                       {t("home_organic_food")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/home-organic-food-two"}
//                     >
//                       {t("home_organic_food_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-onepage-scroll"}>
//                       {t("home_onepage_scroll")}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <ul>
//                   <li className="mega-menu-title">
//                     <Link to={process.env.PUBLIC_URL + "/"}>
//                       {t("home_group_three")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-grid-banner"}>
//                       {t("home_grid_banner")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-auto-parts"}>
//                       {t("home_auto_parts")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-cake-shop"}>
//                       {t("home_cake_shop")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-handmade"}>
//                       {t("home_handmade")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-pet-food"}>
//                       {t("home_pet_food")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/home-medical-equipment"}
//                     >
//                       {t("home_medical_equipment")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-christmas"}>
//                       {t("home_christmas")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-black-friday"}>
//                       {t("home_black_friday")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/home-black-friday-two"}
//                     >
//                       {t("home_black_friday_two")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/home-valentines-day"}>
//                       {t("home_valentines_day")}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//               {" "}
//               {t("shop")}
//               {sidebarMenu ? (
//                 <span>
//                   <i className="fa fa-angle-right"></i>
//                 </span>
//               ) : (
//                 <i className="fa fa-angle-down" />
//               )}
//             </Link>
//             <ul className="mega-menu">
//               <li>
//                 <ul>
//                   <li className="mega-menu-title">
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//                       {t("shop_layout")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//                       {t("shop_grid_standard")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
//                       {t("shop_grid_filter")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-two-column"}>
//                       {t("shop_grid_two_column")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}>
//                       {t("shop_grid_no_sidebar")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-full-width"}>
//                       {t("shop_grid_full_width")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
//                     >
//                       {t("shop_grid_right_sidebar")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-list-standard"}>
//                       {t("shop_list_standard")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-list-full-width"}>
//                       {t("shop_list_full_width")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/shop-list-two-column"}>
//                       {t("shop_list_two_column")}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <ul>
//                   <li className="mega-menu-title">
//                     <Link to={process.env.PUBLIC_URL + "/product/1"}>
//                       {t("product_details")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product/1"}>
//                       {t("product_tab_bottom")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product-tab-left/1"}>
//                       {t("product_tab_left")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product-tab-right/1"}>
//                       {t("product_tab_right")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product-sticky/1"}>
//                       {t("product_sticky")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product-slider/1"}>
//                       {t("product_slider")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={process.env.PUBLIC_URL + "/product-fixed-image/1"}
//                     >
//                       {t("product_fixed_image")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product/8"}>
//                       {t("product_simple")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product/1"}>
//                       {t("product_variation")}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/product/9"}>
//                       {t("product_affiliate")}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <ul>
//                   <li className="mega-menu-img">
//                     <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//                       <img
//                         src={
//                           process.env.PUBLIC_URL +
//                           "/assets/img/banner/banner-12.png"
//                         }
//                         alt=""
//                       />
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//               {t("collection")}
//             </Link>
//           </li>
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/"}>
//               {t("pages")}
//               {sidebarMenu ? (
//                 <span>
//                   <i className="fa fa-angle-right"></i>
//                 </span>
//               ) : (
//                 <i className="fa fa-angle-down" />
//               )}
//             </Link>
//             <ul className="submenu">
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/cart"}>
//                   {t("cart")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/checkout"}>
//                   {t("checkout")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/wishlist"}>
//                   {t("wishlist")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/compare"}>
//                   {t("compare")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/my-account"}>
//                   {t("my_account")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/login-register"}>
//                   {t("login_register")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/about"}>
//                   {t("about_us")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/contact"}>
//                   {t("contact_us")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/not-found"}>
//                   {t("404_page")}
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
//               {t("blog")}
//               {sidebarMenu ? (
//                 <span>
//                   <i className="fa fa-angle-right"></i>
//                 </span>
//               ) : (
//                 <i className="fa fa-angle-down" />
//               )}
//             </Link>
//             <ul className="submenu">
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
//                   {t("blog_standard")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
//                   {t("blog_no_sidebar")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
//                   {t("blog_right_sidebar")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
//                   {t("blog_details_standard")}
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/contact"}>
//               {t("contact_us")}
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// NavMenu.propTypes = {
//   menuWhiteClass: PropTypes.string,
//   sidebarMenu: PropTypes.bool,
// };

// export default NavMenu;



// final navbar its not display subcategory

// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import clsx from "clsx";
// import axiosInstance from "../../config/axiosconfig";
// import { useEffect, useState } from "react";

// const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
//   const { t } = useTranslation();

//   const [mainCategories, setMainCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     fetchMainCategories();
//     fetchCategories();
//     fetchSubcategories();
//   }, []);

//   const fetchMainCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/get-maincategory");
//       setMainCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching main categories:", error);
//       setMainCategories([]);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/get-category");
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     }
//   };

//   const fetchSubcategories = async () => {
//     try {
//       const response = await axiosInstance.get("/get-subcategory");
//       setSubcategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setSubcategories([]);
//     }
//   };

//   const getCategoriesByMainCategory = (mainCategoryId) => {
//     return categories.filter(category => 
//       category && 
//       category.maincategoriesData && 
//       category.maincategoriesData._id === mainCategoryId
//     );
//   };

//   const getSubcategoriesByCategory = (categoryId) => {
//     return subcategories.filter(subcategory => 
//       subcategory && 
//       subcategory.maincategory === categoryId
//     );
//   };

//   return (
//     <div
//       className={clsx(sidebarMenu
//         ? "sidebar-menu"
//         : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
//     >
//       <nav>
//         <ul>
//           {mainCategories.map((mainCategory) => (
//             <li key={mainCategory._id}>
//               <Link to={process.env.PUBLIC_URL + `/category/${mainCategory._id}`}>
//                 {mainCategory.mainCategoryName}
//                 {sidebarMenu ? (
//                   <span>
//                     <i className="fa fa-angle-right"></i>
//                   </span>
//                 ) : (
//                   <i className="fa fa-angle-down" />
//                 )}
//               </Link>

//               <ul className="mega-menu mega-menu-padding " style={{ marginTop: '0', paddingTop: '0' }}>
//                 {getCategoriesByMainCategory(mainCategory._id).map((category) => (
//                   <li key={category._id}>
//                     <Link to={process.env.PUBLIC_URL + `/subcategory/${category._id}`}>
//                       {category.name}
//                     </Link>
//                     <ul>
//                       {getSubcategoriesByCategory(category._id).map((subcategory) => (
//                         <li key={subcategory._id}>
//                           <Link to={process.env.PUBLIC_URL + `/product/${subcategory._id}`}>
//                             {subcategory.subcategoryname}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//           <li>
//             <Link to={process.env.PUBLIC_URL + "/contact"}>
//               {t("contact_us")}
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// NavMenu.propTypes = {
//   menuWhiteClass: PropTypes.string,
//   sidebarMenu: PropTypes.bool,
// };

// export default NavMenu;


import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import axiosInstance from "../../config/axiosconfig";
import { useEffect, useState } from "react";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
      setMainCategories([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/get-category");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axiosInstance.get("/get-subcategory");
      setSubcategories(response.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    }
  };

  const getCategoriesByMainCategory = (mainCategoryId) => {
    return categories.filter(category => 
      category && 
      category.maincategoriesData && 
      category.maincategoriesData._id === mainCategoryId
    );
  };

  const getSubcategoriesByCategory = (categoryId) => {
    return subcategories.filter(subcategory => 
      subcategory && 
      subcategory.category && 
      subcategory.category._id === categoryId
    );
  };

  return (
    <div
      className={clsx(sidebarMenu
        ? "sidebar-menu"
        : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
          {mainCategories.map((mainCategory) => (
            <li key={mainCategory._id}>
              <Link to={process.env.PUBLIC_URL + `/`}>
                {mainCategory.mainCategoryName}
                {sidebarMenu ? (
                  <span>
                    <i className="fa fa-angle-right"></i>
                  </span>
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Link>

              <ul className="mega-menu mega-menu-padding" style={{ marginTop: '0', paddingTop: '0' }}>
                {getCategoriesByMainCategory(mainCategory._id).map((category) => (
                  <li key={category._id}>
                    <Link to={process.env.PUBLIC_URL + ``}>
                      {category.name}
                    </Link>
                    <ul>
                      {getSubcategoriesByCategory(category._id).map((subcategory) => (
                        <li key={subcategory._id}>
                          <Link to={process.env.PUBLIC_URL + `/shop-grid-full-width/${subcategory._id}`}>
                            {subcategory.subcategoryname}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;


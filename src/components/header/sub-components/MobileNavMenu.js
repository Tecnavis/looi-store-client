
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosconfig";

const MobileNavMenu = () => {
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

        {/* Contact Us Link */}
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;


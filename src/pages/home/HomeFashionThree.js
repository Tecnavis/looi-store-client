import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import TreadingGrid from "../../wrappers/product/TreadingGrid";
import NewArrival from "../../wrappers/product/NewArrival";
import TopRated from "../../wrappers/product/TopRated";
import CategoryGrid from "../../wrappers/product/CategoryGrid";
import TopSelling from "../../wrappers/product/TopSelling";
import BestSellers from "../../wrappers/product/BestSellers";

const HomeFashionThree = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="LOOI"
       
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSliderTen  />
       
        {/* <NewProductGrid category="accessories" limit={10}   /> */}
        <BestSellers/>
        {/* <TreadingGrid/> */}
        <CategoryGrid/>
        <NewArrival/>
        {/* <TopRated/> */}
        
       {/* <TopSelling/> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionThree;

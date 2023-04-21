import React, { useState } from "react";
import Herosection from "../components/Home/Herosection";
import NewArrivals from "../components/Home/NewArrivals";
import Categories from "../components/Home/Categories";
import TopSellers from "../components/Home/TopSellers";
import { Helmet } from "react-helmet";
import ProductDetailPopup from "../components/ProductDetailPopup";

const Home = () => {
  return (
    <>
      <Helmet title="Home" />
      <div className="md:space-y-10 space-y-5 w-full">
        <Herosection />
        <NewArrivals />
        <TopSellers />
        <Categories />
      </div>
    </>
  );
};

export default Home;

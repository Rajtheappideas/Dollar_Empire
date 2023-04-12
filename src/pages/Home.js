import React, { useState } from "react";
import Herosection from "../components/Home/Herosection";
import NewArrivals from "../components/Home/NewArrivals";
import Categories from "../components/Home/Categories";
import TopSellers from "../components/Home/TopSellers";
import { Helmet } from "react-helmet";
import ProductDetailPopup from "../components/ProductDetailPopup";

const Home = () => {
  const [showProductDetailPopup, setShowProductDetailPopup] = useState(false);

  return (
    <>
      <Helmet title="Home" />
      <div className="md:space-y-10 space-y-5 w-full">
        {showProductDetailPopup && (
          <ProductDetailPopup
            setShowProductDetailPopup={setShowProductDetailPopup}
          />
        )}
        <Herosection />
        <NewArrivals
          showProductDetailPopup={showProductDetailPopup}
          setShowProductDetailPopup={setShowProductDetailPopup}
        />
        <TopSellers />
        <Categories />
      </div>
    </>
  );
};

export default Home;

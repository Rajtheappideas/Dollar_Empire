import React, { useEffect, useState } from "react";
import Herosection from "../components/Home/Herosection";
import NewArrivals from "../components/Home/NewArrivals";
import Categories from "../components/Home/Categories";
import TopSellers from "../components/Home/TopSellers";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetBanners,
  handleGetNewArrivals,
  handleGetTopSellers,
} from "../redux/GetContentSlice";
import { calculateTotalAmount, calculateTotalQuantity } from "../redux/CartSlice";

const Home = () => {
  const { t } = useTranslation();

  const { token, user } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetNewArrivals({ token }));
    dispatch(handleGetBanners());
    dispatch(handleGetTopSellers({ token }));
    if (user !== null) {
      dispatch(calculateTotalQuantity());
      dispatch(calculateTotalAmount());
    }
  }, []);
  return (
    <>
      <Helmet title={t("Home")} />
      <div className="md:space-y-5 space-y-2 w-full">
        <Herosection />
        <NewArrivals />
        <TopSellers />
        <Categories />
      </div>
    </>
  );
};

export default Home;

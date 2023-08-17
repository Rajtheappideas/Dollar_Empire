import React, { useEffect, useRef, useState } from "react";
import Herosection from "../components/Home/Herosection";
import NewArrivals from "../components/Home/NewArrivals";
import Categories from "../components/Home/Categories";
import TopSellers from "../components/Home/TopSellers";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleGetBanners } from "../redux/GetContentSlice";
import {
  handleGetAllProducts,
  handleGetNewArrivals,
  handleGetTopSellers,
} from "../redux/ProductSlice";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
} from "../redux/CartSlice";
import axios from "axios";

const Home = () => {
  const { t } = useTranslation();

  const { token, user } = useSelector((state) => state.Auth);
  const { productLoading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const AbortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(calculateTotalQuantity());
      dispatch(calculateTotalAmount());
    }
  }, [user, productLoading]);

  return (
    <>
      <Helmet title={t("Home | Dollar Empire")} />
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

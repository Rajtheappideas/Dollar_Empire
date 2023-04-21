import React, { useEffect } from "react";
import FilterComponent from "../components/FilterComponent";
import { Helmet } from "react-helmet";
import {
  BsGridFill,
  BsChevronLeft,
  BsChevronRight,
  BsPlus,
} from "react-icons/bs";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import img1 from "../assets/images/product.png";
import img2 from "../assets/images/procuct-1.png";
import img3 from "../assets/images/product-2.png";
import img4 from "../assets/images/product-3.png";
import img5 from "../assets/images/product-4.png";
import SingleProdcutCard from "../components/SingleProdcutCard";
import { useLocation } from "react-router-dom";

const ProductListing = () => {
  const [selectedView, setSelectedView] = useState("grid");

  const { title, price, searchQuery } = useLocation().state;

  const Products = [
    {
      id: 1,
      title: "2 Liter Pressure Spray Bottle",
      productId: "12345677",
      img: img1,
    },
    {
      id: 2,
      title: "Easter grass",
      productId: "12345677",
      img: img2,
    },
    {
      id: 3,
      title: "Native toothpaste",
      productId: "12345677",
      img: img3,
    },
    {
      id: 4,
      title: "Kumchun sauce",
      productId: "12345677",
      img: img4,
    },
    {
      id: 5,
      title: "Native toothpaste",
      productId: "12345677",
      img: img3,
    },
    {
      id: 6,
      title: "Kumchun sauce",
      productId: "12345677",
      img: img4,
    },
    {
      id: 7,
      title: "ADVIL LIQUI-GELS",
      productId: "12345677",
      img: img5,
    },
    {
      id: 8,
      title: "Native toothpaste",
      productId: "12345677",
      img: img3,
    },
  ];

  return (
    <>
      <Helmet title={title} />
      <section className="bg-BACKGROUNDGRAY space-y-5">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-BACKGROUNDGRAY lg:pb-20 pb-10">
          <h1 className="block font-semibold md:text-4xl text-2xl text-left">
            {title === "Price" ? (
              <>
                By Price:<span className="text-PRIMARY ml-1">"{price}"</span>
              </>
            ) : title === "Price" ? (
              <>
                Search for:
                <span className="text-PRIMARY ml-1">"{searchQuery}"</span>
              </>
            ) : (
              title
            )}
          </h1>
          <div className="w-full flex items-start justify-start gap-5 lg:flex-row flex-col">
            {/* filter */}
            <section className="lg:w-[20%] w-full">
              <FilterComponent />
            </section>
            {/* products listing*/}
            <section className="lg:w-[80%] w-full space-y-5">
              {/* filter + grid + add items btn */}
              <div className="flex items-center w-full gap-3 xl:flex-row flex-col">
                {/* grid & items showing filters */}
                <div className="xl:w-[80%] w-full border border-BORDERGRAY bg-white p-3 flex md:flex-row flex-col md:items-center items-start md:justify-between gap-3">
                  {/* grid view */}
                  <div className="flex items-center gap-4 w-full">
                    <BsGridFill
                      className={`h-6 w-6 ${
                        selectedView == "grid"
                          ? "text-PRIMARY"
                          : "text-gray-400"
                      }`}
                      role="button"
                      onClick={() => setSelectedView("grid")}
                    />
                    <div
                      onClick={() => setSelectedView("grid3")}
                      role="button"
                      className="flex items-center gap-x-0.5"
                    >
                      <p
                        className={`${
                          selectedView == "grid3" ? "bg-PRIMARY" : "bg-gray-400"
                        } h-6 rounded-sm w-2 `}
                      ></p>
                      <p
                        className={`${
                          selectedView == "grid3" ? "bg-PRIMARY" : "bg-gray-400"
                        } h-6 rounded-sm w-2 ml-0.5`}
                      ></p>
                    </div>
                    <div
                      onClick={() => setSelectedView("gridsingle")}
                      role="button"
                    >
                      <p
                        className={`${
                          selectedView === "gridsingle"
                            ? "bg-PRIMARY"
                            : "bg-gray-400"
                        } h-2 rounded-sm w-6 `}
                      ></p>
                      <p
                        className={`${
                          selectedView === "gridsingle"
                            ? "bg-PRIMARY"
                            : "bg-gray-400"
                        } h-2 rounded-sm w-6 mt-0.5`}
                      ></p>
                    </div>
                    <p className="font-medium text-base">1 of 32 149 items</p>
                  </div>
                  {/* filter dropdown */}
                  <div className="flex  md:flex-nowrap flex-wrap items-center xl:gap-x-4 gap-2">
                    <span className="font-medium">Sort:</span>
                    <select className="bg-gray-200 text-black w-28 p-2 rounded-md  font-medium">
                      <option value="Newest">Newest</option>
                      <option value="Oldest">Oldest</option>
                    </select>
                    <span className="font-medium">Show:</span>
                    <select className="bg-gray-200 text-black w-28 p-2 rounded-md  font-medium">
                      <option value="128">128</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>
                {/* add items btn */}
                <button
                  type="button"
                  className="xl:w-[20%] w-auto px-3 bg-PRIMARY text-white text-center xl:h-14 h-12 ml-auto"
                >
                  <BsPlus className="w-6 h-6 inline-block" />
                  Add Selected items
                </button>
              </div>
              {/* prodcts */}
              <div
                className={`w-full grid ${
                  selectedView === "grid"
                    ? "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3"
                    : selectedView === "grid3"
                    ? "xl:grid-cols-3 lg:grid-cols-2 gap-5"
                    : "grid-cols-1 gap-y-5"
                } place-items-start items-center`}
              >
                {Products.map((product) =>
                  selectedView === "gridsingle" ? (
                    <SingleProdcutCard
                      title={title}
                      key={product?.id}
                      product={product}
                    />
                  ) : (
                    <ProductCard
                      title={title}
                      key={product?.id}
                      product={product}
                    />
                  )
                )}
              </div>
              {/* pagination */}
              <div className="flex xl:flex-row flex-col items-center w-full gap-3 ">
                <div className="xl:w-[80%] w-full border border-BORDERGRAY bg-white p-3 flex md:flex-row flex-col gap-3 items-center justify-between">
                  {/* pagination */}
                  <div className="flex items-center gap-x-2">
                    <span
                      role="button"
                      className="bg-gray-200 w-10 h-10 p-2 rounded-md"
                    >
                      <BsChevronLeft className="h-5 w-5 rounded-md text-black" />
                    </span>
                    <span
                      role="button"
                      className="bg-PRIMARY text-white px-4 py-2 rounded-md text-center"
                    >
                      1
                    </span>
                    <span
                      role="button"
                      className="bg-gray-200 text-black px-4 py-2 rounded-md text-center"
                    >
                      2
                    </span>
                    <span
                      role="button"
                      className="bg-gray-200 text-black px-4 py-2 rounded-md text-center"
                    >
                      3
                    </span>
                    <span
                      role="button"
                      className="bg-gray-200 text-black px-4 py-2 rounded-md text-center"
                    >
                      10
                    </span>

                    <span
                      role="button"
                      className="bg-gray-200 w-10 h-10 p-2 rounded-md"
                    >
                      <BsChevronRight className="h-5 w-5 rounded-md text-black" />
                    </span>
                  </div>
                  {/* filter dropdown */}
                  <div className="flex items-center gap-x-4">
                    <span className="font-medium mr-1">Show:</span>
                    <select className="bg-gray-200 text-black w-28 p-2 rounded-md font-medium">
                      <option value="128">128</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>
                {/* btn */}
                <button
                  type="button"
                  className="xl:w-[20%] w-auto px-3 bg-PRIMARY text-white text-center xl:h-16 h-12 ml-auto"
                >
                  <BsPlus className="w-6 h-6 inline-block" />
                  Add Selected items
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;

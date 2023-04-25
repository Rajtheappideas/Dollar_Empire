import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../redux/GlobalStates";

const SingleProdcutCard = ({ product, title }) => {
  const { user } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();
  return (
    <>
      <div className="lg:space-y-3 relative space-y-2 w-full xl:p-3 md:p-5 p-3 bg-white font-semibold md:text-lg border rounded-lg border-[#EAEAEA] flex xl:flex-row flex-col items-start justify-between">
        {/* top seller label */}
        {title === "Top Sellers" && (
          <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute top-0 left-0">
            Top Seller
          </p>
        )}

        {/* left side */}
        <div className="h-auto xl:w-2/3 w-full flex md:flex-row flex-col md:items-start items-center justify-start xl:gap-5 gap-3">
          {/* img */}
          <img
            src={product?.img}
            alt={product?.title}
            className="xl:w-48 md:h-auto md:w-1/2 w-full h-40 cursor-pointer xl:object-fill object-contain object-center"
            title={product?.title}
            onClick={() => {
              dispatch(showPopup());
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          {/* details */}
          {user === null ? (
            <ul className="space-y-1 font-medium text-black w-full">
              <li className="text-PRIMARY font-semibold">
                ITEM NO.{product?.productId}
              </li>
              <li
                className="font-bold tracking-normal py-1"
                title={product?.title}
              >
                {product?.title}
              </li>
              <li className="w-7/12">
                <Link to="/sign-in" className="w-full">
                  <button
                    type="button"
                    className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                  >
                    Login to order
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="space-y-1 font-medium text-black w-full">
              <li className="text-PRIMARY font-semibold">
                ITEM NO.{product?.productId}
              </li>
              <li
                className="font-bold tracking-normal py-1"
                title={product?.title}
              >
                {product?.title}
              </li>
              <li className="text-BLACK md:text-sm text-base">
                24 PC / PK, 144 PC / CTN
              </li>
              <li className="text-BLACK md:text-sm text-base">
                PK volume : 0.75 cu ft{" "}
              </li>
              <li className="text-BLACK md:text-sm text-base">
                CTN volume : 4.5 cu ft{" "}
              </li>
              <li className="text-BLACK md:text-sm text-base">
                Pk wt : 2 Lbs{" "}
              </li>
              <li className="text-BLACK md:text-sm text-base">
                CTN wt : 12 Lbs{" "}
              </li>
            </ul>
          )}
        </div>
        {/* right side */}
        {user !== null && (
          <div className="h-auto xl:w-auto w-full space-y-3 xl:text-right text-left">
            <p className="font-bold md:text-lg">
              $0.50/PC, $12.00/PK, $72.00/CTN
            </p>
            <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
              <input name="quantity" type="radio" className="w-5 h-5" />
              <span className="font-semibold text-sm whitespace-nowrap pr-2">
                PC QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="text"
                  className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                  placeholder="24 PC"
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                  0 PK
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                />
              </div>
            </div>
            <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
              <input name="quantity" type="radio" className="w-5 h-5" />
              <span className="font-semibold text-sm whitespace-nowrap">
                CTN QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="text"
                  className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                  placeholder="144 PC"
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                  0 CTN
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                />
              </div>
            </div>
            <p className="flex items-center gap-x-2">
              <Link to="/cart" className="w-11/12">
                <button
                  type="button"
                  className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                >
                  Add to cart
                  <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                </button>
              </Link>
              <AiOutlineHeart
                className="w-10 h-10 text-gray-300"
                role="button"
              />
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProdcutCard;

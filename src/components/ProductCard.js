import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import ProductDetailPopup from "./ProductDetailPopup";

const ProductCard = ({ product, setShowProductDetailPopup }) => {
  return (
    <>
      <div className="space-y-3 w-full md:p-3 p-4 bg-white lg:min-h-[28rem] md:min-h-[21rem] min-h-[19rem] font-semibold md:text-lg border rounded-lg border-[#EAEAEA]">
        <img
          src={product?.img}
          alt={product?.title}
          className="lg:h-64 md:h-40 h-32 cursor-pointer w-full object-contain object-center"
          title={product?.title}
          onClick={() => setShowProductDetailPopup(true)}
        />
        <p
          className="font-bold tracking-normal truncate"
          title={product?.title}
        >
          {product?.title}
        </p>
        <p className="text-BLACK">{product?.productId}</p>
        {/* <>
      <p className="text-BLACK text-sm text-center">24 PC / PK, 144 PC / CTN</p>
      <p className="text-PRIMARY text-base font-bold text-center">
        $0.50/PC | $72.00/CTN
      </p>
        // pc qty
        <p className="flex w-full items-center gap-x-2 relative z-0">
          <input name="quantity" type="radio" className="w-5 h-5" />
          <span className="font-semibold text-sm whitespace-nowrap">
            PC QTY
          </span>
          <input
            type="text"
            className="w-11/12 h-10 text-sm pr-[5.4rem] pl-0.5 rounded-md outline-none border border-BORDERGRAY"
            placeholder="24 PC"
          />
          <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-14">
            0 PK
          </span>
          <AiOutlineMinus
            role="button"
            className=" text-BLACK w-5 h-5 absolute top-1/2 -translate-y-1/2 right-7"
          />
          <AiOutlinePlus
            role="button"
            className=" text-BLACK w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2"
          />
        </p>
        // ctn qty
        <p className="flex w-full items-center gap-x-1 relative z-0">
          <input name="quantity" type="radio" className="w-5 h-5" />
          <span className="font-semibold text-sm whitespace-nowrap">
            CTN QTY
          </span>
          <input
            type="text"
            className="w-11/12 h-10 text-sm pr-[5.4rem] pl-0.5 rounded-md outline-none border border-BORDERGRAY"
            placeholder="144 PC"
          />
          <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-14">
            0 CTN
          </span>
          <AiOutlineMinus
            role="button"
            className=" text-BLACK w-5 h-5 absolute top-1/2 -translate-y-1/2 right-7"
          />
          <AiOutlinePlus
            role="button"
            className=" text-BLACK w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2"
          />
        </p>
        // cart btn & favourite btn
        <p className="flex items-center gap-x-2">
          <Link to="/sign-in" className="w-11/12">
            <button
              type="button"
              className="bg-GREEN text-white text-center w-full p-3 rounded-lg"
            >
              Add to cart
              <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
            </button>
          </Link>
          <AiOutlineHeart className="w-10 h-10 text-gray-300" role="button" />
        </p>
      </> */}

        {/* login btn if user not logged in */}
        <Link to="/sign-in" className="mt-2">
          <button
            type="button"
            className="bg-GREEN text-white text-center w-full mt-3 p-3 rounded-lg"
          >
            Login to order
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;

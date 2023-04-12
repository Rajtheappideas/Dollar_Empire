import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar, BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* first section */}
      <div className="flex w-full justify-stretch items-center h-auto md:py-2 xl:px-20 md:px-10 px-3 md:gap-x-0 gap-x-2">
        <div className="flex-grow">
          <Link to="/" className="inline-block">
            <img
              src={require("../assets/images/dollar-empire-logo 1.png")}
              alt="logo"
              className="md:h-fit md:w-fit w-20 h-20 object-contain object-center"
            />
          </Link>
        </div>
        <div className="flex-grow md:block hidden">
          {" "}
          <img
            src={require("../assets/images/familymaid 1.png")}
            alt="logo"
            className="h-fit w-fit object-contain object-center"
          />
        </div>
        <div className="flex items-center md:gap-x-8 gap-x-1 md:text-lg font-semibold ">
          <p className="text-sm text-PRIMARY" role="button">
            <span className="flex items-center">
              SP <TiArrowBack className="h-5 w-5 inline-block" color="blue" />
            </span>
            <span className="flex items-center">
              <TiArrowBack
                className="h-5 w-5 inline-block rotate-180"
                color="blue"
              />
              EN
            </span>
          </p>
          <button type="button">
            <Link to="/sign-in">Login / Register</Link>
          </button>
          {/* <div className="flex items-center gap-x-2">
            <AiOutlineUser className="w-8 h-8" />
            <p className="text-left">
              <span className="text-gray-300 text-sm block">Hello, john</span>
              <span className="text-BLACK md:text-base text-sm font-bold block">
                My Account
              </span>
            </p>
          </div> */}
        </div>
      </div>
      {/* second section */}
      <div className="bg-PRIMARY text-white w-full flex lg:flex-row flex-col justify-between lg:items-center items-start gap-5 lg:gap-0 md:py-5 py-2 xl:px-20 md:px-10 px-3">
        <div className="lg:w-1/2 w-full text-black">
          <p className="relative z-0 flex items-center w-full bg-white rounded-md p-3">
            <select className="outline-none border-none font-semibold rounded-tl-lg rounded-bl-lg md:w-1/4 w-1/2 text-[#494949]">
              <option label="All Categories"></option>
              <option>opt1</option>
              <option>opt1</option>
              <option>opt1</option>
            </select>
            <span className="px-4 text-gray-400">|</span>
            <input
              type="text"
              className="rounded-tr-lg rounded-br-lg outline-none md:w-3/4 w-1/2 text-black pr-7"
              placeholder="Search Products..."
            />
            <BsSearch
              role="button"
              className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-3 z-10 text-black"
            />
          </p>
        </div>
        {/* cart + amount */}
        <div className="flex items-center md:gap-x-2 gap-x-1">
          <AiOutlineShoppingCart className="w-7 h-7" />
          <p>
            <span className="md:mr-2">Shopping cart: </span>
            <input
              type="tel"
              className="md:w-12 w-10 h-9 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
            />
            <span className="md:ml-2">PC</span>
          </p>
          <p>|</p>
          <p>
            <BsCurrencyDollar className="h-5 w-5 md:mr-2 inline-block" />
            <input
              type="tel"
              className="md:w-12 w-10 h-9 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
            />
          </p>
        </div>
      </div>
      {/* third section */}
      <div className="xl:px-20 md:px-10 w-full flex flex-wrap md:gap-5 gap-3 items-center justify-start md:py-5 py-2 font-semibold md:text-lg px-3">
        <select className="bg-black text-white lg:w-52 w-auto p-3 capitalize font-semibold">
          <option label="All Categories"></option>
          <option>opt1</option>
          <option>opt1</option>
          <option>opt1</option>
          <option>opt1</option>
        </select>
        <p role="button">New Arrivals</p>
        <p role="button">Top Sellers</p>
        <p role="button">By Price</p>
        <p role="button">Your Favourites</p>
        <p
          role="button"
          className="bg-DARKYELLOW text-black p-2 whitespace-nowrap"
        >
          Minimum order $250
        </p>
      </div>
    </div>
  );
};

export default Header;

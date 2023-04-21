import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  BsCurrencyDollar,
  BsSearch,
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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
          <Link to="/" className="inline-block">
            <img
              src={require("../assets/images/familymaid 1.png")}
              alt="logo"
              className="h-fit w-fit object-contain object-center"
            />
          </Link>
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
          {/* <Link to="/my-account">
            <div className="flex items-center gap-x-2">
              <AiOutlineUser className="w-8 h-8" />
              <p className="text-left">
                <span className="text-gray-300 text-sm block">Hello, john</span>
                <span className="text-BLACK md:text-base text-sm font-bold block">
                  My Account
                </span>
              </p>
            </div>
          </Link> */}
        </div>
      </div>
      {/* second section */}
      <div className="bg-PRIMARY text-white w-full flex lg:flex-row flex-col justify-between lg:items-center items-start gap-5 lg:gap-0 md:py-5 py-2 xl:px-20 md:px-10 px-3">
        <div className="lg:w-1/2 w-full text-black">
          <div className="capitalize font-semibold relative z-30 flex items-center w-full bg-white rounded-md p-3">
            {/* menu */}
            <div className="relative z-30 group md:w-40">
              <p className="cursor-pointer flex items-center justify-between flex-row text-black font-normal">
                <span className="text-base whitespace-nowrap">
                  All Categories
                </span>
                <BsChevronDown className="h-5 w-5 ml-auto md:pl-0 pl-2" />
              </p>
              {/* menu */}
              <div className="text-left p-2 absolute top-10 left-0 z-50 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
                <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-3 md:min-w-[14rem] min-w-[10rem] ">
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Apparel (28){" "}
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem] ">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Bed & Bath (38)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Camping (40)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Cosmetics (58)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Hair care (45)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Health care (58)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Jewelry (18)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Lighting (75)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    View all (Low to high)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    View all (High to low)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Audio & Video Supplies (15)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Batteries (20)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Cameras & Clocks (8)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        Electric Accessories (13)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (Low to high)
                      </span>
                      <span className="font-normal whitespace-nowrap block hover:font-semibold">
                        View all (High to low)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <span className="px-4 text-gray-400">|</span>
            {/* input field */}
            <input
              type="text"
              className="rounded-tr-lg rounded-br-lg outline-none md:w-3/4 w-1/2 text-black pr-7"
              placeholder="Search Products..."
            />

            <BsSearch
              role="button"
              className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-3 z-10 text-black"
              onClick={() =>
                navigate("/product-listing", {
                  state: { title: "Search", price: null, searchQuery: "music" },
                })
              }
            />
          </div>
        </div>
        {/* cart + amount */}
        <div className="flex items-center gap-x-2">
          <AiOutlineShoppingCart className="w-7 h-7" />
          <p>
            <span className="md:mr-2 mr-1">
              <Link to="/cart">Shopping cart:</Link>
            </span>
            <input
              type="tel"
              className="md:w-12 w-10 text-black h-9 p-3 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
            />
            <span className="md:ml-2 ml-1">PC</span>
          </p>
          <p>|</p>
          <p>
            <BsCurrencyDollar className="h-5 w-5 md:mr-2 inline-block" />
            <input
              type="tel"
              className="md:w-12 w-10 h-9 text-black p-3 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
            />
          </p>
        </div>
      </div>
      {/* third section */}
      <div
        className={`xl:px-20 md:px-10 w-full flex flex-wrap md:gap-5 gap-3 items-center justify-start md:py-5 py-2 font-semibold md:text-lg px-3 ${
          (window.location.pathname.includes("my-account") ||
            window.location.pathname.includes("product-listing") ||
            window.location.pathname.includes("favourites")) &&
          "bg-BACKGROUNDGRAY"
        }`}
      >
        {/* all categories */}
        <div className="capitalize font-semibold relative z-10 group">
          <p className="cursor-pointer flex items-center justify-between flex-row md:w-60 w-auto p-3 bg-black text-white ">
            <span className="md:text-xl text-lg whitespace-nowrap">
              All Categories
            </span>
            <BsChevronDown className="h-5 w-5 ml-auto md:pl-0 pl-2" />
          </p>
          {/* menu */}
          <div className="text-left p-2 absolute top-14 left-0 z-30 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
            <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-3 min-md:w-[14rem]  min-w-[10rem">
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Apparel (28){" "}
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Bed & Bath (38)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Camping (40)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Cosmetics (58)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Hair care (45)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Health care (58)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Jewelry (18)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Lighting (75)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                View all (Low to high)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                View all (High to low)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <p className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white min-w-[10rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Audio & Video Supplies (15)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Batteries (20)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Cameras & Clocks (8)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    Electric Accessories (13)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (Low to high)
                  </span>
                  <span className="font-normal whitespace-nowrap block hover:font-semibold">
                    View all (High to low)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p>
          <Link
            to="/product-listing"
            state={{ title: "New Arrivals", price: null, searchQuery: "" }}
          >
            New Arrivals
          </Link>
        </p>
        <p>
          <Link
            to="/product-listing"
            state={{ title: "Top Sellers", price: null, searchQuery: "" }}
          >
            Top Sellers
          </Link>
        </p>
        {/* by price */}
        <div role="button" className="group relative z-30">
          By Price
          <div className="text-left p-2 shadow-md absolute top-8 left-0 z-10 bg-white w-48 rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
            <ul className="pl-3 text-lg font-normal text-gray-400 capitalize space-y-2">
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Any
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "$0.70 - $0.89",
                    searchQuery: "",
                  }}
                >
                  $0.70 - $0.89
                </Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "$0.90 - $1.99",
                    searchQuery: "",
                  }}
                >
                  $0.90 - $1.99
                </Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "$2.00 - $2.99",
                    searchQuery: "",
                  }}
                >
                  $2.00 - $2.99
                </Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "Over $3.00",
                    searchQuery: "",
                  }}
                >
                  Over $3.00
                </Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "Low to high",
                    searchQuery: "",
                  }}
                >
                  Low to high
                </Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to="/product-listing"
                  state={{
                    title: "Price",
                    price: "High to low",
                    searchQuery: "",
                  }}
                >
                  High to low
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* favourites */}
        <p role="button">
          <Link to="/favourites">Your Favourites</Link>
        </p>
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

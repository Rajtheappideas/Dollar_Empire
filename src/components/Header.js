import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import {
  BsCurrencyDollar,
  BsSearch,
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveComponent } from "../redux/GlobalStates";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state) => state.Auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openSidebar]);
  return (
    <div>
      {/* first section */}
      <div className="flex relative z-40 w-full justify-stretch items-center md:h-auto h-14 md:py-2 xl:px-20 md:px-10 px-3 md:gap-x-0 gap-x-1">
        {/* first logo */}
        <div className="flex-grow">
          <Link to="/" className="inline-block">
            <img
              src={require("../assets/images/dollar-empire-logo 1.png")}
              alt="logo"
              className="md:h-fit md:w-fit w-20 h-20 object-contain object-center"
            />
          </Link>
        </div>
        {/* second logo */}
        <div className="flex-grow">
          {" "}
          <Link to="/" className="inline-block">
            <img
              src={require("../assets/images/familymaid 1.png")}
              alt="logo"
              className="md:h-fit md:w-fit w-24 h-24 object-contain object-center"
            />
          </Link>
        </div>
        {/* language + login /register */}
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

          {user === null ? (
            <>
              <button type="button" className="md:block hidden">
                <Link to="/sign-in">Login / Register</Link>
              </button>
              <HiOutlineBars3
                onClick={() => setOpenSidebar(true)}
                role="button"
                className="h-8 w-8 block md:hidden"
              />
            </>
          ) : (
            <>
              <Link to="/my-account" className="md:block hidden">
                <div className="flex items-center gap-x-2">
                  <AiOutlineUser className="w-8 h-8" />
                  <p className="text-left">
                    <span className="text-gray-400 font-semibold text-sm block capitalize">
                      Hello, {user?.fname}
                    </span>
                    <span className="text-BLACK md:text-base text-sm font-bold block">
                      My Account
                    </span>
                  </p>
                </div>
              </Link>
              <Link to="/my-account" className="md:hidden block">
                <AiOutlineUser
                  role="button"
                  className="h-8 w-8 block md:hidden"
                />
              </Link>
            </>
          )}
        </div>

        {/* sidebar for mobile */}
        <div
          className={`absolute z-40 top-0 right-0 text-center transform duration-300 ease-in origin-top-right ${
            openSidebar ? "scale-100" : "scale-0"
          } font-semibold text-xl bg-white w-full h-screen p-3 text-PRIMARY space-y-3`}
        >
          <p className="pt-4">
            <HiXMark
              role="button"
              onClick={() => setOpenSidebar(false)}
              className="h-6 w-6 float-right"
            />
          </p>
          {user === null ? (
            <>
              <p className="pt-5" onClick={() => setOpenSidebar(false)}>
                <Link to="/sign-in">Login</Link>
              </p>
              <p className="pt-5" onClick={() => setOpenSidebar(false)}>
                <Link to="/sign-up">Register</Link>
              </p>
            </>
          ) : (
            <p className="pt-5" onClick={() => setOpenSidebar(false)}>
              <Link to="/my-account">My Account</Link>
            </p>
          )}
        </div>
      </div>
      {/* second section */}
      <div className="bg-PRIMARY text-white w-full flex lg:flex-row flex-col justify-between lg:items-center items-start gap-5 lg:gap-0 md:py-5 py-2 xl:px-20 md:px-10 px-3">
        <div className="lg:w-1/2 w-full text-black">
          <div className="capitalize font-semibold relative z-30 flex items-center w-full bg-white rounded-md p-3">
            {/* menu */}
            <div className="relative z-0 group md:w-40">
              <p className="cursor-pointer flex items-center justify-between flex-row text-black font-normal">
                <span className="text-base whitespace-nowrap">
                  All Categories
                </span>
                <BsChevronDown className="h-5 w-5 ml-auto md:pl-0 pl-2" />
              </p>
              {/* menu */}
              <div className="text-left p-2 absolute top-9 -left-3 z-30 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
                <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-1 min-md:w-[14rem]  min-w-[10rem]">
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Apparel (28){" "}
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[3rem] max-w-[14rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Bed & Bath (38)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Camping (40)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Cosmetics (58)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Hair care (45)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Health care (58)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Jewelry (18)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    Lighting (75)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    View all (Low to high)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    View all (High to low)
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                    <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                      <span className="font-semibold text-black text-xl">
                        Electronics
                      </span>
                      <hr />
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                          Audio & Video Supplies (15)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Batteries (20)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Cameras & Clocks (8)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          Electric Accessories (13)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (Low to high)
                        </span>
                      </Link>
                      <Link
                        to="/product-listing"
                        state={{
                          title: "Electronic",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="font-normal whitespace-nowrap block hover:font-semibold">
                          View all (High to low)
                        </span>
                      </Link>
                    </div>
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
              <Link
                to="/cart"
                onClick={() =>
                  dispatch(handleChangeActiveComponent("Shopping_Cart"))
                }
              >
                Shopping cart:
              </Link>
            </span>
            <input
              type="number"
              className="md:w-12 w-10 text-black h-9 p-3 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
            />
            <span className="md:ml-2 ml-1">PC</span>
          </p>
          <p>|</p>
          <p>
            <BsCurrencyDollar className="h-5 w-5 md:mr-2 inline-block" />
            <input
              type="number"
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
        <div className="capitalize font-semibold relative z-20 group">
          <p className="cursor-pointer flex items-center justify-between flex-row md:w-56 w-auto md:p-3 p-2 bg-black text-white ">
            <span className="md:text-xl text-lg whitespace-nowrap">
              All Categories
            </span>
            <BsChevronDown className="h-5 w-5 ml-auto md:pl-0 pl-2" />
          </p>
          {/* menu */}
          <div className="text-left p-2 absolute top-14 left-0 z-30 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
            <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-1 min-md:w-[14rem]  min-w-[10rem]">
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Apparel (28){" "}
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[3rem] max-w-[14rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Bed & Bath (38)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Camping (40)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Cosmetics (58)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Hair care (45)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Health care (58)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Jewelry (18)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                Lighting (75)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                View all (Low to high)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                View all (High to low)
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[8rem]">
                  <span className="font-semibold text-black text-xl">
                    Electronics
                  </span>
                  <hr />
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                      Audio & Video Supplies (15)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Batteries (20)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Cameras & Clocks (8)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      Electric Accessories (13)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (Low to high)
                    </span>
                  </Link>
                  <Link
                    to="/product-listing"
                    state={{
                      title: "Electronic",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="font-normal whitespace-nowrap block hover:font-semibold">
                      View all (High to low)
                    </span>
                  </Link>
                </div>
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
        <div role="button" className="group relative z-10">
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

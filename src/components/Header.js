import React, { useRef } from "react";
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
import {
  handleChangeActiveComponent,
  handleChangeSearchProducts,
  handleChangeSearchTerm,
} from "../redux/GlobalStates";
import { useTranslation } from "react-i18next";
import { handleChangeUserLanguage } from "../redux/AuthSlice";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
} from "../redux/CartSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-hot-toast";
import { number } from "card-validator";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  const { user, userLanguage } = useSelector((state) => state.Auth);
  const { searchTerm } = useSelector((state) => state.globalStates);
  const { totalQuantity, grandTotal } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const { categories, loading, subCategories } = useSelector(
    (state) => state.getContent
  );
  const { t } = useTranslation();

  const searchRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // for stop scroll when sidebar open
  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openSidebar]);

  // set active subcategory
  useEffect(() => {
    if (activeCategory !== "") {
      setSubCategoryProducts(subCategories[activeCategory]);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (user !== null) {
      dispatch(calculateTotalQuantity());
      dispatch(calculateTotalAmount());
    }
  }, [user]);

  const handleSearchProducts = () => {
    toast.dismiss();
    if (searchTerm === "") {
      searchRef.current.focus();
      return toast.error("Please enter a word!!!");
    }
    const filteredProducts = allProducts.filter((entry) =>
      Object.values(entry).some((val) => {
        return (
          (typeof val === "string" || typeof val === number) &&
          val.toLocaleLowerCase().includes(searchTerm)
        );
      })
    );
    if (filteredProducts.length === 0) {
      return toast.error(`Product not found releated "${searchTerm}".`, {
        style: {
          fontSize: "14px",
          fontWeight: "normal",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      dispatch(handleChangeSearchProducts(filteredProducts));
      navigate(`/product-listing/search`);
    }
  };
  return (
    <div>
      {/* first section */}
      <div className="flex relative z-20 w-full justify-stretch items-center md:h-auto h-14 md:py-2 xl:px-20 md:px-10 px-3 md:gap-x-0 gap-x-1">
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
          <p
            className="text-sm text-PRIMARY"
            role="button"
            onClick={() => {
              userLanguage === "en"
                ? window.localStorage.setItem("user_lang", JSON.stringify("es"))
                : window.localStorage.setItem(
                    "user_lang",
                    JSON.stringify("en")
                  );
              dispatch(
                handleChangeUserLanguage(userLanguage === "en" ? "es" : "en")
              );
              window.location.reload();
            }}
          >
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
                <Link to="/sign-in">{t("login")}</Link>
                <Link to="/sign-up">/ {t("register")}</Link>
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
                      {t("hello")}, {user?.fname}
                    </span>
                    <span className="text-BLACK md:text-base text-sm font-bold block">
                      {t("my_account")}
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
                <Link to="/sign-in">{t("login")}</Link>
              </p>
              <p className="pt-5" onClick={() => setOpenSidebar(false)}>
                <Link to="/sign-up">{t("register")}</Link>
              </p>
            </>
          ) : (
            <p className="pt-5" onClick={() => setOpenSidebar(false)}>
              <Link to="/my-account">{t("my_account")}</Link>
            </p>
          )}
        </div>
      </div>
      {/* second section */}
      <div className="bg-PRIMARY text-white w-full flex lg:flex-row flex-col justify-between lg:items-center items-start gap-5 lg:gap-0 md:py-5 py-2 xl:px-20 md:px-10 px-3">
        {/* left side div */}
        <div className="lg:w-1/2 w-full text-black">
          <div className="capitalize font-semibold relative z-20 flex items-center w-full bg-white rounded-md p-3">
            {/* menu */}
            <div className="relative z-0 group min-w-[10rem]">
              <p className="cursor-pointer flex items-center justify-between flex-row text-black font-normal ">
                <span className="text-base whitespace-nowrap">
                  {t("all_categories")}
                </span>
                <BsChevronDown className="h-4 w-4 ml-2" />
              </p>
              {/* menu */}
              <div className="text-left p-2 absolute top-9 -left-3 z-20 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
                <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-1 min-md:w-[14rem]  min-w-[10rem]">
                  {loading ? (
                    <SkeletonTheme
                      baseColor="lightgray"
                      highlightColor="white"
                      duration={0.5}
                      borderRadius="5px"
                    >
                      <Skeleton className=" h-4" />
                      <Skeleton className=" h-4" />
                      <Skeleton className=" h-4" />
                      <Skeleton className=" h-4" />
                      <Skeleton className=" h-4" />
                      <Skeleton className=" h-4" />
                    </SkeletonTheme>
                  ) : (
                    <>
                      <Link
                        to={`/product-listing/all-products`}
                        state={{
                          title: "all-products",
                          price: null,
                          searchQuery: "",
                        }}
                      >
                        {" "}
                        <span className="cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold whitespace-nowrap block">
                          All Categories
                        </span>
                      </Link>
                      {categories.map((category) => (
                        <div
                          className={`submenu z-20 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                          key={category?._id}
                          onMouseOver={() => setActiveCategory(category.name)}
                        >
                          <Link
                            key={category?._id}
                            to={`/product-listing/${category.name}`}
                            // state={{
                            //   title: category.name,
                            //   price: null,
                            //   searchQuery: "",
                            // }}
                          >
                            {category.name} ({category?.productCount})
                          </Link>
                          <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                          {/* side dropdown */}
                          <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[3rem] ">
                            <span className="font-semibold text-black text-xl">
                              {activeCategory}
                            </span>

                            {subCategoryProducts?.subcategories !== undefined &&
                              subCategoryProducts?.subcategories.map((item) => (
                                <Link
                                  key={item?._id}
                                  to={`/product-listing/${category.name}`}
                                  state={{
                                    title: category.name,
                                    price: null,
                                    searchQuery: "",
                                  }}
                                >
                                  <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                                    {item.name} ({item?.productCount})
                                  </span>
                                </Link>
                              ))}

                            <Link
                              to={`/product-listing/low-to-high`}
                              // state={{
                              //   title: "low-to-high",
                              //   price: null,
                              //   searchQuery: "",
                              // }}
                            >
                              {" "}
                              <span className="font-normal whitespace-nowrap block hover:font-semibold">
                                View all (Low to high)
                              </span>
                            </Link>
                            <Link
                              to={`/product-listing/high-to-low`}
                              // state={{
                              //   title: "high-to-low",
                              //   price: null,
                              //   searchQuery: "",
                              // }}
                            >
                              {" "}
                              <span className="font-normal whitespace-nowrap block hover:font-semibold">
                                View all (High to low)
                              </span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {/* low to high */}
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    <Link
                      to={`/product-listing/low-to-high`}
                      // state={{
                      //   title: "low-to-high",
                      //   price: null,
                      //   searchQuery: "",
                      // }}
                    >
                      {" "}
                      View all (Low to high)
                    </Link>
                    {/* View all (Low to high) */}
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                  </div>
                  {/* high to low */}
                  <div
                    className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                  >
                    <Link
                      to={`/product-listing/high-to-low`}
                      // state={{
                      //   title: "high-to-low",
                      //   price: null,
                      //   searchQuery: "",
                      // }}
                    >
                      View all (High to low)
                    </Link>
                    <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <span className="md:px-4 px-2 text-gray-400">|</span>
            {/* input field */}
            <input
              ref={searchRef}
              type="text"
              className="rounded-tr-lg rounded-br-lg outline-none md:w-3/4 w-1/2 text-black pr-7"
              placeholder={t("search_products").concat("...")}
              value={searchTerm}
              onChange={(e) => {
                dispatch(
                  handleChangeSearchTerm(
                    e.target.value.toLocaleLowerCase().trim()
                  )
                );
                // setSearchTerm(e.target.value.toLocaleLowerCase().trim());
              }}
            />

            <BsSearch
              role="button"
              className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-3 z-10 text-black"
              onClick={() => handleSearchProducts()}
            />
          </div>
        </div>
        {/* cart + amount */}
        <div className="flex items-center gap-x-2 flex-wrap">
          <AiOutlineShoppingCart className="w-7 h-7" />
          <p>
            <span className="md:mr-2 mr-1">
              <Link
                to="/cart"
                onClick={() =>
                  dispatch(handleChangeActiveComponent("Shopping_Cart"))
                }
              >
                {t("shopping_cart")}:
              </Link>
            </span>
            <input
              type="number"
              className="max-w-[5rem] inline-block text-black h-9 p-1 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
              value={totalQuantity}
              readOnly={true}
            />
            <span className="md:ml-2 ml-1">PC</span>
          </p>
          <p>|</p>
          <p>
            <BsCurrencyDollar className="h-5 w-5 md:mr-2 inline-block" />
            <input
              type="number"
              className="max-w-[5rem] h-9 text-black p-1 text-center rounded-md outline-none placeholder:text-black"
              placeholder="0"
              value={parseFloat(grandTotal).toFixed(2)}
              readOnly={true}
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
        <div className="capitalize font-semibold relative z-10 group md:min-w-[13rem]">
          <p className="cursor-pointer flex items-center justify-between flex-row w-auto md:p-3 p-2 bg-black text-white ">
            <span className="md:text-xl text-lg whitespace-nowrap">
              {t("all_categories")}
            </span>
            <BsChevronDown className="h-4 w-4 ml-2" />
          </p>
          {/* menu */}
          <div className="text-left p-2 absolute top-14 left-0 z-10 bg-white md:min-w-[14rem] min-w-[10rem] rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
            <div className="pl-3 text-base font-normal text-gray-400 capitalize space-y-1 min-md:w-[14rem]  min-w-[10rem]">
              {loading ? (
                <SkeletonTheme
                  baseColor="lightgray"
                  highlightColor="white"
                  duration={0.5}
                  borderRadius="5px"
                >
                  <Skeleton className=" h-4" />
                  <Skeleton className=" h-4" />
                  <Skeleton className=" h-4" />
                  <Skeleton className=" h-4" />
                  <Skeleton className=" h-4" />
                  <Skeleton className=" h-4" />
                </SkeletonTheme>
              ) : (
                <>
                  <Link
                    to={`/product-listing/all-products`}
                    state={{
                      title: "all-products",
                      price: null,
                      searchQuery: "",
                    }}
                  >
                    {" "}
                    <span className="cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold whitespace-nowrap block">
                      All Categories
                    </span>
                  </Link>
                  {categories.map((category) => (
                    <div
                      className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
                      key={category?._id}
                      onMouseOver={() => setActiveCategory(category.name)}
                    >
                      <Link
                        key={category?._id}
                        to={`/product-listing/${category.name}`}
                        // state={{
                        //   title: category.name,
                        //   price: null,
                        //   searchQuery: "",
                        // }}
                      >
                        {category.name} ({category?.productCount})
                      </Link>
                      <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
                      {/* side dropdown */}
                      <div className="text-left submenu2 space-y-2 p-3 absolute top-1 left-full z-50 bg-white md:min-w-[10rem] min-w-[3rem] ">
                        <span className="font-semibold text-black text-xl">
                          {activeCategory}
                        </span>

                        {subCategoryProducts?.subcategories !== undefined &&
                          subCategoryProducts?.subcategories.map((item) => (
                            <Link
                              key={item?._id}
                              to={`/product-listing/${category.name}`}
                              state={{
                                title: category.name,
                                price: null,
                                searchQuery: "",
                              }}
                            >
                              <span className="font-normal md:whitespace-nowrap block hover:font-semibold">
                                {item.name} ({item?.productCount})
                              </span>
                            </Link>
                          ))}

                        <Link
                          to={`/product-listing/low-to-high`}
                          // state={{
                          //   title: "low-to-high",
                          //   price: null,
                          //   searchQuery: "",
                          // }}
                        >
                          {" "}
                          <span className="font-normal whitespace-nowrap block hover:font-semibold">
                            View all (Low to high)
                          </span>
                        </Link>
                        <Link
                          to={`/product-listing/high-to-low`}
                          // state={{
                          //   title: "high-to-low",
                          //   price: null,
                          //   searchQuery: "",
                          // }}
                        >
                          {" "}
                          <span className="font-normal whitespace-nowrap block hover:font-semibold">
                            View all (High to low)
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {/* low to high */}
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to={`/product-listing/low-to-high`}
                  // state={{
                  //   title: "low-to-high",
                  //   price: null,
                  //   searchQuery: "",
                  // }}
                >
                  {" "}
                  View all (Low to high)
                </Link>
                {/* View all (Low to high) */}
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
              </div>
              {/* high to low */}
              <div
                className={`submenu z-50 cursor-pointer hover:font-bold hover:bg-BACKGROUNDGRAY py-1 text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link
                  to={`/product-listing/high-to-low`}
                  // state={{
                  //   title: "high-to-low",
                  //   price: null,
                  //   searchQuery: "",
                  // }}
                >
                  View all (High to low)
                </Link>
                <BsChevronRight className="inline-block ml-auto h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* new arrivals */}
        <p>
          <Link
            to={`/product-listing/new-arrivals`}
            state={{ title: "new-arrivals", price: null, searchQuery: "" }}
          >
            {t("new_arrivals")}
          </Link>
        </p>
        {/* top sellers */}
        <p>
          <Link
            to={`/product-listing/top-sellers`}
            state={{ title: "Top Sellers", price: null, searchQuery: "" }}
          >
            {t("top_sellers")}
          </Link>
        </p>
        {/* by price */}
        <div role="button" className="group relative z-10">
          {t("by_price")}
          <div className="text-left p-2 shadow-md absolute top-8 left-0 z-10 bg-white w-48 rounded-md group-hover:scale-100 scale-0 transform duration-300 ease-in origin-top-left">
            <ul className="pl-3 text-lg font-normal text-gray-400 capitalize space-y-2">
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/all-products`}>{t("any")}</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/$0.70 - $0.89`}>$0.70 - $0.89</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/$0.90 - $1.99`}>$0.90 - $1.99</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/$2.00 - $2.99`}>$2.00 - $2.99</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/Over $3.00`}>Over $3.00</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/low-to-high`}>Low to high</Link>
              </li>
              <li
                className={`cursor-pointer hover:font-bold text-BLACK font-semibold flex items-center gap-x-2`}
              >
                <Link to={`/product-listing/high-to-low`}>High to low</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* favourites */}
        <p role="button">
          <Link to="/favourites">{t("your_favourites")}</Link>
        </p>
        <p className="bg-DARKYELLOW text-black p-2 whitespace-nowrap">
          {t("minimum_order")} $250
        </p>
      </div>
    </div>
  );
};

export default Header;

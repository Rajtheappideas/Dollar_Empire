import React from "react";
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
import SingleProdcutCard from "../components/SingleProdcutCard";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  handleGetAllProducts,
  handleGetNewArrivals,
} from "../redux/GetContentSlice";
import { toast } from "react-hot-toast";
import {
  handleChangePagePerView,
  handleChangeProductListingPageLink,
} from "../redux/GlobalStates";
import { handleGetTopSellers } from "../redux/GetContentSlice";

const ProductListing = () => {
  const { perPageItemView, pagination } = useSelector(
    (state) => state.globalStates
  );
  const [selectedView, setSelectedView] = useState("grid");
  const [pageNumber, setPageNumber] = useState(pagination);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("newest");
  const [message, setMessage] = useState("");

  const { newArrivals, loading, allProducts, topSellers } = useSelector(
    (state) => state.getContent
  );

  const { token } = useSelector((state) => state.Auth);

  // const { title, price, searchQuery } = useLocation().state;

  const { title } = useParams();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  // pagination logic
  const productsPerPage = 4;
  const pageVisited = pageNumber * productsPerPage;
  const displayProdcuts = products.slice(
    pageVisited,
    productsPerPage + pageVisited
  );
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // filter products
  const handleFilterProducts = () => {
    toast.dismiss();
    if (loading) {
      return true;
    } else if (title.includes("new-arrivals")) {
      // console.log("nwe");
      // setPageNumber(0);
      setProducts(newArrivals);
      console.log(newArrivals, loading);
      if (newArrivals.length === 0 && !loading) {
        setMessage("Product Not Found in New Arrivals, Try Someting else.");
      }
      return true;
    } else if (title.includes("top-sellers")) {
      // console.log("topseles");
      setProducts(topSellers);
      // setPageNumber(0);
      if (topSellers.length === 0) {
        setMessage("Product Not Found in Top Sellers, Try something else.");
      }
      return true;
    } else if (/\d/.test(title)) {
      // console.log("price");
      if (title.includes("-")) {
        const price = title.split("-");
        const byPrice = allProducts.filter(
          (i) =>
            i.price >= price[0].replace("$", "") &&
            i.price <= price[1].replace("$", "")
        );
        setProducts(byPrice);
        if (allProducts.length === 0) {
          setMessage("Product Not Found, Try something else.");
        }
      } else {
        const price = title.split("$");
        const byPrice = allProducts.filter((i) => i.price >= price[1]);
        setProducts(byPrice);
        if (allProducts.length === 0) {
          setMessage("Product Not Found, Try something else.");
        }
      }
      // setPageNumber(0);
      return true;
    } else if (title.includes("all-products")) {
      // setPageNumber(0);
      setProducts(allProducts);
      if (allProducts.length === 0) {
        setMessage("Product Not Found, Try something else.");
      }
      return true;
    } else if (title.includes("low-to-high")) {
      const lowToHigh = allProducts.slice().sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      // setPageNumber(0);
      setProducts(lowToHigh);
      if (allProducts.length === 0) {
        setMessage("Product Not Found, Try something else.");
      }
      return true;
    } else if (title.includes("high-to-low")) {
      const highToLow = allProducts.slice().sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      // setPageNumber(0);
      setProducts(highToLow);
      if (allProducts.length === 0) {
        setMessage("Product Not Found, Try something else.");
      }
      return true;
    } else if (categories.includes(title)) {
      const productsByCategories = allProducts.filter((i) =>
        i.category.includes(title)
      );
      // setPageNumber(0);
      setProducts(productsByCategories);
      if (allProducts.length === 0) {
        setMessage("Product Not Found, Try something else.");
      }
      return true;
    } else if (!categories.includes(title)) {
      // setPageNumber(0);
      setProducts([]);
      setMessage("Product Not Found, Try different category.");
      return true;
    } else if (
      (allProducts.length === 0 ||
        products.length === 0 ||
        newArrivals.length === 0 ||
        topSellers.length === 0) &&
      !loading
    ) {
      // console.log("null");
      // setPageNumber(0);
      setProducts([]);
      toast.error("Products Not Found!!!");
      return true;
    }
  };

  // fetch products
  useEffect(() => {
    dispatch(handleGetNewArrivals({ token }));
    dispatch(handleGetTopSellers({ token }));
    const response = dispatch(handleGetAllProducts({ token }));
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            const Categories = res.payload.products.map((i) => i.category);
            setCategories([...new Set(Categories)]);
          } else {
            toast.error(res.payload.message);
          }
        })
        .catch((err) => {});
    }
  }, []);

  // set products releated category & filter wise
  useEffect(() => {
    handleFilterProducts();
  }, [allProducts, loading, categories, title]);

  // filter by new & old
  useEffect(() => {
    if (filterValue == "newest") {
      return setProducts(products.slice().reverse());
    } else {
      return setProducts(products.slice().reverse());
    }
  }, [filterValue]);

  // set link & pagenumber
  useEffect(() => {
    dispatch(
      handleChangeProductListingPageLink({
        link: window.location.href,
        pagination: pageNumber,
      })
    );
  }, [title, pageNumber]);
  // console.log(pageNumber);

  return (
    <>
      <Helmet title={`product-listing-${title}`} />
      <section className="bg-BACKGROUNDGRAY lg:pb-20 lg:py-0 py-10">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-BACKGROUNDGRAY">
          {/* title */}
          <h1 className="block font-semibold md:text-4xl text-2xl text-left">
            {/* {title === "Price" && title !== "" ? (
              <>
                By Price:
                <span className="text-PRIMARY ml-1 capitalize">"{price}"</span>
              </>
            ) : title === "Search" && title !== "" ? (
              <>
                Search for:
                <span className="text-PRIMARY ml-1 capitalize">
                  "{searchQuery}"
                </span>
              </>
            ) : title !== "" ? (
              <span className="capitalize">{title}</span>
            ) : null} */}
            {title}
          </h1>
          <div className="w-full flex items-start justify-start gap-5 lg:flex-row flex-col">
            {/* filter */}
            <section className="lg:w-[20%] w-full">
              <FilterComponent setFilterProducts={setFilterProducts} />
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
                        selectedView === "grid"
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
                          selectedView === "grid3"
                            ? "bg-PRIMARY"
                            : "bg-gray-400"
                        } h-6 rounded-sm w-2 `}
                      ></p>
                      <p
                        className={`${
                          selectedView === "grid3"
                            ? "bg-PRIMARY"
                            : "bg-gray-400"
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
                    <p className="font-medium text-base">
                      {pageNumber + 1} of {pageCount} ({products.length} items)
                    </p>
                  </div>
                  {/* filter dropdown */}
                  <div className="flex  md:flex-nowrap flex-wrap items-center xl:gap-x-4 gap-2">
                    <span className="font-medium">Sort:</span>
                    <select
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="bg-gray-200 outline-none text-black w-28 p-2 rounded-md  font-medium"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                    <span className="font-medium">Show:</span>
                    <select
                      onChange={(e) =>
                        dispatch(handleChangePagePerView(e.target.value))
                      }
                      value={perPageItemView}
                      className="bg-gray-200 outline-none text-black w-28 p-2 rounded-md  font-medium"
                    >
                      <option value="128">128</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>
                {/* add items btn */}
                <button
                  type="button"
                  className="xl:w-[20%] w-auto text-sm px-1 bg-PRIMARY text-white text-center xl:h-14 h-12 ml-auto"
                >
                  <BsPlus className="w-6 h-6 inline-block" />
                  Add Selected items to{" "}
                  <AiOutlineShoppingCart className="h-5 w-5 inline-block" />
                </button>
              </div>
              {/* prodcts */}
              <div
                className={`w-full grid ${
                  selectedView === "grid"
                    ? "xl:grid-cols-4 grid-cols-2 md:gap-3 gap-1"
                    : selectedView === "grid3"
                    ? "xl:grid-cols-3 grid-cols-2 md:gap-5 gap-1"
                    : "grid-cols-1 gap-y-5"
                } place-items-start items-center`}
              >
                {loading ? (
                  <p className="col-span-full mx-auto md:text-3xl text-xl font-normal p-3">
                    Loading...
                  </p>
                ) : displayProdcuts.length > 0 && products.length > 0 ? (
                  displayProdcuts.map((product) => (
                    <ProductCard
                      title={title}
                      key={product?._id}
                      product={product}
                      selectedView={selectedView}
                    />
                  ))
                ) : (
                  <p className="col-span-full mx-auto md:text-3xl text-xl font-semibold p-3">
                    {message}
                  </p>
                )}
              </div>
              {/* pagination */}
              <div className="flex xl:flex-row flex-col items-center w-full gap-3 ">
                <div className="xl:w-[80%] w-full border border-BORDERGRAY bg-white p-3 flex md:flex-row flex-col gap-3 items-center justify-between">
                  {/* pagination */}
                  <ReactPaginate
                    onPageChange={changePage}
                    previousLabel={
                      <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                        <BsChevronLeft className="h-5 w-5 rounded-md text-black" />
                      </p>
                    }
                    nextLabel={
                      <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                        <BsChevronRight className="h-5 w-5 rounded-md text-black" />
                      </p>
                    }
                    pageClassName="bg-gray-200 text-black px-2 py-2 rounded-md text-center"
                    pageLinkClassName="p-2"
                    breakLabel="..."
                    breakClassName=""
                    breakLinkClassName=""
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    containerClassName=""
                    activeClassName="active"
                    className="flex items-center gap-x-3"
                  />
                  {/* filter dropdown */}
                  <div className="flex items-center gap-x-4">
                    <span className="font-medium mr-1">Show:</span>
                    <select
                      onChange={(e) =>
                        dispatch(handleChangePagePerView(e.target.value))
                      }
                      value={perPageItemView}
                      className="bg-gray-200 outline-none text-black w-28 p-2 rounded-md  font-medium"
                    >
                      <option value="128">128</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                </div>
                {/* btn */}
                <button
                  type="button"
                  className="xl:w-[20%] w-auto text-sm px-1 bg-PRIMARY text-white text-center xl:h-14 h-12 ml-auto"
                >
                  <BsPlus className="w-6 h-6 inline-block" />
                  Add Selected items to{" "}
                  <AiOutlineShoppingCart className="h-5 w-5 inline-block" />
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

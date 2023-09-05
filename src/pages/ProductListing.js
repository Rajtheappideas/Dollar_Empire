import React, { useRef } from "react";
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
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  handleChangeActiveCategory,
  handleChangePagePerView,
  handleChangeProductListingError,
  handleChangeProductListingPageLink,
  handleChangeSearchActiveCategory,
} from "../redux/GlobalStates";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  handleAddMultipleProductToCart,
  handleAddMultipleProducts,
  handleChangeAddProduct,
  handleRemoveAllProducts,
  handleRemoveAllTotalQuantityAndTotalAmount,
  handlechangeTotalQuantityAndAmountOfmultipleProducts,
} from "../redux/CartSlice";

const ProductListing = () => {
  const { pagination } = useSelector((state) => state.globalStates);
  const [selectedView, setSelectedView] = useState("grid");
  const [pageNumber, setPageNumber] = useState(pagination);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("newest");
  const [message, setMessage] = useState("");
  const [activePrice, setActivePrice] = useState("Any");
  const [countTotalQuantity, setCountTotalQuantity] = useState([]);

  const { newArrivals, allProductLoading, allProducts, topSellers } =
    useSelector((state) => state.products);

  const { token, user } = useSelector((state) => state.Auth);
  const {
    multipleLoading,
    loading,
    selectedItems,
    totalQuantityMultipleProducts,
    totalAmountMultipleProducts,
  } = useSelector((state) => state.cart);
  const {
    searchProducts,
    searchTitle,
    perPageItemView,
    activeSubcategory,
    activeCategory,
    showEnlargeImage,
    productListingError,
  } = useSelector((state) => state.globalStates);

  const { title } = useParams();

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  const dispatch = useDispatch();

  // pagination logic
  const productsPerPage = parseInt(perPageItemView);
  const pageVisited = pageNumber * productsPerPage;
  const displayProdcuts = products.slice(
    pageVisited,
    productsPerPage + pageVisited
  );
  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.document
      .getElementById("product_listing")
      .scrollIntoView({ behavior: "smooth" });
  };

  // filter products
  const handleFilterProducts = () => {
    if (allProductLoading) {
      return true;
    }
    const Categories = allProducts.map((i) => i.category);
    const uniqueCategories = [...new Set(Categories.flat(Infinity))];
    toast.dismiss();
    dispatch(handleRemoveAllProducts());
    dispatch(handleRemoveAllTotalQuantityAndTotalAmount());
    if (title.includes("new-arrivals")) {
      // new arrivals
      setProducts(newArrivals);
      handleFilterProductsByPrice(newArrivals);
      if (newArrivals.length === 0) {
        setMessage("Product Not Found in New Arrivals, Try Someting else.");
      }
    } else if (title.includes("top-sellers")) {
      // top sellers
      setProducts(topSellers);
      handleFilterProductsByPrice(topSellers);
      if (topSellers.length === 0) {
        setMessage("Product Not Found in Top Sellers, Try something else.");
      }
    } else if (/\d/.test(title)) {
      // by price
      if (title.includes("-")) {
        const price = title.split("-");
        const byPrice = allProducts.filter(
          (i) =>
            i.price >= price[0].replace("$", "") &&
            i.price <= price[1].replace("$", "")
        );
        setProducts(byPrice);
        handleFilterProductsByPrice(byPrice);

        if (byPrice.length === 0) {
          setMessage("Product not found, Try with different filters.");
        }
      } else if (title.toLocaleLowerCase().includes("below")) {
        console.log("bellow");
        // over by price
        const price = title.split("$");
        const byPrice = allProducts.filter(
          (i) => parseFloat(i.price) < parseFloat(price[1])
        );
        setProducts(byPrice);
        handleFilterProductsByPrice(byPrice);

        if (byPrice.length === 0) {
          setMessage("Product Not Found, Try with different price.");
        }
      } else if (title.toLocaleLowerCase().includes("above")) {
        // over by price
        const price = title.split("$");
        const byPrice = allProducts.filter(
          (i) => parseFloat(i.price) >= parseFloat(price[1])
        );
        setProducts(byPrice);
        handleFilterProductsByPrice(byPrice);

        if (byPrice.length === 0 && !allProductLoading) {
          setMessage("Product Not Found, Try with different price.");
        }
      }
    } else if (title.includes("all-products")) {
      // all products
      setProducts(allProducts);
      handleFilterProductsByPrice(allProducts);
      if (allProducts.length === 0) {
        setMessage("Product Not Found.");
      }
    } else if (title.includes("low-to-high")) {
      // low - high
      const lowToHigh = allProducts.slice().sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      setProducts(lowToHigh);
      handleFilterProductsByPrice(lowToHigh);
      if (lowToHigh.length === 0) {
        setMessage("No items found, please try a different filter");
      }
    } else if (title.includes("high-to-low")) {
      // high - low
      const highToLow = allProducts.slice().sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      setProducts(highToLow);
      handleFilterProductsByPrice(highToLow);

      if (highToLow.length === 0) {
        setMessage("No items found, please try a different filter");
      }
    } else if (uniqueCategories.includes(title)) {
      // by category
      const productsByCategories = allProducts.filter((i) =>
        i.category.includes(title)
      );
      setProducts(productsByCategories);
      setMessage("");
      if (productsByCategories.length === 0) {
        setMessage("No items found, please try a different filter");
      }
      if (activeSubcategory !== "") {
        const findProducts = productsByCategories.filter((c) =>
          c?.subcategory.includes(activeSubcategory)
        );
        setProducts(findProducts);
        handleFilterProductsByPrice(findProducts);
        if (findProducts.length === 0) {
          setProducts([]);
          setMessage("No items found, please try a different filter");
        }
      }
    } else if (title.includes("search")) {
      setProducts(searchProducts);
      handleFilterProductsByPrice(searchProducts);
    } else if (
      !loading &&
      (products.length === 0 || allProducts.length === 0)
    ) {
      setProducts([]);
      setMessage("No items found, please try a different filter");
    } else {
      setProducts([]);
      setMessage("No items found, please try a different filter");
    }
  };

  // filters on price
  const handleFilterProductsByPrice = (filterproducts) => {
    setMessage("");
    if (activePrice.includes("Any")) {
      toast.dismiss();
      return setProducts(filterproducts);
    } else if (activePrice.toLocaleLowerCase().includes("below")) {
      toast.dismiss();
      const byPrice = filterproducts.filter(
        (i) => parseFloat(i.price) <= parseFloat(activePrice.split("$")[1])
      );
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.includes("$0.50 - $0.79")) {
      toast.dismiss();

      const price = activePrice.split("-");
      const byPrice = filterproducts.filter(
        (i) =>
          i.price >= price[0].replace("$", "") &&
          i.price <= price[1].replace("$", "")
      );
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.includes("$0.80 - $0.99")) {
      toast.dismiss();

      const price = activePrice.split("-");
      const byPrice = filterproducts.filter(
        (i) =>
          i.price >= price[0].replace("$", "") &&
          i.price <= price[1].replace("$", "")
      );
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.includes("$1.00 - $1.49")) {
      toast.dismiss();

      const price = activePrice.split("-");
      const byPrice = filterproducts.filter(
        (i) =>
          i.price >= price[0].replace("$", "") &&
          i.price <= price[1].replace("$", "")
      );
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.includes("$1.50 - $1.99")) {
      toast.dismiss();

      const price = activePrice.split("-");
      const byPrice = filterproducts.filter(
        (i) =>
          i.price >= price[0].replace("$", "") &&
          i.price <= price[1].replace("$", "")
      );
      console.log(byPrice);
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.toLocaleLowerCase().includes("above")) {
      toast.dismiss();
      const byPrice = filterproducts.filter(
        (i) => parseFloat(i.price) >= parseFloat(activePrice.split("$")[1])
      );
      if (byPrice.length > 0) {
        return setProducts(byPrice);
      } else {
        setMessage("No items found, please try a different filter");
      }
    } else if (activePrice.includes("High_to_low")) {
      const highToLow = filterproducts.slice().sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      return setProducts(highToLow);
    } else if (activePrice.includes("Low_to_high")) {
      const lowToHigh = filterproducts.slice().sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      return setProducts(lowToHigh);
    }
  };

  // selected multiple items to cart
  const handleAddSelectedItem = async (
    pkQuantity,
    ctnQuantity,
    id,
    itemType,
    pkCount,
    ctnCount,
    amount
  ) => {
    if (pkQuantity !== "" || ctnQuantity !== "") {
      const item = {};
      const itemForQuantity = {};
      if (pkQuantity !== "" || ctnQuantity !== "") {
        item.id = id;
        item.quantity = itemType === "pk" ? pkCount : ctnCount;

        item.type = itemType;
        itemForQuantity.id = id;
        itemForQuantity.quantity = itemType === "pk" ? pkCount : ctnCount;
        itemForQuantity.type = itemType;
        itemForQuantity.amount = itemForQuantity.quantity * amount;
      }
      // for filter same id product with max quantity
      const selectedItemProducts = [...selectedItems, item];
      let arr = [];
      arr.push(selectedItemProducts);
      const result = Object.values(
        arr.flat(1).reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {})
      );
      dispatch(
        handleAddMultipleProducts(result.filter((i) => i.quantity !== 0))
      );
      // for count total quanitty
      const countTotalQuantityOfProducts = [
        ...countTotalQuantity,
        itemForQuantity,
      ];
      let arr2 = [];
      arr2.push(countTotalQuantityOfProducts);
      const result2 = Object.values(
        arr2.flat(1).reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {})
      );

      const filteredQuantityAndAmount = result2.filter((i) => i.quantity !== 0);

      const totalQuantity = filteredQuantityAndAmount.reduce((acc, curr) => {
        return acc + curr?.quantity;
      }, 0);
      const totalAmount = filteredQuantityAndAmount.reduce((acc, curr) => {
        return acc + curr?.amount;
      }, 0);
      dispatch(
        handlechangeTotalQuantityAndAmountOfmultipleProducts({
          totalQuantity,
          totalAmount,
        })
      );
      setCountTotalQuantity(result2.filter((i) => i.quantity !== 0));
    }
  };

  // add multiple product api handle
  const handleSubmitMulitpleProductToCart = () => {
    dispatch(handleChangeProductListingError(""));
    if (selectedItems.length === 0) {
      toast.dismiss();
      dispatch(
        handleChangeProductListingError(
          "No quantity found. Please add at least one item"
        )
      );
      return toast.error("No quantity found. Please add at least one item");
    } else {
      const response = dispatch(
        handleAddMultipleProductToCart({
          token,
          signal: AbortControllerRef,
          products: selectedItems,
        })
      );
      if (response) {
        response
          .then((res) => {
            if (res.payload.status === "success") {
              toast.success("Products Added to cart.");
              dispatch(
                handleChangeAddProduct({
                  quantity: totalQuantityMultipleProducts,
                  amount: totalAmountMultipleProducts,
                })
              );
              setCountTotalQuantity([]);
              dispatch(handleRemoveAllProducts());
              dispatch(handleRemoveAllTotalQuantityAndTotalAmount());
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // set unique categories
  useEffect(() => {
    const Categories = allProducts.map((i) => i.category);
    setCategories([...new Set(Categories.flat(Infinity))]);

    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
      dispatch(handleChangeActiveCategory("All Categories"));
      dispatch(handleChangeSearchActiveCategory("All Categories"));
      dispatch(handleChangeProductListingError(""));
    };
  }, []);

  // filter func. call
  useEffect(() => {
    handleFilterProducts();
    dispatch(handleChangeProductListingError(""));
    setPageNumber(0);
  }, [
    allProducts,
    allProductLoading,
    categories,
    title,
    newArrivals,
    topSellers,
    activePrice,
    searchProducts,
    activeCategory,
    activeSubcategory,
  ]);

  // filter by new , old, hightolow ,lowtohigh
  useEffect(() => {
    if (filterValue == "newest") {
      return setProducts(products.slice().reverse());
    } else if (filterValue === "oldest") {
      return setProducts(products.slice().reverse());
    } else if (filterValue === "lowtohigh") {
      const lowToHigh = products.slice().sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      return setProducts(lowToHigh);
    } else if (filterValue === "hightolow") {
      const highToLow = products.slice().sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      return setProducts(highToLow);
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

  // clear filters useeffect
  useEffect(() => {
    setActivePrice("Any");
  }, [title]);

  return (
    <>
      <Helmet title={`${title} | Dollar Empire`} />
      {showEnlargeImage && (
        <div className="absolute z-30 inset-0 bg-black bg-opacity-20 backdrop-blur-sm max-w-[100%] h-full" />
      )}

      <section className="bg-BACKGROUNDGRAY lg:pb-20 lg:py-0 py-10">
        <div className="container mx-auto space_for_div space-y-5 w-full bg-BACKGROUNDGRAY">
          <div className="w-full flex items-center justify-between">
            {/* title */}
            <h1 className="block font-semibold md:text-4xl text-2xl text-left capitalize">
              {title.includes("search")
                ? `${t("Search for")}: ${searchTitle}`
                : /\d/.test(title)
                ? `${t("By Price")}: ${title}`
                : title.includes("new-arrivals")
                ? t("new_arrivals")
                : title.includes("top-sellers")
                ? t("top_sellers")
                : title.includes("all-products")
                ? t("All Procuts")
                : title.includes("low-to-high")
                ? t("Low to high")
                : title.includes("high-to-low")
                ? t("High to low")
                : title}
            </h1>
            {productListingError !== "" && (
              <span className="text-red-500 font-semibold text-xl">
                {productListingError}
              </span>
            )}
          </div>

          <div className="w-full flex items-start justify-start gap-5 lg:flex-row flex-col">
            {/* filter */}
            <section className="lg:w-[20%] w-full">
              <FilterComponent
                setActivePrice={setActivePrice}
                activePrice={activePrice}
                title={title}
              />
            </section>
            {/* products listing*/}
            <section
              id="product_listing"
              className="lg:w-[80%] w-full space-y-5"
            >
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
                      {products.length > 0 ? pageNumber + 1 : 0} of{" "}
                      {products.length < perPageItemView
                        ? products.length
                        : perPageItemView}{" "}
                      ({products.length} {t("items")})
                    </p>
                  </div>
                  {/* filter dropdown */}
                  <div className="flex  md:flex-nowrap flex-wrap items-center xl:gap-x-4 gap-2">
                    <span className="font-medium">{t("Sort")}:</span>
                    <select
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="bg-gray-200 outline-none text-black w-32 p-2 rounded-md  font-medium"
                    >
                      <option value="newest">{t("Newest")}</option>
                      <option value="oldest">{t("Oldest")}</option>
                      <option value="lowtohigh">{t("Low to high")}</option>
                      <option value="hightolow">{t("High to low")}</option>
                    </select>
                    <span className="font-medium">{t("Show")}:</span>
                    <select
                      onChange={(e) => {
                        dispatch(handleChangePagePerView(e.target.value));
                        setPageNumber(0);
                      }}
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
                  disabled={loading}
                  onClick={() => {
                    handleSubmitMulitpleProductToCart();
                  }}
                >
                  {multipleLoading ? (
                    t("loading").concat("...")
                  ) : (
                    <>
                      <BsPlus className="w-6 h-6 inline-block" />
                      {t("Add Selected items to")}
                      <AiOutlineShoppingCart className="h-5 w-5 inline-block" />
                    </>
                  )}
                </button>
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
                    forcePage={pagination}
                  />
                </div>
              </div>
              {/* prodcts */}
              <div
                className={`w-full grid ${
                  selectedView === "grid"
                    ? "xl:grid-cols-4 md:grid-cols-3 md:gap-3 gap-1"
                    : selectedView === "grid3"
                    ? "xl:grid-cols-3 md:grid-cols-2 md:gap-5 gap-1"
                    : "grid-cols-1 gap-y-5"
                } items-start`}
              >
                {allProductLoading ? (
                  <SkeletonTheme
                    baseColor="lightgray"
                    highlightColor="white"
                    borderRadius="10px"
                  >
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                    <Skeleton className="w-full md:h-80 h-60" />
                  </SkeletonTheme>
                ) : displayProdcuts.length > 0 &&
                  products.length > 0 &&
                  message === "" ? (
                  displayProdcuts.map((product) => (
                    <ProductCard
                      title={title}
                      key={product?._id}
                      product={product}
                      selectedView={selectedView}
                      handleAddSelectedItem={handleAddSelectedItem}
                    />
                  ))
                ) : (
                  <p className="col-span-full mx-auto md:text-3xl text-xl font-semibold p-3">
                    {t(message)}
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
                    forcePage={pagination}
                  />
                  {/* filter dropdown */}
                  <div className="flex items-center gap-x-4">
                    <span className="font-medium mr-1">{t("Show")}:</span>
                    <select
                      onChange={(e) => {
                        dispatch(handleChangePagePerView(e.target.value));
                        setPageNumber(0);
                      }}
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
                  disabled={loading}
                  onClick={() => {
                    handleSubmitMulitpleProductToCart();
                  }}
                >
                  {multipleLoading ? (
                    t("loading").concat("...")
                  ) : (
                    <>
                      <BsPlus className="w-6 h-6 inline-block" />
                      {t("Add Selected items to")}
                      <AiOutlineShoppingCart className="h-5 w-5 inline-block" />
                    </>
                  )}
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

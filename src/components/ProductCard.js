import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEnlargeImagePopup,
  handleChangeEnlargeImageFrom,
  handleChangeEnlargeImageId,
  handleChangeSingleProductEnlargeImageId,
  handleSetSingelProductId,
  showEnlargeImagePopup,
  showPopup,
} from "../redux/GlobalStates";
import { useTranslation } from "react-i18next";
import BaseUrl from "../BaseUrl";
import {
  handleAddProductToFavourites,
  handleRemoveProductToFavourites,
} from "../redux/FavouriteSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  handleGetNewArrivals,
  handleGetTopSellers,
} from "../redux/ProductSlice";
import {
  handleAddProductToCart,
  handleChangeAddProduct,
} from "../redux/CartSlice";
import "react-loading-skeleton/dist/skeleton.css";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product, title, selectedView, from }) => {
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState("");
  const [ctnItemQuantity, setCtnItemQuantity] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);
  const [pkCount, setPkCount] = useState(0);
  const [ctnCount, setCtnCount] = useState(0);

  const { user, token } = useSelector((state) => state.Auth);
  const {
    showProductDetailsPopup,
    showEnlargeImage,
    activeEnlargeImageId,
    activeEnlargeImageFrom,
    singleProductEnlargeImageId,
  } = useSelector((state) => state.globalStates);
  const { loading, cartItems, cart } = useSelector((state) => state.cart);

  const AbortControllerRef = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleAddtoFavourties = (id, category) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleAddProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            if (category === "TopSellers") {
              dispatch(handleGetTopSellers({ token }));
            } else if (category === "NewArrivals") {
              dispatch(handleGetNewArrivals({ token }));
            }
            toast.success(res.payload.message);
          } else if (res.payload.status === "fail") {
            toast.error(res.payload.message);
          }
          setFavouriteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setFavouriteLoading(false);
        });
    }
  };

  const handleRemoveFromFavourties = (id, category) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            if (category === "TopSellers") {
              dispatch(handleGetTopSellers({ token }));
            } else if (category === "NewArrivals") {
              dispatch(handleGetNewArrivals({ token }));
            }
            toast.success(res.payload.message);
          } else {
            toast.error(res.payload.message);
          }
          setFavouriteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setFavouriteLoading(false);
        });
    }
  };

  const handleAddProduct = (id, title, quantity, amount) => {
    toast.dismiss();
    if (
      (pkitemsQuantity === "" || pkitemsQuantity === 0) &&
      (ctnItemQuantity === "" || ctnItemQuantity === 0)
    ) {
      setpkItemsQuantity("");
      setCtnItemQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please add some quantity And enter valid value.");
    } else if (selectedItemType === "pk" && ctnItemQuantity > 0) {
      toast.error("Please enter quantity in PK, you choose PK");
      setCtnItemQuantity("");
      setCtnCount(0);
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity("");
      setPkCount(0);
      return true;
    } else if (
      !/^\d+$/.test(pkitemsQuantity !== "" ? pkitemsQuantity : ctnItemQuantity)
    ) {
      setpkItemsQuantity("");
      setCtnItemQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please enter valid value!!!");
    }
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: selectedItemType,
        quantity: selectedItemType === "pk" ? pkitemsQuantity : ctnItemQuantity,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            toast.success(`${title} added to cart successfully.`);
            dispatch(handleChangeAddProduct({ quantity, amount }));
            setCtnItemQuantity("");
            setpkItemsQuantity("");
            setSelectedItemType("pk");
            setPkCount(0);
            setCtnCount(0);
            setSelectedProductId(null);
          }
        })
        .catch((err) => {
          toast.error(err.payload.message);
        });
    }
  };

  function handleShowEnlargeImage() {
    dispatch(handleChangeEnlargeImageId(""));
    dispatch(handleChangeEnlargeImageFrom(""));
    dispatch(handleChangeEnlargeImageId(product?._id));
    dispatch(handleChangeEnlargeImageFrom(from));
  }

  function handleShowSingleProductEnlargeImage() {
    dispatch(handleChangeSingleProductEnlargeImageId(""));
    dispatch(handleChangeSingleProductEnlargeImageId(product?._id));
  }

  const handlePlusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== product?._id
    ) {
      setPkCount(count);
      setpkItemsQuantity(quantity * count);
    }
  };

  const handleMinusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== product?._id
    ) {
      if (pkCount === 0) {
        setPkCount(0);
      } else {
        setPkCount(count);
        setpkItemsQuantity(quantity * count);
      }
    }
  };

  const handlePlusCTNQuantity = (quantity, count) => {
    if (
      selectedItemType === "ctn" &&
      findInCart?.product?._id !== product?._id
    ) {
      setCtnCount(count);
      setCtnItemQuantity(quantity * count);
    }
  };

  const handleMinusCTNQuantity = (quantity, count) => {
    if (
      selectedItemType === "ctn" &&
      findInCart?.product?._id !== product?._id
    ) {
      if (ctnCount === 0) {
        setCtnCount(0);
      } else {
        setCtnCount(count);
        setCtnItemQuantity(quantity * count);
      }
    }
  };

  useEffect(() => {
    if (cart !== null && cartItems.length > 0) {
      const findItemInCart = cartItems.find(
        (i) => i.product?._id === product?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [pkitemsQuantity, ctnItemQuantity, showProductDetailsPopup]);
  return (
    <>
      {selectedView === "gridsingle" ? (
        // single product
        <div className="lg:space-y-3 relative z-0 space-y-2 w-full xl:p-3 md:p-5 p-3 bg-white font-semibold md:text-lg border rounded-lg border-[#EAEAEA] flex xl:flex-row flex-col items-start justify-between">
          {/* top seller label */}
          {title === "top-sellers" && (
            <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute z-20 top-0 left-0">
              {t("Top Seller")}
            </p>
          )}

          {/* left side */}
          <div className="h-auto xl:w-2/3 w-full relative flex md:flex-row flex-col md:items-start items-center justify-start xl:gap-5 gap-3">
            {/* img */}
            <img
              src={BaseUrl.concat(product?.images[0])}
              alt={product?.name}
              className="xl:w-48 md:h-auto md:w-1/2 w-full h-40 cursor-pointer xl:object-fill object-contain object-center"
              title={product?.name}
              onClick={() => {
                dispatch(showPopup());
                dispatch(handleSetSingelProductId(product?._id));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              loading="lazy"
            />
            <MagnifyingGlassPlusIcon
              role="button"
              onClick={() => {
                dispatch(showEnlargeImagePopup());
                handleShowSingleProductEnlargeImage();
              }}
              className="h-6 w-6 bg-white/40 absolute left-0 md:bottom-0 bottom-56  text-PRIMARY"
            />
            {singleProductEnlargeImageId === product?._id &&
              showEnlargeImage && (
                <div className="absolute bg-black/30 z-40 xl:w-[30rem] md:w-[40rem] w-72 md:min-h-[22rem] md:max-h-[22rem] min-h-[24rem] max-h-[24rem] xl:-top-32 md:-top-20 top-0 md:left-0 -left-2 backdrop-blur-sm">
                  <AiOutlineClose
                    role="button"
                    onClick={() => {
                      dispatch(closeEnlargeImagePopup());
                      handleShowSingleProductEnlargeImage();
                    }}
                    className="absolute top-1 right-2 w-7 h-7 text-white z-50"
                  />
                  <img
                    src={BaseUrl.concat(product?.images[0])}
                    alt={product?.name}
                    className="w-full md:max-h-[19rem] md:min-h-[19rem] min-h-[20rem] max-h-[20rem] px-2 rounded-none object-fill object-center absolute top-10 z-50"
                    title={product?.name}
                    loading="lazy"
                  />
                </div>
              )}
            {/* details */}
            {user === null ? (
              <div className="space-y-1 font-medium text-black w-full">
                <p className="text-PRIMARY font-semibold">
                  {t("ITEM NO")}.{product?.number}
                </p>
                <p
                  className="font-bold tracking-normal py-1"
                  title={product?.name}
                >
                  {product?.name}
                </p>
                <p className="font-normal tracking-normal pt-1">
                  {product?.shortDesc}
                </p>
                <p className="w-7/12">
                  <Link to="/sign-in" className="w-full">
                    <button
                      type="button"
                      className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                    >
                      {t("login_to_order")}
                    </button>
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="space-y-1 font-medium text-black w-full">
                <li className="text-PRIMARY font-semibold">
                  {t("ITEM NO")}.{product?.number}
                </li>
                <li
                  className="font-bold tracking-normal pt-1"
                  title={product?.name}
                >
                  {product?.name}
                </li>
                <li className="font-normal tracking-normal">
                  {product?.shortDesc}
                </li>
                <li className="text-BLACK md:text-sm text-base">
                  {product?.package}
                </li>
                <li className="text-BLACK md:text-sm text-base">
                  PK {t("volume")} : {product?.PKVolume} cu ft{" "}
                </li>
                <li className="text-BLACK md:text-sm text-base">
                  CTN {t("volume")} : {product?.CTNVolume} cu ft{" "}
                </li>
                <li className="text-BLACK md:text-sm text-base">
                  Pk wt : {product?.PKWeight} Lbs{" "}
                </li>
                <li className="text-BLACK md:text-sm text-base">
                  CTN wt : {product?.CTNWeight} Lbs{" "}
                </li>
              </ul>
            )}
          </div>
          {/* right side */}
          {user !== null && (
            <div className="h-auto xl:w-auto w-full space-y-3 xl:text-right text-left">
              <p className="font-bold md:text-lg">
                ${product?.price}/PC, $
                {(product?.price * product?.PK).toFixed(1)}
                /PK, ${(product?.price * product?.CTN).toFixed(1)}/CTN
              </p>
              <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
                <input
                  name={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                  type="radio"
                  className="md:w-6 md:h-6 w-7 h-7"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  defaultChecked={true}
                  value="pk"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />{" "}
                <span className="font-semibold text-sm whitespace-nowrap pr-2">
                  PC QTY
                </span>
                <div className="w-full relative z-0">
                  <input
                    type="number"
                    className={`w-full h-10 text-sm pr-[4.5rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "ctn" ||
                        findInCart?.product?._id === product?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder="24 PC"
                    value={pkitemsQuantity}
                    onChange={(e) => {
                      setpkItemsQuantity(e.target.value);
                      setPkCount(
                        e.target.value >= product?.PK
                          ? parseFloat(
                              (e.target.value / product?.PK)
                                .toFixed(1)
                                .toString()
                                .split(".")[0]
                            )
                          : 0
                      );
                      if (
                        !/^\d+$/.test(e.target.value) &&
                        e.target.value !== ""
                      ) {
                        toast.dismiss();
                        return toast.error("Please enter valid value.");
                      }
                    }}
                    disabled={
                      selectedItemType === "ctn" ||
                      findInCart?.product?._id === product?._id
                    }
                  />
                  <span className="font-semibold text-BLACK w-14 text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {pkCount} PK
                  </span>
                  <AiOutlineMinus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                    onClick={() =>
                      handleMinusPkQuantity(
                        parseFloat(product?.PK),
                        parseFloat(pkCount - 1)
                      )
                    }
                  />
                  <AiOutlinePlus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() =>
                      handlePlusPkQuantity(
                        parseFloat(product?.PK),
                        parseFloat(pkCount + 1)
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
                <input
                  name={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                  type="radio"
                  className="md:w-6 md:h-6 w-7 h-7"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="ctn"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />{" "}
                <span className="font-semibold text-sm whitespace-nowrap">
                  CTN QTY
                </span>
                <div className="w-full relative z-0">
                  <input
                    type="number"
                    className={`w-full h-10 text-sm pr-[4.5rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "pk" ||
                        findInCart?.product?._id === product?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder="144 PC"
                    value={ctnItemQuantity}
                    onChange={(e) => {
                      setCtnItemQuantity(e.target.value);
                      setCtnCount(
                        e.target.value >= product?.CTN
                          ? parseFloat(
                              (e.target.value / product?.CTN)
                                .toFixed(1)
                                .toString()
                                .split(".")[0]
                            )
                          : 0
                      );
                      if (
                        !/^\d+$/.test(e.target.value) &&
                        e.target.value !== ""
                      ) {
                        toast.dismiss();
                        return toast.error("Please enter valid value.");
                      }
                    }}
                    disabled={
                      selectedItemType === "pk" ||
                      findInCart?.product?._id === product?._id
                    }
                  />
                  <span className="font-semibold w-14 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {ctnCount} CTN
                  </span>
                  <AiOutlineMinus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                    onClick={() =>
                      handleMinusCTNQuantity(
                        parseFloat(product?.CTN),
                        parseFloat(ctnCount - 1)
                      )
                    }
                  />
                  <AiOutlinePlus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() =>
                      handlePlusCTNQuantity(
                        parseFloat(product?.CTN),
                        parseFloat(ctnCount + 1)
                      )
                    }
                  />
                </div>
              </div>
              <p className="flex items-center gap-x-2">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        product?._id === findInCart?.product?._id
                      ? "/cart"
                      : null
                  }
                  className="w-11/12"
                >
                  <button
                    type="button"
                    className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                    onClick={() => {
                      handleAddProduct(
                        product?._id,
                        product?.name,
                        selectedItemType === "pk"
                          ? pkitemsQuantity
                          : ctnItemQuantity
                      );
                      setSelectedProductId(product?._id);
                    }}
                  >
                    {loading && selectedProductId === product?._id ? (
                      t("Adding").concat("...")
                    ) : findInCart !== null &&
                      product?._id === findInCart?.product?._id ? (
                      t("Added")
                    ) : (
                      <>
                        {t("add_to_cart")}
                        <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                      </>
                    )}
                  </button>
                </Link>
                {favouriteLoading ? (
                  "..."
                ) : product?.isFavourite ? (
                  <AiFillHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() => handleRemoveFromFavourties(product?._id)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() => handleAddtoFavourties(product?._id)}
                  />
                )}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="md:space-y-2 space-y-1 relative z-0 w-full md:p-3 p-4 bg-white lg:min-h-[27rem] md:min-h-[21rem] min-h-[19rem] font-semibold md:text-lg border rounded-lg border-[#EAEAEA]">
          {/* top seller label */}
          {title === "top-sellers" && (
            <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute top-0 left-0">
              {t("top_seller")}
            </p>
          )}
          {/* prodcut img */}
          <div className="relative z-20 pt-3">
            <img
              src={BaseUrl.concat(product?.images[0])}
              alt={product?.name}
              className="lg:h-64 md:h-40 relative z-0 h-32 cursor-pointer w-full object-contain object-center"
              title={product?.name}
              onClick={() => {
                dispatch(showPopup());
                dispatch(handleSetSingelProductId(product?._id));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              loading="lazy"
            />
            <MagnifyingGlassPlusIcon
              role="button"
              onClick={() => {
                dispatch(showEnlargeImagePopup());
                handleShowEnlargeImage();
              }}
              className="h-6 w-6 bg-white/40 absolute bottom-0 right-0 text-PRIMARY"
            />
            {activeEnlargeImageId === product?._id &&
              activeEnlargeImageFrom === from &&
              showEnlargeImage && (
                <div className="absolute bg-black/30 z-50 xl:w-[200%] w-full lg:min-h-[30rem] min-h-[22rem] max-h-screen top-0 md:-right-5 right-0 backdrop-blur-sm">
                  <AiOutlineClose
                    role="button"
                    onClick={() => {
                      dispatch(closeEnlargeImagePopup());
                      handleShowEnlargeImage();
                    }}
                    className="absolute top-1 right-2 w-7 h-7 text-white z-50"
                  />
                  <img
                    src={BaseUrl.concat(product?.images[0])}
                    alt={product?.name}
                    className="w-full max-h-screen px-2 rounded-none object-contain object-center absolute top-10"
                    title={product?.name}
                    loading="lazy"
                  />
                </div>
              )}
          </div>

          <p className="text-PRIMARY font-semibold">
            ITEM NO.{product?.number}
          </p>
          <p
            className="font-bold tracking-normal truncate"
            title={product?.name}
          >
            {product?.name}
          </p>
          {user !== null ? (
            <Fragment>
              <p className="text-BLACK text-sm text-left">{product?.package}</p>
              <p className="md:text-base text-sm font-bold text-left">
                ${product?.price}/PC | $
                {(product?.price * product?.CTN).toFixed(1)}/CTN
              </p>
              {selectedView === "grid3" && (
                <ul>
                  <li className="text-BLACK sm:text-sm md:text-lg">
                    {product?.package}
                  </li>
                  <li className="text-BLACK md:text-sm text-base">
                    PK volume : {product?.PKVolume} cu ft{" "}
                  </li>
                  <li className="text-BLACK md:text-sm text-base">
                    CTN volume : {product?.CTNVolume} cu ft{" "}
                  </li>
                  <li className="text-BLACK md:text-sm text-base">
                    Pk wt : {product?.PKWeight} Lbs{" "}
                  </li>
                  <li className="text-BLACK md:text-sm text-base">
                    CTN wt : {product?.CTNWeight} Lbs{" "}
                  </li>
                </ul>
              )}
              <p className="flex w-full items-center gap-x-1 relative z-0">
                <input
                  name={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                  type="radio"
                  className="md:w-6 md:h-6 w-7 h-7"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  defaultChecked={true}
                  value="pk"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  PC QTY
                </span>
                <input
                  type="number"
                  className={`w-11/12 h-10 text-sm pl-4 pr-16 rounded-md outline-none border border-BORDERGRAY ${
                    (selectedItemType === "ctn" ||
                      findInCart?.product?._id === product?._id) &&
                    "cursor-not-allowed"
                  }`}
                  placeholder="24 PC"
                  value={pkitemsQuantity}
                  onChange={(e) => {
                    setpkItemsQuantity(e.target.value);
                    setPkCount(
                      e.target.value >= product?.PK
                        ? parseFloat(
                            (e.target.value / product?.PK)
                              .toFixed(1)
                              .toString()
                              .split(".")[0]
                          )
                        : 0
                    );
                    if (
                      !/^\d+$/.test(e.target.value) &&
                      e.target.value !== ""
                    ) {
                      toast.dismiss();
                      return toast.error("Please enter valid value.");
                    }
                  }}
                  disabled={
                    selectedItemType === "ctn" ||
                    findInCart?.product?._id === product?._id
                  }
                />
                <span className="font-semibold w-10 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-4">
                  {pkCount} PK
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 md:left-[66px] left-[88px]"
                  onClick={() =>
                    handleMinusPkQuantity(
                      parseFloat(product?.PK),
                      parseFloat(pkCount - 1)
                    )
                  }
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                  onClick={() => {
                    handlePlusPkQuantity(
                      parseFloat(product?.PK),
                      parseFloat(pkCount + 1)
                    );
                  }}
                />
              </p>
              <p className="flex w-full items-center gap-x-1 relative z-0">
                <input
                  name={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                  type="radio"
                  className="md:w-6 md:h-6 w-7 h-7"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="ctn"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  CTN QTY
                </span>
                <input
                  type="text"
                  className={`w-11/12  h-10 text-sm pl-5 pr-[74px] rounded-md outline-none border border-BORDERGRAY ${
                    (selectedItemType === "pk" ||
                      findInCart?.product?._id === product?._id) &&
                    "cursor-not-allowed"
                  }`}
                  placeholder="144 PC"
                  value={ctnItemQuantity}
                  onChange={(e) => {
                    setCtnItemQuantity(e.target.value);
                    setCtnCount(
                      e.target.value >= product?.CTN
                        ? parseFloat(
                            (e.target.value / product?.CTN)
                              .toFixed(1)
                              .toString()
                              .split(".")[0]
                          )
                        : 0
                    );
                    if (
                      !/^\d+$/.test(e.target.value) &&
                      e.target.value !== ""
                    ) {
                      toast.dismiss();
                      return toast.error("Please enter valid value.");
                    }
                  }}
                  disabled={
                    selectedItemType === "pk" ||
                    findInCart?.product?._id === product?._id
                  }
                />
                <span className="font-semibold w-12 text-xs text-BLACK absolute top-1/2 -translate-y-1/2 right-3">
                  {ctnCount} CTN
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 md:left-[72px] left-[88px]"
                  onClick={() =>
                    handleMinusCTNQuantity(
                      parseFloat(product?.CTN),
                      parseFloat(ctnCount - 1)
                    )
                  }
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                  onClick={() => {
                    handlePlusCTNQuantity(
                      parseFloat(product?.CTN),
                      parseFloat(ctnCount + 1)
                    );
                  }}
                />
              </p>
              <p className="flex items-center gap-x-2">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        product?._id === findInCart?.product?._id
                      ? "/cart"
                      : null
                  }
                  className="w-11/12"
                >
                  <button
                    type="button"
                    className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                    onClick={() => {
                      product?._id !== findInCart?.product?._id &&
                        handleAddProduct(
                          product?._id,
                          product?.name,
                          selectedItemType === "pk"
                            ? pkitemsQuantity
                            : ctnItemQuantity,
                          selectedItemType === "pk"
                            ? pkitemsQuantity * product?.price
                            : ctnItemQuantity * product?.price
                        );
                      setSelectedProductId(product?._id);
                    }}
                    disabled={loading}
                  >
                    {loading && selectedProductId === product?._id ? (
                      t("Adding").concat("...")
                    ) : findInCart !== null &&
                      product?._id === findInCart?.product?._id ? (
                      t("Added")
                    ) : (
                      <>
                        {t("add_to_cart")}
                        <AiOutlineShoppingCart className="w-6 h-6 ml-1 inline-block" />
                      </>
                    )}
                  </button>
                </Link>
                {favouriteLoading ? (
                  "..."
                ) : product?.isFavourite ? (
                  <AiFillHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() => {
                      handleRemoveFromFavourties(product?._id, from);
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    className="w-10 h-10 text-DARKRED"
                    role="button"
                    onClick={() => handleAddtoFavourties(product?._id, from)}
                  />
                )}
              </p>
            </Fragment>
          ) : (
            <Link to="/sign-in" className="mt-2">
              <button
                type="button"
                className="bg-DARKRED text-white text-center w-full mt-3 p-2 rounded-lg"
              >
                {t("login_to_order")}
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default ProductCard;

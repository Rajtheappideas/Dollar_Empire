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
  handleChangeActiveComponent,
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
  handleAddProductToCart,
  handleChangeAddProduct,
  handleRemoveFromTotalQuantityAndAmountOfmultipleProducts,
  handleRemoveOneProductFromSelected,
  handleUpdateTotalQuantityAndAmount,
} from "../redux/CartSlice";
import "react-loading-skeleton/dist/skeleton.css";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

const ProductCard = ({
  product,
  title,
  selectedView,
  from,
  handleAddSelectedItem,
}) => {
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState("");
  const [ctnItemQuantity, setCtnItemQuantity] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);
  const [pkCount, setPkCount] = useState(0);
  const [ctnCount, setCtnCount] = useState(0);
  const [isFavourite, setisFavourite] = useState(false);
  const [activeEnlargeImage, setActiveEnlargeImage] = useState(0);
  const [changeTo, setChangeTo] = useState(false);
  const [changingLoading, setChangingLoading] = useState(false);

  const { user, token } = useSelector((state) => state.Auth);

  const { productLoading } = useSelector((state) => state.products);
  const {
    showProductDetailsPopup,
    showEnlargeImage,
    activeEnlargeImageId,
    activeEnlargeImageFrom,
    singleProductEnlargeImageId,
  } = useSelector((state) => state.globalStates);
  const { loading, cartItems, cart, selectedItems, success } = useSelector(
    (state) => state.cart
  );

  const AbortControllerRef = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleAddtoFavourties = (id) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleAddProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            setisFavourite(!isFavourite);
            toast.success(`${product?.name} Added to favourites.`);
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

  const handleRemoveFromFavourties = (id) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            setisFavourite(!isFavourite);
            toast.success(`${product?.name} Removed from favourites.`);
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
    if (
      (pkitemsQuantity === "" || pkitemsQuantity === 0) &&
      (ctnItemQuantity === "" || ctnItemQuantity === 0)
    ) {
      toast.remove();
      setpkItemsQuantity("");
      setCtnItemQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error(
        "Minimum Quantity should be more than 0 And enter a valid value."
      );
    } else if (selectedItemType === "pk" && ctnItemQuantity > 0) {
      toast.remove();
      toast.error("Please enter quantity in PK, you choose PK");
      setCtnItemQuantity("");
      setCtnCount(0);
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.remove();
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity("");
      setPkCount(0);
      return true;
    } else if (
      !/^\d+$/.test(pkitemsQuantity !== "" ? pkitemsQuantity : ctnItemQuantity)
    ) {
      toast.remove();
      setpkItemsQuantity("");
      setCtnItemQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please enter valid value!!!");
    }
    setSelectedProductId(id);
    const response = dispatch(
      handleAddProductToCart({
        token,
        id,
        signal: AbortControllerRef,
        type: selectedItemType,
        quantity: selectedItemType === "pk" ? pkCount : ctnCount,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res.payload.status === "success") {
            toast.success(`${title} added to cart successfully.`);
            dispatch(handleChangeAddProduct({ quantity, amount }));
            dispatch(
              handleRemoveFromTotalQuantityAndAmountOfmultipleProducts({
                quantity,
                amount,
              })
            );
            dispatch(handleRemoveOneProductFromSelected(product?._id));
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

  function handleShowEnlargeImage(index) {
    dispatch(handleChangeEnlargeImageId(""));
    dispatch(handleChangeEnlargeImageFrom(""));
    if (index > 0) {
      setActiveEnlargeImage(index);
      dispatch(handleChangeEnlargeImageId(product?._id));
      dispatch(handleChangeEnlargeImageFrom(from));
    } else {
      setActiveEnlargeImage(0);
      dispatch(handleChangeEnlargeImageId(product?._id));
      dispatch(handleChangeEnlargeImageFrom(from));
    }
  }

  function handleShowSingleProductEnlargeImage(index) {
    dispatch(handleChangeSingleProductEnlargeImageId(""));
    if (index > 0) {
      setActiveEnlargeImage(index);
      dispatch(handleChangeSingleProductEnlargeImageId(product?._id));
    } else {
      setActiveEnlargeImage(0);
      dispatch(handleChangeSingleProductEnlargeImageId(product?._id));
    }
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

  const handleChangeAddedItemInCart = (action, type) => {
    toast.remove();
    if (findInCart !== null && findInCart?.product?._id === product?._id) {
      if (findInCart?.type === type) {
        if (action == "plus") {
          setChangeTo(true);
          setFindInCart({ ...findInCart, quantity: findInCart?.quantity + 1 });
        } else if (action === "minus") {
          setChangeTo(true);
          if (findInCart?.quantity == 1) {
            toast.error("Minimum quantity should be more than 0!!!");
            return true;
          }
          setFindInCart({
            ...findInCart,
            quantity: findInCart?.quantity == 1 ? 1 : findInCart?.quantity - 1,
          });
        }
      } else {
        toast.error(`Please change quantity in ${findInCart?.type}`);
        return true;
      }
    }
  };

  const handleSubmitAddProduct = () => {
    if (!loading && product?._id !== findInCart?.product?._id) {
      handleAddProduct(
        product?._id,
        product?.name,
        selectedItemType === "pk" ? pkitemsQuantity : ctnItemQuantity,
        selectedItemType === "pk"
          ? pkitemsQuantity * product?.price
          : ctnItemQuantity * product?.price
      );
    } else if (
      changeTo &&
      findInCart !== null &&
      product?._id === findInCart?.product?._id
    ) {
      setChangingLoading(true);
      const response = dispatch(
        handleAddProductToCart({
          token,
          id: findInCart?.product?._id,
          signal: AbortControllerRef,
          type: findInCart?.type,
          quantity: findInCart?.quantity,
        })
      );
      if (response) {
        response
          .then((res) => {
            if (res.payload.status === "success") {
              toast.success(`${findInCart?.product?.name}'s quantity updated.`);
              dispatch(
                handleUpdateTotalQuantityAndAmount({
                  quantity: findInCart?.quantity,
                  id: findInCart?.product?._id,
                })
              );
              setChangingLoading(false);
              setChangeTo(false);
            }
          })
          .catch((err) => {
            toast.error(err.payload.message);
            setChangingLoading(false);
            setChangeTo(false);
          });
      }
    } else {
      dispatch(handleChangeActiveComponent("Shopping Cart"));
    }
  };

  // find items already in cart
  useEffect(() => {
    if (cart !== null && cartItems.length > 0) {
      const findItemInCart = cartItems.find(
        (i) => i.product?._id === product?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [
    pkitemsQuantity,
    ctnItemQuantity,
    showProductDetailsPopup,
    selectedItems,
  ]);

  // set product to favourite item
  useEffect(() => {
    setisFavourite(product?.isFavourite);
  }, [productLoading]);

  // add multiple items to cart handler
  useEffect(() => {
    if (handleAddSelectedItem !== "") {
      handleAddSelectedItem(
        pkitemsQuantity,
        ctnItemQuantity,
        product?._id,
        selectedItemType,
        pkCount,
        ctnCount,
        product?.price
      );
    }
  }, [pkitemsQuantity, ctnItemQuantity, selectedItemType]);

  // clear input field after add to cart
  useEffect(() => {
    if (success && selectedProductId === product?._id) {
      setCtnItemQuantity("");
      setpkItemsQuantity("");
      setPkCount(0);
      setCtnCount(0);
    }
  }, [success]);
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
              className="xl:w-48 md:h-60 md:w-1/2 w-full h-40 pb-10 cursor-pointer xl:object-fill object-contain object-center"
              title={product?.name}
              onClick={() => {
                dispatch(showPopup());
                dispatch(handleSetSingelProductId(product?._id));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              loading="lazy"
            />
            <p className="flex items-center gap-x-1 absolute md:bottom-0 bottom-[220px] left-9">
              {product?.images.map((image, index) => (
                <img
                  key={index}
                  src={BaseUrl.concat(image)}
                  className="h-10 w-10 border-2 border-PRIMARY p-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    dispatch(showEnlargeImagePopup());
                    handleShowSingleProductEnlargeImage(index);
                  }}
                />
              ))}
            </p>
            <MagnifyingGlassPlusIcon
              role="button"
              onClick={() => {
                dispatch(showEnlargeImagePopup());
                handleShowSingleProductEnlargeImage(0, product?._id);
              }}
              className="h-6 w-6 bg-white/40 absolute left-0 md:bottom-0 bottom-56  text-PRIMARY"
            />
            {singleProductEnlargeImageId === product?._id &&
              showEnlargeImage && (
                <div className="absolute bg-black/30 z-40 xl:w-[30rem] md:w-[30rem] w-full md:min-h-[22rem] md:max-h-[22rem] min-h-[24rem] max-h-[24rem] xl:-top-32 md:-top-20 top-0 md:left-0 -left-2 backdrop-blur-sm">
                  <AiOutlineClose
                    role="button"
                    onClick={() => {
                      dispatch(closeEnlargeImagePopup());
                      // handleShowSingleProductEnlargeImage();
                    }}
                    className="absolute top-1 right-2 w-7 h-7 text-white z-50"
                  />
                  <img
                    src={BaseUrl.concat(product?.images[activeEnlargeImage])}
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
              {/* new pk */}
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
                  disabled={
                    (loading && selectedProductId?._id === product?._id) ||
                    findInCart?.product?._id === product?._id
                  }
                />{" "}
                <span className="font-semibold text-sm whitespace-nowrap pr-2">
                  PC QTY
                </span>
                <div className="w-full relative z-0">
                  <span
                    className={`absolute text-left top-1/2 w-full max-w-[4rem] text-sm ${
                      pkitemsQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "ctn"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 left-5`}
                  >
                    {`${
                      pkitemsQuantity === "" ? product?.PK : pkitemsQuantity
                    } PC`}
                  </span>
                  <input
                    type="number"
                    className={`w-full text-right h-10 text-sm pr-10 pl-12 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "ctn" ||
                        findInCart?.product?._id === product?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder="0"
                    value={pkCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setPkCount(0);
                        setpkItemsQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setPkCount(e.target.value.replace(/^0+/, ""));
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setpkItemsQuantity(
                          e.target.value.replace(/^0+/, "") * product?.PK
                        );
                    }}
                    disabled={
                      selectedItemType === "ctn" ||
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId?._id === product?._id)
                    }
                  />
                  <span className="font-semibold text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    PK
                  </span>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlineMinus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1`}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handleMinusPkQuantity(
                            parseFloat(product?.PK),
                            parseFloat(pkCount - 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("minus", "pk");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlinePlus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 `}
                      onClick={() => {
                        if (pkCount.length >= 6) {
                          toast.remove();
                          toast.error("Can't add more than 6 numbers !!!");
                          return true;
                        }
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handlePlusPkQuantity(
                            parseFloat(product?.PK),
                            parseFloat(pkCount + 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("plus", "pk");
                      }}
                    />
                  </button>
                </div>
              </div>
              {/* new ctn */}
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
                  disabled={loading && selectedProductId?._id === product?._id}
                />{" "}
                <span className="font-semibold text-sm whitespace-nowrap">
                  CTN QTY
                </span>
                <div className="w-full relative z-0">
                  <span
                    className={`absolute text-left top-1/2 w-full max-w-[3.5rem] text-sm ${
                      ctnItemQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "ctn"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 left-5`}
                  >
                    {`${
                      ctnItemQuantity === "" ? product?.CTN : ctnItemQuantity
                    } PC`}
                  </span>
                  <input
                    type="number"
                    className={`w-full h-10 text-right text-sm pr-12 pl-12 rounded-md outline-none border border-BORDERGRAY`}
                    placeholder="0"
                    value={ctnCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setCtnCount(0);
                        setCtnItemQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setCtnCount(e.target.value.replace(/^0+/, ""));
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setCtnItemQuantity(
                          e.target.value.replace(/^0+/, "") * product?.CTN
                        );
                    }}
                    disabled={
                      selectedItemType === "pk" ||
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId?._id === product?._id)
                    }
                  />
                  <span className="font-semibold text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    CTN
                  </span>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlineMinus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1`}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handleMinusCTNQuantity(
                            parseFloat(product?.CTN),
                            parseFloat(ctnCount - 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("minus", "ctn");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlinePlus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2`}
                      onClick={() => {
                        if (ctnCount.length >= 6) {
                          toast.remove();
                          toast.error("Can't add more than 6 numbers !!!");
                          return true;
                        }
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handlePlusCTNQuantity(
                            parseFloat(product?.CTN),
                            parseFloat(ctnCount + 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("plus", "ctn");
                      }}
                    />
                  </button>
                </div>
              </div>
              {/* old pk */}
              {/* <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
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
                  disabled={
                    (loading && selectedProductId?._id === product?._id) ||
                    findInCart?.product?._id === product?._id
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
                    placeholder={`${product?.PK} PC`}
                    value={pkitemsQuantity}
                    onChange={(e) => {
                      !loading && setpkItemsQuantity(e.target.value);
                      !loading &&
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
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId?._id === product?._id)
                    }
                  />
                  <span className="font-semibold text-BLACK w-14 text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {pkCount} PK
                  </span>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlineMinus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1`}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handleMinusPkQuantity(
                            parseFloat(product?.PK),
                            parseFloat(pkCount - 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("minus", "pk");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlinePlus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 `}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handlePlusPkQuantity(
                            parseFloat(product?.PK),
                            parseFloat(pkCount + 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("plus", "pk");
                      }}
                    />
                  </button>
                </div>
              </div> */}
              {/* old ctn */}
              {/* <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
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
                  disabled={loading && selectedProductId?._id === product?._id}
                />{" "}
                <span className="font-semibold text-sm whitespace-nowrap">
                  CTN QTY
                </span>
                <div className="w-full relative z-0">
                  <input
                    type="number"
                    className={`w-full h-10 text-sm pr-[4.5rem] pl-5 rounded-md outline-none border border-BORDERGRAY`}
                    placeholder={`${product?.CTN} PC`}
                    value={ctnItemQuantity}
                    onChange={(e) => {
                      !loading && setCtnItemQuantity(e.target.value);
                      !loading &&
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
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId?._id === product?._id)
                    }
                  />
                  <span className="font-semibold w-14 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {ctnCount} CTN
                  </span>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlineMinus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1`}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handleMinusCTNQuantity(
                            parseFloat(product?.CTN),
                            parseFloat(ctnCount - 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("minus", "ctn");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    disabled={
                      loading && selectedProductId?._id === product?._id
                    }
                  >
                    <AiOutlinePlus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2`}
                      onClick={() => {
                        !loading &&
                          selectedProductId?._id !== product?._id &&
                          handlePlusCTNQuantity(
                            parseFloat(product?.CTN),
                            parseFloat(ctnCount + 1)
                          );
                        findInCart !== null &&
                          handleChangeAddedItemInCart("plus", "ctn");
                      }}
                    />
                  </button>
                </div>
              </div> */}

              {/* btn */}
              <p className="flex items-center gap-x-2">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        product?._id === findInCart?.product?._id &&
                        !changeTo
                      ? "/cart"
                      : null
                  }
                  className="w-11/12"
                >
                  {changingLoading ? (
                    <button
                      type="button"
                      className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                      disabled={
                        (loading && selectedProductId === product?._id) ||
                        changingLoading
                      }
                    >
                      {t("Changing").concat("...")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                      onClick={() => handleSubmitAddProduct()}
                      disabled={loading && selectedProductId === product?._id}
                    >
                      {loading && selectedProductId === product?._id ? (
                        t("Adding").concat("...")
                      ) : findInCart !== null &&
                        product?._id === findInCart?.product?._id ? (
                        `${changeTo ? t("Change to") : t("Added")} ${
                          findInCart?.quantity
                        } ${findInCart?.type}`
                      ) : (
                        <>
                          {t("add_to_cart")}
                          <AiOutlineShoppingCart className="w-6 h-6 ml-1 inline-block" />
                        </>
                      )}
                    </button>
                  )}
                </Link>
                {favouriteLoading ? (
                  "..."
                ) : isFavourite ? (
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
        <div className="md:space-y-2 space-y-3 relative z-0 md:w-full w-auto md:p-3 p-4 bg-white lg:min-h-[27rem] md:min-h-[21rem] min-h-[19rem] font-semibold md:text-lg border rounded-lg border-[#EAEAEA]">
          {/* top seller label */}
          {title === "top-sellers" && (
            <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute top-0 left-0">
              {t("top_seller")}
            </p>
          )}
          {/* prodcut img */}
          <div className="relative w-auto z-20 pt-3">
            <img
              src={BaseUrl.concat(product?.images[0])}
              alt={product?.name}
              className="lg:h-64 md:h-40 relative z-0 h-32 cursor-pointer w-fit mx-auto object-contain object-center"
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
                console.log("click");
              }}
              className="h-6 w-6 bg-white/40 absolute bottom-0 md:right-0 right-2 text-PRIMARY"
            />
            {activeEnlargeImageId === product?._id &&
              activeEnlargeImageFrom === from &&
              showEnlargeImage && (
                <div className="absolute bg-black/30 z-50 xl:w-[200%] w-full xl:min-h-[30rem] lg:min-h-[25rem] min-h-[22rem] max-h-screen top-0 md:-right-5 right-0 backdrop-blur-sm">
                  <AiOutlineClose
                    role="button"
                    onClick={() => {
                      dispatch(closeEnlargeImagePopup());
                    }}
                    className="absolute top-1 right-2 w-7 h-7 text-white z-50"
                  />
                  <img
                    src={BaseUrl.concat(product?.images[activeEnlargeImage])}
                    alt={product?.name}
                    className="lg:max-h-[25rem] max-h-screen px-2 w-full rounded-none object-contain object-center absolute top-10"
                    title={product?.name}
                    loading="lazy"
                  />
                </div>
              )}
          </div>
          {/* mulitple images */}
          <p className="flex items-center gap-x-1">
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={BaseUrl.concat(image)}
                className="h-10 w-10 border-2 border-PRIMARY p-1 rounded-lg cursor-pointer"
                onClick={() => {
                  dispatch(showEnlargeImagePopup());
                  handleShowEnlargeImage(index);
                }}
              />
            ))}
          </p>
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
              {/* <p className="text-BLACK text-sm text-left">{product?.package}</p> */}
              <p className="md:text-base text-sm font-bold text-left">
                ${product?.price}/PC | $
                {(product?.price * product?.PK).toFixed(1)}
                /PK | $ {(product?.price * product?.CTN).toFixed(1)}/CTN
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
              {/* pk old*/}
              {/* <div className="flex w-full items-center lg:gap-x-1 md:gap-x-0 gap-x-1 relative z-0">
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
                  disabled={
                    (loading && selectedProductId === product?._id) ||
                    findInCart?.product?._id === product?._id
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  PK QTY
                </span>
                <input
                  type="number"
                  className={`w-11/12 h-10 text-sm pl-5 pr-16 rounded-md outline-none border border-BORDERGRAY ${
                    (selectedItemType === "ctn" ||
                      findInCart?.product?._id === product?._id) &&
                    "cursor-not-allowed"
                  }`}
                  placeholder={`${product?.PK} PC`}
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
                    findInCart?.product?._id === product?._id ||
                    (loading && selectedProductId === product?._id)
                  }
                />
                <span className="font-semibold w-10 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-4">
                  {pkCount} PK
                </span>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlineMinus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:left-[65px] left-[73px] ${
                      selectedView === "grid3"
                        ? " md:left-[60px]"
                        : " md:left-[55px]"
                    } 
                  `}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handleMinusPkQuantity(
                          parseFloat(product?.PK),
                          parseFloat(pkCount - 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("minus", "pk");
                    }}
                  />
                </button>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlinePlus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 `}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handlePlusPkQuantity(
                          parseFloat(product?.PK),
                          parseFloat(pkCount + 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("plus", "pk");
                    }}
                  />
                </button>
              </div> */}

              {/*old ctn */}
              {/* <div className="flex w-full items-center lg:gap-x-1 md:gap-x-0 gap-x-1 relative z-0">
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
                  disabled={
                    (loading && selectedProductId === product?._id) ||
                    findInCart?.product?._id === product?._id
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
                  placeholder={`${product?.CTN} PC`}
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
                    findInCart?.product?._id === product?._id ||
                    (loading && selectedProductId === product?._id)
                  }
                />
                <span className="font-semibold w-12 text-xs text-BLACK absolute top-1/2 -translate-y-1/2 right-3">
                  {ctnCount} CTN
                </span>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlineMinus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:left-[73px] md:left-[66px] left-[79px]`}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handleMinusCTNQuantity(
                          parseFloat(product?.CTN),
                          parseFloat(ctnCount - 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("minus", "ctn");
                    }}
                  />
                </button>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlinePlus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2
                
                  `}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handlePlusCTNQuantity(
                          parseFloat(product?.CTN),
                          parseFloat(ctnCount + 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("plus", "ctn");
                    }}
                  />
                </button>
              </div> */}
              {/* new pk */}
              <div className="flex w-full items-center lg:gap-x-1 md:gap-x-0 gap-x-1 relative z-0">
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
                  disabled={
                    (loading && selectedProductId === product?._id) ||
                    findInCart?.product?._id === product?._id
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  PK QTY
                </span>
                <div className="relative w-full">
                  <span
                    className={`absolute  top-1/2 w-full max-w-[4rem] text-sm ${
                      pkitemsQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "ctn"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 lg:left-4 left-5`}
                  >
                    {`${
                      pkitemsQuantity === "" ? product?.PK : pkitemsQuantity
                    } PC`}
                  </span>
                  <input
                    type="number"
                    className={`w-full text-right h-11 text-sm pr-10 pl-12 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "ctn" ||
                        findInCart?.product?._id === product?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder="0"
                    value={pkCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setPkCount(0);
                        setpkItemsQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setPkCount(e.target.value.replace(/^0+/, ""));
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setpkItemsQuantity(
                          e.target.value.replace(/^0+/, "") * product?.PK
                        );
                    }}
                    disabled={
                      selectedItemType === "ctn" ||
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId === product?._id)
                    }
                  />
                  <span className="font-semibold text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    PK
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlineMinus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:left-[65px] left-[75px] ${
                      selectedView === "grid3"
                        ? " md:left-[60px]"
                        : " md:left-[62px]"
                    } 
                  `}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handleMinusPkQuantity(
                          parseFloat(product?.PK),
                          parseFloat(pkCount - 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("minus", "pk");
                    }}
                  />
                </button>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlinePlus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:right-3 md:right-1 right-3 `}
                    onClick={() => {
                      if (pkCount.length >= 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId !== product?._id &&
                        handlePlusPkQuantity(
                          parseFloat(product?.PK),
                          parseFloat(pkCount + 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("plus", "pk");
                    }}
                  />
                </button>
              </div>
              {/* new ctn */}
              <div className="flex w-full items-center lg:gap-x-1 md:gap-x-0 gap-x-1 relative z-0">
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
                  disabled={
                    (loading && selectedProductId === product?._id) ||
                    findInCart?.product?._id === product?._id
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  CTN QTY
                </span>
                <div className="relative w-full">
                  <span
                    className={`absolute  top-1/2 w-full max-w-[3.5rem] text-sm ${
                      ctnItemQuantity === ""
                        ? "text-gray-400 font-normal"
                        : "text-BLACK font-semibold"
                    } ${
                      selectedItemType === "ctn"
                        ? "cursor-not-allowed"
                        : "cursor-default"
                    }
                    -translate-y-1/2 lg:left-4 left-5`}
                  >
                    {`${
                      ctnItemQuantity === "" ? product?.CTN : ctnItemQuantity
                    } PC`}
                  </span>
                  <input
                    type="number"
                    className={`w-full text-right h-11 text-sm pr-11 pl-12 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "pk" ||
                        findInCart?.product?._id === product?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder="0"
                    value={ctnCount}
                    onChange={(e) => {
                      if (
                        !/^(?=.*[1-9])\d{1,8}(?:\.\d\d?)?$/.test(e.target.value)
                      ) {
                        toast.remove();
                        toast.error("Please enter valid value.");
                        setCtnCount(0);
                        setCtnItemQuantity("");
                        return true;
                      }
                      if (e.target.value.length > 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setCtnCount(e.target.value.replace(/^0+/, ""));
                      !loading &&
                        selectedProductId?._id !== product?._id &&
                        setCtnItemQuantity(
                          e.target.value.replace(/^0+/, "") * product?.CTN
                        );
                    }}
                    disabled={
                      selectedItemType === "pk" ||
                      findInCart?.product?._id === product?._id ||
                      (loading && selectedProductId === product?._id)
                    }
                  />
                  <span className="font-semibold text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-5">
                    CTN
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlineMinus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:left-[73px] md:left-[70px] left-[79px]`}
                    onClick={() => {
                      !loading &&
                        selectedProductId !== product?._id &&
                        handleMinusCTNQuantity(
                          parseFloat(product?.CTN),
                          parseFloat(ctnCount - 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("minus", "ctn");
                    }}
                  />
                </button>
                <button
                  type="button"
                  disabled={!loading && selectedProductId === product?._id}
                >
                  <AiOutlinePlus
                    role="button"
                    className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 lg:right-3 md:right-1 right-3
                
                  `}
                    onClick={() => {
                      if (ctnCount.length >= 6) {
                        toast.remove();
                        toast.error("Can't add more than 6 numbers !!!");
                        return true;
                      }
                      !loading &&
                        selectedProductId !== product?._id &&
                        handlePlusCTNQuantity(
                          parseFloat(product?.CTN),
                          parseFloat(ctnCount + 1)
                        );
                      findInCart !== null &&
                        handleChangeAddedItemInCart("plus", "ctn");
                    }}
                  />
                </button>
              </div>
              {/* add to cart btn */}
              <p className="flex items-center gap-x-2">
                <Link
                  to={
                    user === null
                      ? "/sign-in"
                      : findInCart !== null &&
                        product?._id === findInCart?.product?._id &&
                        !changeTo
                      ? "/cart"
                      : null
                  }
                  className="w-11/12"
                >
                  {changingLoading ? (
                    <button
                      type="button"
                      className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                      disabled={
                        (loading && selectedProductId === product?._id) ||
                        changingLoading
                      }
                    >
                      {t("Changing").concat("...")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                      onClick={() => handleSubmitAddProduct()}
                      disabled={loading && selectedProductId === product?._id}
                    >
                      {loading && selectedProductId === product?._id ? (
                        t("Adding").concat("...")
                      ) : findInCart !== null &&
                        product?._id === findInCart?.product?._id ? (
                        `${changeTo ? t("Change to") : t("Added")} ${
                          findInCart?.quantity
                        } ${findInCart?.type}`
                      ) : (
                        <>
                          {t("add_to_cart")}
                          <AiOutlineShoppingCart className="w-6 h-6 ml-1 inline-block" />
                        </>
                      )}
                    </button>
                  )}
                </Link>
                {favouriteLoading ? (
                  "..."
                ) : isFavourite ? (
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

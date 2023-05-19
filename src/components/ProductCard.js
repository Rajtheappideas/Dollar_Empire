import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillHeart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleSetSingelProductId, showPopup } from "../redux/GlobalStates";
import { useTranslation } from "react-i18next";
import BaseUrl from "../BaseUrl";
import {
  handleAddProductToFavourites,
  handleRemoveProductToFavourites,
} from "../redux/FeatureSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  handleGetNewArrivals,
  handleGetTopSellers,
} from "../redux/GetContentSlice";
import {
  handleAddProductToCart,
  handleGetCart,
  handleUpdateTotalQuantityAndAmount,
} from "../redux/CartSlice";

const ProductCard = ({ product, title, selectedView, from }) => {
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState(0);
  const [ctnItemQuantity, setCtnItemQuantity] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);

  const { user, token } = useSelector((state) => state.Auth);
  const { quantity, orderType, loading, cartItems, cart } = useSelector(
    (state) => state.cart
  );

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
    if (pkitemsQuantity === 0 && ctnItemQuantity === 0) {
      return toast.error("Please add some quantity!!!");
    } else if (selectedItemType === "pk" && ctnItemQuantity > 0) {
      toast.error("Please enter quantity in PK, you choose PK");
      setCtnItemQuantity(0);
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity(0);
      return true;
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
            dispatch(handleUpdateTotalQuantityAndAmount({ quantity, amount }));
            setCtnItemQuantity(0);
            setpkItemsQuantity(0);
            setSelectedItemType("pk");
            setSelectedProductId(null);
          }
        })
        .catch((err) => {
          toast.error(err.payload.message);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    return () => {
      AbortControllerRef.current !== null && AbortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (cart !== null && cartItems.length > 0) {
      const findItemInCart = cartItems.find(
        (i) => i.product?._id === product?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [pkitemsQuantity, ctnItemQuantity]);

  return (
    <>
      {selectedView === "gridsingle" ? (
        // single product
        <div className="lg:space-y-3 relative space-y-2 w-full xl:p-3 md:p-5 p-3 bg-white font-semibold md:text-lg border rounded-lg border-[#EAEAEA] flex xl:flex-row flex-col items-start justify-between">
          {/* top seller label */}
          {title === "top-sellers" && (
            <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute top-0 left-0">
              Top Seller
            </p>
          )}

          {/* left side */}
          <div className="h-auto xl:w-2/3 w-full flex md:flex-row flex-col md:items-start items-center justify-start xl:gap-5 gap-3">
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
            />
            {/* details */}
            {user === null ? (
              <div className="space-y-1 font-medium text-black w-full">
                <p className="text-PRIMARY font-semibold">
                  ITEM NO.{product?.number}
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
                      Login to order
                    </button>
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="space-y-1 font-medium text-black w-full">
                <li className="text-PRIMARY font-semibold">
                  ITEM NO.{product?.number}
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
                    type="text"
                    className={`w-full h-10 text-sm pr-[4.5rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      selectedItemType === "ctn" && "cursor-not-allowed"
                    }`}
                    placeholder="24 PC"
                    value={pkitemsQuantity > 0 ? pkitemsQuantity : ""}
                    onChange={(e) => {
                      setpkItemsQuantity(e.target.value);
                    }}
                    disabled={selectedItemType === "ctn"}
                  />
                  <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                    {pkitemsQuantity > 0 ? "" : 0} PK
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
                    type="text"
                    className={`w-full h-10 text-sm pr-[4.5rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      selectedItemType === "pk" && "cursor-not-allowed"
                    }`}
                    placeholder="144 PC"
                    value={ctnItemQuantity > 0 ? ctnItemQuantity : ""}
                    onChange={(e) => {
                      setCtnItemQuantity(e.target.value);
                    }}
                    disabled={selectedItemType === "pk"}
                  />
                  <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                    {ctnItemQuantity > 0 ? "" : 0} CTN
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
                      "Adding..."
                    ) : findInCart !== null &&
                      product?._id === findInCart?.product?._id ? (
                      "Added"
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
        <div className="md:space-y-3 space-y-2 relative w-full md:p-3 p-4 bg-white lg:min-h-[27rem] md:min-h-[21rem] min-h-[19rem] font-semibold md:text-lg border rounded-lg border-[#EAEAEA]">
          {/* top seller label */}
          {title === "top-sellers" && (
            <p className="bg-PRIMARY text-white h-8 w-40 leading-8 align-middle text-center text-sm rounded-tl-lg absolute top-0 left-0">
              {t("top_seller")}
            </p>
          )}
          {/* prodcut img */}
          <img
            src={BaseUrl.concat(product?.images[0])}
            alt={product?.name}
            className="lg:h-64 md:h-40 h-32 cursor-pointer w-full object-contain object-center"
            title={product?.name}
            onClick={() => {
              dispatch(showPopup());
              dispatch(handleSetSingelProductId(product?._id));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <p className="text-PRIMARY font-semibold">
            ITEM NO.{product?.number}
          </p>
          <p
            className="font-bold tracking-normal truncate"
            title={product?.name}
          >
            {product?.name}
          </p>
          {user === null && (
            <p
              className="font-bold tracking-normal truncate"
              title={product?.name}
            >
              {product?.shortDesc}
            </p>
          )}
          {user !== null ? (
            <Fragment>
              <p className="text-BLACK text-sm text-left">{product?.package}</p>
              <p className="text-base font-bold text-left">
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
              <p className="flex w-full items-center gap-x-2 relative z-0">
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
                  // value={product?.name}
                  value="pk"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />
                <span className="font-semibold text-sm whitespace-nowrap">
                  PK QTY
                </span>
                <input
                  type="number"
                  className={`w-11/12 h-10 text-sm pl-5 pr-16 rounded-md outline-none border border-BORDERGRAY ${
                    selectedItemType === "ctn" && "cursor-not-allowed"
                  }`}
                  place
                  placeholder="24 PC"
                  value={pkitemsQuantity > 0 ? pkitemsQuantity : ""}
                  onChange={(e) => {
                    setpkItemsQuantity(e.target.value);
                  }}
                  disabled={selectedItemType === "ctn"}
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-7">
                  {pkitemsQuantity > 0 ? "" : 0} PK
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-20"
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
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
                  // value={
                  //   from === "TopSellers"
                  //     ? product?.name.concat(from)
                  //     : product?.name
                  // }
                  value="ctn"
                  id={
                    from === "TopSellers"
                      ? product?.name.concat(from)
                      : product?.name
                  }
                />
                <span className="font-semibold text-sm whitespace-nowrap">
                  CTN QTY
                </span>
                <input
                  type="text"
                  className={`w-11/12 h-10 text-sm pl-5 pr-[74px] rounded-md outline-none border border-BORDERGRAY ${
                    selectedItemType === "pk" && "cursor-not-allowed"
                  }`}
                  placeholder="144 PC"
                  value={ctnItemQuantity > 0 ? ctnItemQuantity : ""}
                  onChange={(e) => {
                    setCtnItemQuantity(e.target.value);
                  }}
                  disabled={selectedItemType === "pk"}
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                  {ctnItemQuantity > 0 ? "" : 0} CTN
                </span>
                <AiOutlineMinus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-20"
                />
                <AiOutlinePlus
                  role="button"
                  className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
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
                  >
                    {loading && selectedProductId === product?._id ? (
                      "Adding..."
                    ) : findInCart !== null &&
                      product?._id === findInCart?.product?._id ? (
                      "Added"
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

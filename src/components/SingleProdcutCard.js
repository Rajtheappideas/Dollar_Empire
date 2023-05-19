import React, { useState } from "react";
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
import BaseUrl from "../BaseUrl";
import {
  handleAddProductToFavourites,
  handleRemoveProductToFavourites,
} from "../redux/FeatureSlice";
import { handleGetNewArrivals } from "../redux/GetContentSlice";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { handleAddProductToCart } from "../redux/CartSlice";
import { useEffect } from "react";

const SingleProdcutCard = ({ product, title }) => {
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState(0);
  const [ctnItemQuantity, setCtnItemQuantity] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);

  const { user, token } = useSelector((state) => state.Auth);
  const { quantity, orderType, loading, cart } = useSelector(
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
            dispatch(handleGetNewArrivals({ token }));
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

  const handleRemoveFromFavourties = (id) => {
    setFavouriteLoading(true);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          dispatch(handleGetNewArrivals({ token }));
          toast.success(res.payload.message);
          setFavouriteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setFavouriteLoading(false);
        });
    }
  };

  const handleAddProduct = (id, title) => {
    toast.dismiss();
    if (pkitemsQuantity === 0 && ctnItemQuantity === 0) {
      return toast.error("Please add some quantity!!!");
    }
    setSelectedProductId(id);
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
            setCtnItemQuantity(0);
            setpkItemsQuantity(0);
            setSelectedItemType("pk");
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
    if (cart !== null && cart?.items.length > 0) {
      const findItemInCart = cart.items.find(
        (i) => i.product?._id === product?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [pkitemsQuantity, ctnItemQuantity]);
  return (
    <>
      <div className="lg:space-y-3 relative space-y-2 w-full xl:p-3 md:p-5 p-3 bg-white font-semibold md:text-lg border rounded-lg border-[#EAEAEA] flex xl:flex-row flex-col items-start justify-between">
        {/* top seller label */}
        {title === "Top Sellers" && (
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
                className="font-bold tracking-normal py-1"
                title={product?.name}
              >
                {product?.name}
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
              ${product?.price}/PC, ${(product?.price * product?.PK).toFixed(1)}
              /PK, ${(product?.price * product?.CTN).toFixed(1)}/CTN
            </p>
            <div className="flex xl:w-64 w-full items-center gap-x-2 relative z-0 ml-auto">
              <input name="quantity" type="radio" className="w-5 h-5" />
              <span className="font-semibold text-sm whitespace-nowrap pr-2">
                PC QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="text"
                  className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                  placeholder="24 PC"
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                  0 PK
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
              <input name="quantity" type="radio" className="w-5 h-5" />
              <span className="font-semibold text-sm whitespace-nowrap">
                CTN QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="text"
                  className="w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY"
                  placeholder="144 PC"
                />
                <span className="font-semibold text-BLACK text-sm absolute top-1/2 -translate-y-1/2 right-8">
                  0 CTN
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
              <Link to="/cart" className="w-11/12">
                <button
                  type="button"
                  className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                >
                  Add to cart
                  <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                </button>
              </Link>
              {loading ? (
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
    </>
  );
};

export default SingleProdcutCard;

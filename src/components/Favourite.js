import React, { useEffect, useRef, useState } from "react";
import BaseUrl from "../BaseUrl";
import { useTranslation } from "react-i18next";
import {
  handleGetUserFavourites,
  handleRemoveProductToFavourites,
} from "../redux/FavouriteSlice";
import {
  handleAddProductToCart,
  handleChangeAddProduct,
} from "../redux/CartSlice";
import { toast } from "react-hot-toast";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourite = ({ favourite }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState("pk");
  const [pkitemsQuantity, setpkItemsQuantity] = useState("");
  const [ctnItemQuantity, setCtnItemQuantity] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [findInCart, setFindInCart] = useState(null);
  const [pkCount, setPkCount] = useState(0);
  const [ctnCount, setCtnCount] = useState(0);

  const { t } = useTranslation();

  const AbortControllerRef = useRef(null);

  const { token, user } = useSelector((state) => state.Auth);

  const { favourites } = useSelector((state) => state.favourite);
  const { cartItems, loading } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveFromFavourties = (id) => {
    setDeleteLoading(true);
    setDeleteProductId(id);
    const response = dispatch(
      handleRemoveProductToFavourites({ token, id, signal: AbortControllerRef })
    );
    if (response) {
      response
        .then((res) => {
          dispatch(handleGetUserFavourites({ token }));
          toast.success(res.payload.message);
          setDeleteLoading(false);
        })
        .catch((err) => {
          toast.error(err.payload.message);
          setDeleteLoading(false);
        });
    }
  };

  const handleAddProduct = (id, title, quantity, amount) => {
    toast.dismiss();
    if (
      (pkitemsQuantity === "" || pkCount === 0) &&
      (ctnItemQuantity === "" || ctnCount === 0)
    ) {
      setCtnItemQuantity("");
      setpkItemsQuantity("");
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
            setCtnItemQuantity("");
            setpkItemsQuantity("");
            setSelectedItemType("pk");
            setSelectedProductId(null);
            setPkCount(0);
            setCtnCount(0);
            toast.success(`${title} added to cart successfully.`);
            dispatch(handleChangeAddProduct({ quantity, amount }));
          }
        })
        .catch((err) => {
          toast.error(err.payload.message);
        });
    }
  };

  const handlePlusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== favourite?._id
    ) {
      setPkCount(count);
      setpkItemsQuantity(quantity * count);
    }
  };

  const handleMinusPkQuantity = (quantity, count) => {
    if (
      selectedItemType === "pk" &&
      findInCart?.product?._id !== favourite?._id
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
      findInCart?.product?._id !== favourite?._id
    ) {
      setCtnCount(count);
      setCtnItemQuantity(quantity * count);
    }
  };

  const handleMinusCTNQuantity = (quantity, count) => {
    if (
      selectedItemType === "ctn" &&
      findInCart?.product?._id !== favourite?._id
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
    if (favourites.length !== 0 && cartItems.length > 0) {
      const findItemInCart = cartItems.find(
        (i) => i.product?._id === favourite?._id
      );
      setFindInCart(findItemInCart);
    }
  }, [pkitemsQuantity, ctnItemQuantity, favourites]);
  return (
    <>
      <td className="lg:p-3 p-2">
        <img
          src={BaseUrl.concat(favourite?.images[0])}
          alt={favourite.name}
          className="min-h-[6rem] min-w-[6em] object-contain object-center"
        />
      </td>
      <td className="font-semibold lg:p-3 p-2 whitespace-nowrap">
        {favourite.name}
      </td>
      <td className="lg:p-3 p-2 ">#{favourite?.number}</td>
      <td className="lg:p-3 p-2">
        <div className="text-right w-full flex items-center justify-start gap-x-6">
          <p className="xl:w-4/12 w-3/12 whitespace-nowrap text-right">
            {favourite?.PK} PC/PK , {favourite?.CTN} PC/CTN
          </p>
          <div className="xl:w-7/12 w-8/12 space-y-3">
            <p className="font-bold md:text-base text-sm">
              ${favourite?.price}/PC, $
              {parseFloat(favourite?.price * favourite?.PK).toFixed(2)}
              /PK, $ {parseFloat(favourite?.price * favourite?.CTN).toFixed(2)}
              /CTN
            </p>
            {/* pk */}
            <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
              <input
                name={favourite?._id}
                type="radio"
                className="md:w-6 md:h-6 w-7 h-7"
                onChange={(e) => setSelectedItemType(e.target.value)}
                defaultChecked={true}
                value="pk"
                id={favourite?._id}
                disabled={loading}
              />
              <span className="font-semibold text-sm whitespace-nowrap pr-2">
                PC QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="number"
                  className={`w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                    (selectedItemType === "ctn" ||
                      findInCart?.product?._id === favourite?._id) &&
                    "cursor-not-allowed"
                  }`}
                  placeholder="24 PC"
                  value={pkitemsQuantity}
                  onChange={(e) => {
                    !loading && setpkItemsQuantity(e.target.value);
                    !loading &&
                      setPkCount(
                        e.target.value >= favourite?.PK
                          ? parseFloat(
                              (e.target.value / favourite?.PK)
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
                    findInCart?.product?._id === favourite?._id ||
                    loading
                  }
                />
                <span className="font-semibold w-12 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                  {pkCount} PK
                </span>
                <button type="button" disabled={loading}>
                  <AiOutlineMinus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                    onClick={() =>
                      !loading &&
                      handleMinusPkQuantity(
                        parseFloat(favourite?.PK),
                        parseFloat(pkCount - 1)
                      )
                    }
                  />
                </button>
                <button type="button" disabled={loading}>
                  <AiOutlinePlus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() =>
                      !loading &&
                      handlePlusPkQuantity(
                        parseFloat(favourite?.PK),
                        parseFloat(pkCount + 1)
                      )
                    }
                  />
                </button>
              </div>
            </div>
            {/* ctn */}
            <div className="flex w-64 items-center gap-x-2 relative z-0 ml-auto">
              <input
                name={favourite?._id}
                type="radio"
                className="md:w-6 md:h-6 w-7 h-7"
                onChange={(e) => setSelectedItemType(e.target.value)}
                value="ctn"
                id={favourite?._id}
                disabled={loading}
              />
              <span className="font-semibold text-sm whitespace-nowrap">
                CTN QTY
              </span>
              <div className="w-full relative z-0">
                <input
                  type="number"
                  className={`w-full h-10 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                    (selectedItemType === "pk" ||
                      findInCart?.product?._id === favourite?._id) &&
                    "cursor-not-allowed"
                  }`}
                  placeholder="144 PC"
                  value={ctnItemQuantity}
                  onChange={(e) => {
                    !loading && setCtnItemQuantity(e.target.value);
                    !loading &&
                      setCtnCount(
                        e.target.value >= favourite?.CTN
                          ? parseFloat(
                              (e.target.value / favourite?.CTN)
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
                    findInCart?.product?._id === favourite?._id ||
                    loading
                  }
                />
                <span className="font-semibold w-12 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                  {ctnCount} CTN
                </span>
                <button type="button" disabled={loading}>
                  <AiOutlineMinus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1"
                    onClick={() =>
                      !loading &&
                      handleMinusCTNQuantity(
                        parseFloat(favourite?.CTN),
                        parseFloat(ctnCount - 1)
                      )
                    }
                  />
                </button>
                <button type="button" disabled={loading}>
                  <AiOutlinePlus
                    role="button"
                    className=" text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() =>
                      !loading &&
                      handlePlusCTNQuantity(
                        parseFloat(favourite?.CTN),
                        parseFloat(ctnCount + 1)
                      )
                    }
                  />
                </button>
              </div>
            </div>
            <p className="w-7/12 h-auto ml-auto">
              <Link
                to={
                  user === null
                    ? "/sign-in"
                    : findInCart !== null &&
                      favourite?._id === findInCart?.product?._id
                    ? "/cart"
                    : null
                }
                className="w-full"
              >
                <button
                  type="button"
                  className="bg-DARKRED text-white text-center w-full p-2 rounded-lg"
                  disabled={loading}
                  onClick={() => {
                    findInCart?.product?._id !== favourite?._id &&
                      handleAddProduct(
                        favourite?._id,
                        favourite?.name,
                        selectedItemType === "pk"
                          ? pkitemsQuantity
                          : ctnItemQuantity,
                        selectedItemType === "pk"
                          ? pkitemsQuantity * favourite?.price
                          : ctnItemQuantity * favourite?.price
                      );
                    setSelectedProductId(favourite?._id);
                  }}
                >
                  {loading && selectedProductId === favourite?._id ? (
                    t("Adding").concat("...")
                  ) : findInCart !== null &&
                    favourite?._id === findInCart?.product?._id ? (
                    t("Added")
                  ) : (
                    <>
                      {t("add_to_cart")}
                      <AiOutlineShoppingCart className="w-6 h-6 ml-2 inline-block" />
                    </>
                  )}
                </button>
              </Link>
            </p>
          </div>
        </div>
      </td>
      {deleteLoading && deleteProductId === favourite?._id ? (
        <td className="text-center mx-auto text-3xl">...</td>
      ) : (
        <td>
          <AiOutlineClose
            role="button"
            className="h-6 w-6 mx-auto"
            onClick={() => handleRemoveFromFavourties(favourite?._id)}
          />
        </td>
      )}
    </>
  );
};

export default Favourite;

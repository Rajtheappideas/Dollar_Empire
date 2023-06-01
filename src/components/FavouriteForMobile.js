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
   
    if (
      (pkitemsQuantity === "" || pkCount === 0) &&
      (ctnItemQuantity === "" || ctnCount === 0)
    ) {
      toast.dismiss();
      setCtnItemQuantity("");
      setpkItemsQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please add some quantity And enter valid value.");
    } else if (selectedItemType === "pk" && ctnItemQuantity > 0) {
      toast.dismiss();
      toast.error("Please enter quantity in PK, you choose PK");
      setCtnItemQuantity("");
      setCtnCount(0);
      return true;
    } else if (selectedItemType === "ctn" && pkitemsQuantity > 0) {
      toast.dismiss();
      toast.error("Please enter quantity in CTN, you choose CTN");
      setpkItemsQuantity("");
      setPkCount(0);
      return true;
    } else if (
      !/^\d+$/.test(pkitemsQuantity !== "" ? pkitemsQuantity : ctnItemQuantity)
    ) {
      toast.dismiss();
      setpkItemsQuantity("");
      setCtnItemQuantity("");
      setPkCount(0);
      setCtnCount(0);
      return toast.error("Please enter valid value!!!");
    }
    setSelectedProductId(favourite?._id);
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
      <tr className="text-center">
        <th className="bg-PRIMARY p-2 min-w-[5rem] max-w-[5rem] text-white">
          {t("Image")}
        </th>
        <td className="lg:p-3 p-2 text-center mx-auto w-full">
          <img
            src={BaseUrl.concat(favourite?.images[0])}
            alt={favourite.name}
            className=" max-w-[8rem] min-w-[8rem] object-contain object-center mx-auto"
          />
        </td>
      </tr>
      <tr className="text-center">
        <th className="bg-PRIMARY p-2 min-w-[5rem] max-w-[5rem] text-white">
          {t("Product")}
        </th>
        <td className="font-semibold lg:p-3 p-2 text-center mx-auto w-full">
          {favourite.name}
        </td>
      </tr>
      <tr>
        <th className="bg-PRIMARY p-2 min-w-[5rem] max-w-[5rem] text-white text-center">
          {t("Item no")}.
        </th>
        <td className="lg:p-3 p-2 text-center w-full">#{favourite?.number}</td>
      </tr>
      <tr>
        <th className="bg-PRIMARY p-2 min-w-[5rem] max-w-[5rem] text-white">
          {t("Packing")}
        </th>
        <td className="lg:p-3 p-2 space-y-3">
          <div className="text-right w-auto">
            <p className="whitespace-nowrap text-center text-xs">
              {favourite?.PK} PC/PK , {favourite?.CTN} PC/CTN
            </p>
            <div className=" space-y-3">
              <p className="font-bold text-xs text-center">
                ${favourite?.price}/PC, $
                {parseFloat(favourite?.price * favourite?.PK).toFixed(2)}
                /PK, ${" "}
                {parseFloat(favourite?.price * favourite?.CTN).toFixed(2)}
                /CTN
              </p>
              {/* pk */}
              <div className="gap-x-1 w-auto items-center relative z-0 ml-auto flex">
                <input
                  name={favourite?._id}
                  type="radio"
                  className="w-5 h-5"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  defaultChecked={true}
                  value="pk"
                  id={favourite?._id}
                  disabled={
                    (loading && selectedProductId === favourite?._id) ||
                    findInCart?.product?._id === favourite?._id
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap pr-2">
                  PC QTY
                </span>
                <div className="w-full relative z-0">
                  <input
                    type="number"
                    className={`w-full h-8 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "ctn" ||
                        findInCart?.product?._id === favourite?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder={`${favourite?.PK} PC`}
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
                      (loading && selectedProductId === favourite?._id)
                    }
                  />
                  <span className="font-semibold w-12 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {pkCount} PK
                  </span>
                  <button type="button" disabled={loading}>
                    <AiOutlineMinus
                      role="button"
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1
                    ${
                      (selectedItemType === "ctn" ||
                        findInCart?.product?._id === favourite?._id) &&
                      "cursor-not-allowed"
                    }`}
                      onClick={() =>
                        !loading &&
                        handleMinusPkQuantity(
                          parseFloat(favourite?.PK),
                          parseFloat(pkCount - 1)
                        )
                      }
                      disabled={
                        (loading && selectedProductId === favourite?._id) ||
                        findInCart?.product?._id === favourite?._id
                      }
                    />
                  </button>
                  <button type="button" disabled={loading}>
                    <AiOutlinePlus
                      role="button"
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 ${
                        (selectedItemType === "ctn" ||
                          findInCart?.product?._id === favourite?._id) &&
                        "cursor-not-allowed"
                      }`}
                      onClick={() =>
                        !loading &&
                        selectedProductId !== favourite?._id &&
                        handlePlusPkQuantity(
                          parseFloat(favourite?.PK),
                          parseFloat(pkCount + 1)
                        )
                      }
                      disabled={
                        (loading && selectedProductId === favourite?._id) ||
                        findInCart?.product?._id === favourite?._id
                      }
                    />
                  </button>
                </div>
              </div>
              {/* ctn */}
              <div className="gap-x-1 flex w-auto items-center  relative z-0 ml-auto">
                <input
                  name={favourite?._id}
                  type="radio"
                  className="w-5 h-5"
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  value="ctn"
                  id={favourite?._id}
                  disabled={
                    (loading && selectedProductId === favourite?._id) ||
                    findInCart?.product?._id === favourite?._id
                  }
                />
                <span className="font-semibold text-xs whitespace-nowrap">
                  CTN QTY
                </span>
                <div className="w-full relative z-0">
                  <input
                    type="number"
                    className={`w-full h-8 text-sm pr-[5.4rem] pl-5 rounded-md outline-none border border-BORDERGRAY ${
                      (selectedItemType === "pk" ||
                        findInCart?.product?._id === favourite?._id) &&
                      "cursor-not-allowed"
                    }`}
                    placeholder={`${favourite?.CTN} PC`}
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
                      (loading && selectedProductId === favourite?._id)
                    }
                  />
                  <span className="font-semibold w-12 text-BLACK text-xs absolute top-1/2 -translate-y-1/2 right-6">
                    {ctnCount} CTN
                  </span>
                  <button type="button" disabled={loading}>
                    <AiOutlineMinus
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1 ${
                        (selectedItemType === "pk" ||
                          findInCart?.product?._id === favourite?._id) &&
                        "cursor-not-allowed"
                      }`}
                      onClick={() =>
                        !loading &&
                        selectedProductId !== favourite?._id &&
                        handleMinusCTNQuantity(
                          parseFloat(favourite?.CTN),
                          parseFloat(ctnCount - 1)
                        )
                      }
                      disabled={
                        (loading && selectedProductId === favourite?._id) ||
                        findInCart?.product?._id === favourite?._id
                      }
                    />
                  </button>
                  <button type="button" disabled={loading}>
                    <AiOutlinePlus
                      role="button"
                      className={`text-BLACK w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 ${
                        (selectedItemType === "pk" ||
                          findInCart?.product?._id === favourite?._id) &&
                        "cursor-not-allowed"
                      }`}
                      onClick={() =>
                        !loading &&
                        selectedProductId !== favourite?._id &&
                        handlePlusCTNQuantity(
                          parseFloat(favourite?.CTN),
                          parseFloat(ctnCount + 1)
                        )
                      }
                      disabled={
                        (loading && selectedProductId === favourite?._id) ||
                        findInCart?.product?._id === favourite?._id
                      }
                    />
                  </button>
                </div>
              </div>
              <p className="w-10/12 h-auto ml-auto">
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
                    disabled={loading && selectedProductId === favourite?._id}
                    onClick={() => {
                      !loading &&
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
      </tr>
      <tr className="border-spacing-10 text-center last:pb-0">
        <th className="bg-PRIMARY p-2 min-w-[5rem] max-w-[5rem] text-white">
          {t("Remove")}
        </th>
        {deleteLoading && deleteProductId === favourite?._id ? (
          <td className="text-center mx-auto text-3xl w-full">...</td>
        ) : (
          <td className="text-center w-full">
            <AiOutlineClose
              role="button"
              className="h-6 w-6 mx-auto text-center"
              onClick={() => handleRemoveFromFavourties(favourite?._id)}
            />
          </td>
        )}
      </tr>
      <hr className="my-1 last:hidden" />
    </>
  );
};

export default Favourite;
